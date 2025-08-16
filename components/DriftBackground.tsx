// components/DriftBackground.tsx
"use client";

import { useEffect, useRef } from "react";

export default function DriftBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Respect prefers‑reduced‑motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      canvas.style.display = "none";
      return;
    }

    // Grab WebGL2 context and cast for TypeScript
    const gl = canvas.getContext("webgl2", {
      antialias: false,
      depth: false,
      stencil: false,
    }) as WebGL2RenderingContext | null;

    // Fallback if WebGL2 isn’t available
    if (!gl) {
      canvas.style.display = "none";
      return;
    }

    // Cache non-null canvas in a new variable so TS knows it's safe
    const c = canvas;

    let width = c.clientWidth;
    let height = c.clientHeight;
    c.width = width;
    c.height = height;
    gl.viewport(0, 0, width, height);

    // Shader sources (same as before)
    const vsSource = `#version 300 es
    precision highp float;
    in vec2 position;
    out vec2 vUv;
    void main() {
      vUv = position * 0.5 + 0.5;
      gl_Position = vec4(position, 0.0, 1.0);
    }`;

    const fsSource = `#version 300 es
    precision highp float;
    out vec4 fragColor;
    in vec2 vUv;
    uniform float uTime;
    uniform vec2 uPointer;
    uniform vec3 uRipple; // x,y = pos in uv coords, z = age
    const vec3 palette[5] = vec3[5](
      vec3(0.043137,0.239216,0.180392),
      vec3(0.086275,0.352941,0.290196),
      vec3(0.180392,0.545098,0.341176),
      vec3(0.607843,0.835294,0.690196),
      vec3(0.909803,0.960784,0.941176)
    );
    float valueNoise(vec2 p) {
      vec2 i = floor(p);
      vec2 f = fract(p);
      float a = dot(sin(i), vec2(127.1,311.7));
      float b = dot(sin(i + vec2(1.0,0.0)), vec2(269.5,183.3));
      float c2 = dot(sin(i + vec2(0.0,1.0)), vec2(419.2,371.9));
      float d = dot(sin(i + vec2(1.0,1.0)), vec2(219.7,438.4));
      vec2 u = f*f*(3.0-2.0*f);
      return mix(mix(sin(a), sin(b), u.x), mix(sin(c2), sin(d), u.x), u.y);
    }
    vec3 paletteLookup(float t) {
      float x = clamp(t, 0.0, 0.999);
      float seg = x * 4.0;
      int idx = int(floor(seg));
      float f = fract(seg);
      vec3 c0 = palette[idx];
      vec3 c1 = palette[idx+1];
      return mix(c0, c1, f);
    }
    void main() {
      vec2 uv = vUv;
      float t = uTime * 0.05;
      float n = valueNoise((uv + t) * 3.0);
      float n2 = valueNoise((uv - t*0.7) * 6.0);
      float combined = mix(n, n2, 0.5);
      float distPointer = distance(uv, uPointer);
      float pointerEffect = exp(-distPointer * 8.0);
      float rippleAge = uRipple.z;
      float rippleDist = distance(uv, uRipple.xy);
      float ripple = 0.0;
      if (rippleAge < 4.0) {
        ripple = sin(rippleDist*20.0 - rippleAge*6.2831) * exp(-rippleDist*10.0) * (1.0 - rippleAge/4.0);
      }
      float finalVal = combined + pointerEffect*0.3 + ripple*0.5;
      finalVal = clamp(finalVal * 0.5 + 0.5, 0.0, 1.0);
      vec3 color = paletteLookup(finalVal);
      fragColor = vec4(color, 1.0);
    }`;

    // Compile shaders
    function createShader(
      gl: WebGL2RenderingContext,
      type: number,
      source: string,
    ): WebGLShader {
      const shader = gl.createShader(type);
      if (!shader) throw new Error("shader creation failed");
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error(gl.getShaderInfoLog(shader));
        throw new Error("Shader compile failed");
      }
      return shader;
    }

    const vertexShader = createShader(gl, gl.VERTEX_SHADER, vsSource);
    const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fsSource);

    const program = gl.createProgram();
    if (!program) throw new Error("program creation failed");
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.bindAttribLocation(program, 0, "position");
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error(gl.getProgramInfoLog(program));
      throw new Error("Program link failed");
    }
    gl.useProgram(program);

    // Full-screen geometry
    const positions = new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]);
    const vao = gl.createVertexArray();
    gl.bindVertexArray(vao);
    const vbo = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
    gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);
    gl.enableVertexAttribArray(0);
    gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);

    // Uniforms
    const timeLoc = gl.getUniformLocation(program, "uTime");
    const pointerLoc = gl.getUniformLocation(program, "uPointer");
    const rippleLoc = gl.getUniformLocation(program, "uRipple");

    // State
    let pointer = { x: 0.5, y: 0.5 };
    let ripple = { x: 0.5, y: 0.5, age: 10.0 };

    // Resize handler with null check
    function resize(): void {
      width = c.clientWidth;
      height = c.clientHeight;
      c.width = width;
      c.height = height;
      gl.viewport(0, 0, width, height);
    }
    resize();
    window.addEventListener("resize", resize);

    // Pointer movement and click handlers with null check
    function setPointer(e: PointerEvent): void {
      const rect = c.getBoundingClientRect();
      pointer.x = (e.clientX - rect.left) / rect.width;
      pointer.y = 1.0 - (e.clientY - rect.top) / rect.height;
    }
    function click(e: PointerEvent): void {
      const rect = c.getBoundingClientRect();
      ripple.x = (e.clientX - rect.left) / rect.width;
      ripple.y = 1.0 - (e.clientY - rect.top) / rect.height;
      ripple.age = 0.0;
    }
    c.addEventListener("pointermove", setPointer);
    c.addEventListener("pointerdown", click);

    // Animation loop
    let startTime = performance.now();
    let lastTime = startTime;
    let rafId: number;
    const render = (now: number): void => {
      const time = (now - startTime) / 1000;
      const dt = (now - lastTime) / 1000;
      lastTime = now;
      ripple.age += dt;
      gl.uniform1f(timeLoc, time);
      gl.uniform2f(pointerLoc, pointer.x, pointer.y);
      gl.uniform3f(rippleLoc, ripple.x, ripple.y, ripple.age);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
      rafId = requestAnimationFrame(render);
    };
    rafId = requestAnimationFrame(render);

    // Pause when tab is hidden
    function handleVisibility(): void {
      if (document.hidden) {
        cancelAnimationFrame(rafId);
      } else {
        lastTime = performance.now();
        rafId = requestAnimationFrame(render);
      }
    }
    document.addEventListener("visibilitychange", handleVisibility);

    // Cleanup on unmount
    return () => {
      window.removeEventListener("resize", resize);
      c.removeEventListener("pointermove", setPointer);
      c.removeEventListener("pointerdown", click);
      document.removeEventListener("visibilitychange", handleVisibility);
      cancelAnimationFrame(rafId);
      gl.deleteProgram(program);
      gl.deleteShader(vertexShader);
      gl.deleteShader(fragmentShader);
      gl.deleteBuffer(vbo);
      gl.deleteVertexArray(vao);
    };
  }, []);

  // Canvas element only; fallback animation is handled via CSS if needed
  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10 w-full h-full"
      style={{ display: "block" }}
    />
  );
}
