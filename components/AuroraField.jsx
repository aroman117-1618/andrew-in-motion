// src/components/AuroraField.jsx
// A responsive, click/touch-reactive aurora background using regl + GLSL.
// Sits behind your content (fixed, -z-10), never blocks clicks (pointer-events: none).

import React from "react";

// Lazy-load regl so SSR/preview tools don't choke.
let createREGL = null;

export default function AuroraField({
  // visual tuning knobs you can tweak from App.jsx if you want
  strength = 0.75,     // overall intensity (0.0–1.2)
  speed = 0.07,        // base animation speed
  grain = 0.035,       // film-grain amount
  mousePull = 0.45,    // how strongly the aurora "reaches" for pointer
  pulseDecay = 1.9,    // how quickly clicks fade out
  palette = [
    [17, 41, 23],      // pine      #112917
    [28, 139, 102],    // emerald   #1C8B66
    [59, 98, 85],      // deep      #3B6255
    [155, 194, 96],    // lime-glow #9BC260
  ],
}) {
  const canvasRef = React.useRef(null);
  const rafRef = React.useRef(0);
  const reglRef = React.useRef(null);
  const drawRef = React.useRef(null);

  // uniforms
  const timeRef = React.useRef(0);
  const mouseRef = React.useRef([0.5, 0.5]); // normalized 0..1
  const pulseRef = React.useRef(0.0);

  React.useEffect(() => {
    let mounted = true;

    (async () => {
      if (!createREGL) {
        // dynamic import (vite friendly)
        const mod = await import("regl");
        createREGL = mod.default ?? mod;
      }
      if (!mounted) return;

      const canvas = canvasRef.current;
      const regl = createREGL({
        canvas,
        attributes: { antialias: false, premultipliedAlpha: true },
        extensions: [],
        pixelRatio: Math.min(window.devicePixelRatio || 1, 2),
      });
      reglRef.current = regl;

      // Fullscreen triangle
      const draw = regl({
        vert: `
          precision mediump float;
          attribute vec2 position;
          void main() {
            gl_Position = vec4(position, 0.0, 1.0);
          }
        `,
        frag: `
          precision mediump float;

          // ------- uniforms
          uniform float u_time;
          uniform vec2  u_res;
          uniform vec2  u_mouse;     // 0..1
          uniform float u_pulse;
          uniform float u_speed;
          uniform float u_strength;
          uniform float u_grain;
          uniform float u_mousePull;

          uniform vec3 u_c0;
          uniform vec3 u_c1;
          uniform vec3 u_c2;
          uniform vec3 u_c3;

          // ------- utils / noise (fbm + curl-ish warping)
          float hash(vec2 p){ 
            return fract(sin(dot(p, vec2(127.1,311.7))) * 43758.5453123);
          }
          float noise(vec2 p){
            vec2 i=floor(p), f=fract(p);
            float a=hash(i), b=hash(i+vec2(1.0,0.0));
            float c=hash(i+vec2(0.0,1.0)), d=hash(i+vec2(1.0,1.0));
            vec2 u=f*f*(3.0-2.0*f);
            return mix(a,b,u.x)+ (c-a)*u.y*(1.0-u.x) + (d-b)*u.x*u.y;
          }
          float fbm(vec2 p){
            float v=0.0, a=0.5;
            for(int i=0;i<5;i++){
              v+=a*noise(p);
              p*=2.1;
              a*=0.55;
            }
            return v;
          }

          // simple film grain
          float nrand(vec2 co){
            return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);
          }

          void main(){
            vec2 uv = gl_FragCoord.xy / u_res;
            vec2 p  = (uv - 0.5);
            p.x *= u_res.x/u_res.y;

            // radial vignette so edges melt to black
            float vign = smoothstep(1.10, 0.30, length(p));

            // animated domain-warped fbm
            float t = u_time * u_speed;
            vec2  q = p;

            // two layers of domain warp to break symmetry
            vec2 w1 = vec2(
              fbm(q*1.30 + vec2( 0.30 + t*0.6, -0.25 - t*0.2)),
              fbm(q*1.70 + vec2(-0.55 - t*0.3,  0.40 + t*0.5))
            );
            q += (w1 - 0.5) * 0.85;

            vec2 w2 = vec2(
              fbm(q*2.60 + vec2( t*0.35, -t*0.42)),
              fbm(q*2.10 + vec2(-t*0.21,  t*0.28))
            );
            q += (w2 - 0.5) * 0.55;

            // pointer attraction (reaches toward pointer, plus click pulse)
            vec2 m = (u_mouse - 0.5);
            m.x *= u_res.x/u_res.y;
            float d  = length(p - m);
            float pull = exp(-6.0*d) * u_mousePull + u_pulse*exp(-10.0*d);
            q += normalize((m - p) + 1e-4) * pull * 0.12;

            // final field
            float f  = fbm(q*2.1 + vec2(t*0.25, -t*0.33));
            f = pow(smoothstep(0.18, 0.95, f) * vign, 1.25);

            // color blend (emerald→teal→deep→lime glow)
            vec3 col = mix(u_c0, u_c1, clamp(f*1.05, 0.0, 1.0));
            col = mix(col, u_c2, pow(f, 2.0));
            col = mix(col, u_c3, smoothstep(0.55, 0.95, f));

            // film grain / sparkle like the Morpho aesthetic
            float g  = (nrand(uv * (u_time*0.37 + 13.7)) - 0.5) * u_grain;
            col *= (0.65 + f*0.55) * u_strength;
            col += g;

            gl_FragColor = vec4(col, 1.0);
          }
        `,
        attributes: {
          position: [
            [-1, -1],
            [ 3, -1],
            [-1,  3],
          ],
        },
        uniforms: {
          u_time:       () => timeRef.current,
          u_res:        (ctx) => [ctx.viewportWidth, ctx.viewportHeight],
          u_mouse:      () => mouseRef.current,
          u_pulse:      () => pulseRef.current,
          u_speed:      () => speed,
          u_strength:   () => strength,
          u_grain:      () => grain,
          u_mousePull:  () => mousePull,
          // colors normalized 0..1
          u_c0: () => palette[0].map(v => v/255),
          u_c1: () => palette[1].map(v => v/255),
          u_c2: () => palette[2].map(v => v/255),
          u_c3: () => palette[3].map(v => v/255),
        },
        count: 3,
        depth: { enable: false },
        blend: {
          enable: true,
          func: { src: "one", dst: "one minus src alpha" },
          equation: "add",
          color: [0,0,0,0],
        },
      });

      drawRef.current = draw;

      // resize canvas to fill viewport
      function fit() {
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        const w = Math.floor(window.innerWidth * dpr);
        const h = Math.floor(window.innerHeight * dpr);
        if (canvas.width !== w || canvas.height !== h) {
          canvas.width = w;
          canvas.height = h;
          canvas.style.width = "100%";
          canvas.style.height = "100%";
        }
      }
      fit();
      const resizeObserver = new ResizeObserver(fit);
      resizeObserver.observe(document.documentElement);

      // pointer listeners (canvas has pointer-events: none, so use window)
      const onMove = (e) => {
        const x = e.touches ? e.touches[0].clientX : e.clientX;
        const y = e.touches ? e.touches[0].clientY : e.clientY;
        mouseRef.current = [x / window.innerWidth, 1 - (y / window.innerHeight)];
      };
      const onDown = () => {
        // kick a pulse that decays
        pulseRef.current = Math.min(1.0, pulseRef.current + 0.5);
      };

      window.addEventListener("mousemove", onMove, { passive: true });
      window.addEventListener("touchmove", onMove, { passive: true });
      window.addEventListener("mousedown", onDown, { passive: true });
      window.addEventListener("touchstart", onDown, { passive: true });

      // RAF loop
      let last = performance.now();
      const loop = (t) => {
        const dt = (t - last) / 1000;
        last = t;
        timeRef.current += dt;

        // exponential decay for click pulse
        if (pulseRef.current > 0.0001) {
          pulseRef.current *= Math.exp(-pulseDecay * dt);
        } else {
          pulseRef.current = 0.0;
        }

        regl.poll();
        draw();
        rafRef.current = requestAnimationFrame(loop);
      };
      rafRef.current = requestAnimationFrame(loop);

      return () => {
        mounted = false;
        cancelAnimationFrame(rafRef.current);
        resizeObserver.disconnect();
        window.removeEventListener("mousemove", onMove);
        window.removeEventListener("touchmove", onMove);
        window.removeEventListener("mousedown", onDown);
        window.removeEventListener("touchstart", onDown);
        try { regl.destroy(); } catch {}
      };
    })();

    return () => { mounted = false; };
  }, [strength, speed, grain, mousePull, pulseDecay, palette]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 -z-10 w-full h-full pointer-events-none select-none"
    />
  );
}
