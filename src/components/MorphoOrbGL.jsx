import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * MorphoOrbGL
 * - Fullscreen, click/scroll reactive emerald orb
 * - GPU fragment shader: fBM noise + domain warp + soft bloom + film grain
 * - Pointer target eased with a spring so it “lurches” toward interactions
 *
 * Usage:
 * <MorphoOrbGL />
 */
export default function MorphoOrbGL({
  // Tunables to match your brand
  palette = {
    deep:   new THREE.Color("#112917"), // deep pine
    mid:    new THREE.Color("#3B6255"), // pine
    bright: new THREE.Color("#1C8B66"), // emerald
  },
  intensity = 0.9,     // overall brightness (0.0–1.2)
  grain = 0.12,        // film grain amount
  speed = 0.08,        // time speed
  wobble = 1.35,       // domain warp strength
  radius = 0.62,       // orb radius in screen-min units
  feather = 0.45,      // edge softness (0.2–0.8)
}) {
  const mountRef = useRef(null);
  const rendererRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const meshRef = useRef(null);
  const uniformsRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    const renderer = new THREE.WebGLRenderer({
      antialias: false,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    rendererRef.current = renderer;
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    cameraRef.current = camera;

    // Geometry: full-screen quad
    const geom = new THREE.PlaneGeometry(2, 2);

    // Shaders
    const vert = /* glsl */`
      varying vec2 vUv;
      void main(){
        vUv = uv;
        gl_Position = vec4(position, 1.0);
      }
    `;

    const frag = /* glsl */`
      precision highp float;
      varying vec2 vUv;

      uniform vec2  u_res;
      uniform float u_time;
      uniform vec2  u_target;   // pointer target in NDC (-1..1)
      uniform vec3  u_colDeep;  // #112917
      uniform vec3  u_colMid;   // #3B6255
      uniform vec3  u_colBright;// #1C8B66
      uniform float u_intensity;
      uniform float u_grain;
      uniform float u_speed;
      uniform float u_wobble;
      uniform float u_radius;
      uniform float u_feather;

      // ----- Hash & Noise (IQ-style) -----
      float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123); }

      float noise(vec2 p){
        vec2 i = floor(p);
        vec2 f = fract(p);
        float a = hash(i);
        float b = hash(i + vec2(1.0, 0.0));
        float c = hash(i + vec2(0.0, 1.0));
        float d = hash(i + vec2(1.0, 1.0));
        vec2 u = f*f*(3.0-2.0*f);
        return mix(mix(a,b,u.x), mix(c,d,u.x), u.y);
      }

      float fbm(vec2 p){
        float v = 0.0;
        float a = 0.5;
        for(int i=0;i<5;i++){
          v += a * noise(p);
          p *= 2.02;
          a *= 0.55;
        }
        return v;
      }

      // Film grain (blue-noise-ish)
      float grain(vec2 p){
        // per-pixel hash varying over time
        return fract(sin(dot(p.xy, vec2(12.9898,78.233)) + u_time*37.0)*43758.5453);
      }

      void main(){
        // Normalize coordinate system to center, preserve aspect
        vec2 uv = (vUv - 0.5);
        uv.x *= u_res.x / u_res.y;

        // Pointer attraction (spring target): pull domain center toward pointer
        // u_target is NDC (-1..1). Convert to our aspect-correct space.
        vec2 pt = u_target;
        pt.x *= u_res.x / u_res.y;
        vec2 center = mix(vec2(0.0), pt, 0.28); // how much the orb follows

        // Radial mask for orb
        float r = length(uv - center);
        float baseMask = smoothstep(u_radius, u_radius - u_feather, r);

        // Domain-warped noise field to shape the orb interior
        vec2 p = (uv - center) * 1.8;
        float t = u_time * u_speed;

        // First warp
        vec2 q = p + vec2(
          fbm(p + vec2(0.0, t * 0.8)),
          fbm(p + vec2(5.2, -t * 0.6))
        ) * u_wobble;

        // Second warp for inner detail
        vec2 w = q + vec2(
          fbm(q + vec2(1.7, t * 0.4)),
          fbm(q + vec2(-9.2, -t * 0.3))
        ) * (u_wobble * 0.5);

        // Interior density
        float d1 = fbm(q * 1.2 + t*0.25);
        float d2 = fbm(w * 2.0 - t*0.15);

        // Combine densities, increase contrast softly
        float density = pow(smoothstep(0.15, 0.95, (d1*0.6 + d2*0.8)), 1.25);

        // Color ramp: deep -> mid -> bright
        vec3 col = mix(u_colDeep, u_colMid, density);
        col = mix(col, u_colBright, pow(density, 1.6));

        // Apply radial attenuation so edges fall to black/transparent
        col *= (1.0 - baseMask);

        // Soft outer bloom (feather) by sampling radial gradient
        float bloom = smoothstep(u_radius*0.85, u_radius*0.35, r);
        col += col * bloom * 0.45;

        // Film grain & subtle dither to avoid banding
        float g = grain(uv* u_res) * u_grain;
        col += (g - u_grain*0.5) * 0.6;

        // Overall intensity + mild vignette
        float vign = smoothstep(1.25, 0.25, length(uv)*0.85);
        col *= (u_intensity * vign);

        // Clamp for safety; output with premultiplied alpha feel
        col = clamp(col, 0.0, 1.0);

        // Slight opacity so UI can breathe (if you want more, reduce here)
        float alpha = 0.9 * (1.0 - baseMask);
        gl_FragColor = vec4(col, alpha);
      }
    `;

    // Uniforms
    const uniforms = {
      u_res:       { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
      u_time:      { value: 0 },
      u_target:    { value: new THREE.Vector2(0, 0) },
      u_colDeep:   { value: palette.deep },
      u_colMid:    { value: palette.mid },
      u_colBright: { value: palette.bright },
      u_intensity: { value: intensity },
      u_grain:     { value: grain },
      u_speed:     { value: speed },
      u_wobble:    { value: wobble },
      u_radius:    { value: radius },
      u_feather:   { value: feather },
    };
    uniformsRef.current = uniforms;

    const mat = new THREE.ShaderMaterial({
      uniforms,
      vertexShader: vert,
      fragmentShader: frag,
      transparent: true,
      depthTest: false,
      depthWrite: false,
    });

    const mesh = new THREE.Mesh(geom, mat);
    meshRef.current = mesh;
    scene.add(mesh);

    // Pointer → spring target (NDC)
    let target = new THREE.Vector2(0, 0);
    let spring = new THREE.Vector2(0, 0);
    let vel = new THREE.Vector2(0, 0);

    const toNDC = (x, y) => {
      const ndc = new THREE.Vector2(
        (x / window.innerWidth) * 2 - 1,
        -((y / window.innerHeight) * 2 - 1)
      );
      return ndc;
    };

    const onPointer = (e) => {
      const x = e.touches ? e.touches[0].clientX : e.clientX;
      const y = e.touches ? e.touches[0].clientY : e.clientY;
      target.copy(toNDC(x, y));
    };

    window.addEventListener("pointermove", onPointer, { passive: true });
    window.addEventListener("touchmove",  onPointer, { passive: true });
    window.addEventListener("click",      onPointer, { passive: true });

    // Resize
    const onResize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      uniforms.u_res.value.set(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", onResize);

    // Animate
    let rafId;
    const clock = new THREE.Clock();
    const animate = () => {
      rafId = requestAnimationFrame(animate);
      const dt = Math.min(clock.getDelta(), 0.033);

      // critically-damped spring toward target
      const stiffness = 6.0;
      const damping = 8.5;
      const f = target.clone().sub(spring).multiplyScalar(stiffness);
      vel.add(f.multiplyScalar(dt));
      vel.multiplyScalar(Math.exp(-damping * dt));
      spring.add(vel.clone().multiplyScalar(dt));

      uniforms.u_time.value += dt;
      uniforms.u_target.value.copy(spring);
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pointermove", onPointer);
      window.removeEventListener("touchmove", onPointer);
      window.removeEventListener("click", onPointer);
      scene.clear();
      renderer.dispose();
      mount.removeChild(renderer.domElement);
    };
  }, [intensity, grain, speed, wobble, radius, feather, palette]);

  // Absolutely‑positioned, non‑interactive background
  return (
    <div
      ref={mountRef}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none", // UI stays clickable
      }}
      aria-hidden="true"
    />
  );
}