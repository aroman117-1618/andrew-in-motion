import React from "react";

// Lazy import avoids bundler/interop drama and only runs on the client
export default function MorphoOrbGL({
  size = 0.62,
  speed = 0.085,
  gain = 0.45,
  palette = [
    [17, 41, 23],   // deep pine
    [59, 98, 85],   // pine
    [28, 139, 102], // emerald
    [155, 194, 60], // lime
  ],
}) {
  const ref = React.useRef(null);
  const destroyRef = React.useRef(null);

  React.useEffect(() => {
    let cancelled = false;
    if (typeof window === "undefined" || !ref.current) return;

    import("regl")
      .then((mod) => {
        if (cancelled) return;
        const createREGL = mod.default ?? mod;
        if (typeof createREGL !== "function") throw new Error("regl import failed");

        // Clean any prior canvas (strict mode / hot reload)
        ref.current.querySelectorAll("canvas[data-orb]").forEach((c) => c.remove());

        const canvas = document.createElement("canvas");
        canvas.dataset.orb = "true";
        Object.assign(canvas.style, {
          position: "fixed",
          inset: "0",
          width: "100%",
          height: "100%",
          zIndex: "0",
          pointerEvents: "none",
        });
        ref.current.appendChild(canvas);

        // WebGL context first so we can surface errors nicely
        const gl =
          canvas.getContext("webgl", { alpha: true, antialias: true }) ||
          canvas.getContext("experimental-webgl");
        if (!gl) throw new Error("WebGL not supported");

        const regl = createREGL({ gl });

        const fit = () => {
          const dpr = Math.min(window.devicePixelRatio || 1, 2);
          const w = Math.max(1, Math.floor(window.innerWidth * dpr));
          const h = Math.max(1, Math.floor(window.innerHeight * dpr));
          if (canvas.width !== w || canvas.height !== h) {
            canvas.width = w;
            canvas.height = h;
          }
        };
        fit();
        window.addEventListener("resize", fit);

        const pointer = { x: 0.5, y: 0.45, tx: 0.5, ty: 0.45 };
        const onMove = (e) => {
          const t = e.touches ? e.touches[0] : e;
          const r = document.body.getBoundingClientRect();
          pointer.tx = (t.clientX - r.left) / r.width;
          pointer.ty = (t.clientY - r.top) / r.height;
        };
        window.addEventListener("pointermove", onMove, { passive: true });
        window.addEventListener("touchmove", onMove, { passive: true });

        // Palette to 0..1
        const to01 = (c) => [c[0] / 255, c[1] / 255, c[2] / 255];
        const c0 = to01(palette[0] || [17, 41, 23]);
        const c1 = to01(palette[1] || [59, 98, 85]);
        const c2 = to01(palette[2] || [28, 139, 102]);
        const c3 = to01(palette[3] || [155, 194, 60]);

        const draw = regl({
          vert: `
            precision mediump float;
            attribute vec2 position;
            void main () { gl_Position = vec4(position, 0.0, 1.0); }
          `,
          // -------- iOS/WebGL1-safe fragment shader ----------
          frag: `
            precision mediump float;

            uniform vec2  u_res;
            uniform float u_time;
            uniform vec2  u_pointer;
            uniform float u_size;
            uniform float u_speed;
            uniform float u_gain;
            uniform vec3  u_c0;
            uniform vec3  u_c1;
            uniform vec3  u_c2;
            uniform vec3  u_c3;

            // ---- constants (as macros; const vec4 can break on iOS) ----
            #define C0 0.211324865405187
            #define C1 0.366025403784439
            #define C2 -0.577350269189626
            #define C3 0.024390243902439

            // Avoids precision issues on some iOS GPUs
            float mod289(float x) { return x - floor(x * (1.0/289.0)) * 289.0; }
            vec2  mod289(vec2  x){ return x - floor(x * (1.0/289.0)) * 289.0; }
            vec3  mod289(vec3  x){ return x - floor(x * (1.0/289.0)) * 289.0; }

            vec3 permute(vec3 x){ return mod289(((x * 34.0) + 1.0) * x); }

            // Simplex noise (mobile-safe variant)
            float snoise(vec2 v){
              vec2 i = floor(v + dot(v, vec2(C1, C1)));
              vec2 x0 = v - i + dot(i, vec2(C0, C0));
              vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
              vec2 x1 = x0 - i1 + vec2(C0, C0);
              vec2 x2 = x0 - 1.0 + vec2(2.0*C0, 2.0*C0);

              i = mod289(i);
              vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0))
                               + i.x + vec3(0.0, i1.x, 1.0));

              vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x1,x1), dot(x2,x2)), 0.0);
              m = m * m; m = m * m;

              vec3 x = 2.0 * fract(p * vec3(C3)) - 1.0; // C3 == 1.0/41.0
              vec3 h = abs(x) - 0.5;
              vec3 ox = floor(x + 0.5);
              vec3 a0 = x - ox;

              // lesser ALU to keep iOS happy
              vec3 g;
              g.x  = a0.x * x0.x + h.x * x0.y;
              g.y  = a0.y * x1.x + h.y * x1.y;
              g.z  = a0.z * x2.x + h.z * x2.y;

              return 130.0 * dot(m, g);
            }

            float fbm(vec2 p) {
              float f = 0.0;
              float a = 0.5;
              // Small fixed loop is fine for ES2
              for (int i = 0; i < 5; i++) {
                f += a * snoise(p);
                // rotate & scale (explicit mat2 literal to avoid const matrices)
                p = mat2(0.8, -0.6, 0.6, 0.8) * p * 2.0;
                a *= 0.5;
              }
              return f;
            }

            // soft clamp so center never blows out
            float softClamp(float x, float knee, float k){
              float t = smoothstep(knee, 1.0, x);
              return mix(x, mix(x, knee, t), k);
            }

            // palette gradient (4 stops)
            vec3 grad(float t){
              t = clamp(t, 0.0, 1.0);
              vec3 a = mix(u_c0, u_c1, smoothstep(0.0, 0.35, t));
              vec3 b = mix(u_c2, u_c3, smoothstep(0.35, 1.0, t));
              return mix(a, b, smoothstep(0.25, 0.85, t));
            }

            // tiny grain
            float grain(vec2 uv, float t){
              float n = fract(sin(dot(uv*vec2(127.1,311.7)+t, vec2(269.5,183.3))) * 43758.5453123);
              return n*2.0-1.0;
            }

            void main(){
              vec2 res = u_res;
              vec2 uv  = gl_FragCoord.xy;
              float dmin = min(res.x, res.y);
              vec2 p = (uv - 0.5*res) / dmin;  // -1..1
              vec2 m = (u_pointer - 0.5*res) / dmin;

              float t = u_time * u_speed;

              // domain warp
              vec2 pw = p;
              vec2 w1 = vec2(fbm(pw*1.2 + vec2(0.0, t*0.35)),
                             fbm(pw*1.2 + vec2(t*0.21, 0.0)));
              vec2 w2 = vec2(fbm(pw*2.1 - vec2(t*0.17, t*0.14)),
                             fbm(pw*2.1 + vec2(t*0.09, t*0.12)));
              pw += 0.25*w1 + 0.15*w2;

              // pointer attraction
              float attract = exp(-6.0 * length(p - m));
              pw += (m - pw) * (0.15 * attract);

              // animated lobes
              float R = u_size;
              float ang = atan(pw.y, pw.x);
              float lobes = 0.07*sin(ang*5.0 + t*0.9) + 0.045*sin(ang*3.0 - t*0.6);
              float sdf = length(pw) - (R + lobes*0.6);

              // body + volume
              float body  = 1.0 - smoothstep(-0.02, 0.22, sdf);
              float cloud = fbm(pw*2.6 + t*0.4);
              float vol   = smoothstep(0.0, 1.0, body) * (0.55 + 0.45*cloud);

              // center clamp
              float inten = softClamp(vol * (0.85 + 0.15*attract), 0.62, 0.55);

              // grain + vignette
              inten += grain(uv, t*30.0) * 0.035;
              float vig = smoothstep(1.2, 0.2, length(p*1.15));
              inten *= vig;

              vec3 col = grad(clamp(inten * u_gain, 0.0, 1.0));
              gl_FragColor = vec4(col, 0.92);
            }
          `,
          attributes: {
            position: [
              [-1, -1], [ 1, -1], [-1,  1],
              [ 1,  1], [-1,  1], [ 1, -1],
            ],
          },
          uniforms: {
            u_res: () => [canvas.width, canvas.height],
            u_time: regl.context("time"),
            u_pointer: () => [pointer.x * canvas.width, pointer.y * canvas.height],
            u_size: () => size,
            u_speed: () => speed,
            u_gain: () => gain,
            u_c0: () => c0, u_c1: () => c1, u_c2: () => c2, u_c3: () => c3,
          },
          count: 6,
        });

        // RAF
        let raf;
        const loop = () => {
          pointer.x += (pointer.tx - pointer.x) * 0.08;
          pointer.y += (pointer.ty - pointer.y) * 0.08;
          regl.clear({ color: [0, 0, 0, 0], depth: 1 });
          draw();
          raf = requestAnimationFrame(loop);
        };
        loop();

        destroyRef.current = () => {
          cancelAnimationFrame(raf);
          window.removeEventListener("resize", fit);
          window.removeEventListener("pointermove", onMove);
          window.removeEventListener("touchmove", onMove);
          try { regl.destroy(); } catch { /* noop */ }
          canvas.remove();
        };
      })
      .catch((err) => {
        // surfaces on your red badge script
        setTimeout(() => { throw err; }, 0);
      });

    return () => { cancelled = true; destroyRef.current?.(); };
  }, [size, speed, gain, JSON.stringify(palette)]);

  return <div ref={ref} aria-hidden />;
}