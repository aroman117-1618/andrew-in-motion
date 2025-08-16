// DriftBackground.tsx – Animated drift background with curl noise and interaction
"use client";

import { useEffect, useRef } from "react";

/**
 * Renders a full‑screen WebGL2 canvas with a swirling "Drift" effect
 * inspired by the macOS screensaver. The shader uses curl noise
 * layers to create fluid motion and applies the biophilic colour
 * palette as a lookup table. Pointer movement introduces local
 * velocity and clicks trigger damped ripples. When WebGL2 is not
 * available or the user has prefers‑reduced‑motion enabled, the
 * component hides the canvas; you can add a CSS fallback via
 * global styles.
 */
export default function DriftBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Respect OS-wide reduced motion setting
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      canvas.style.display = 'none';
      return;
    }

    // Acquire WebGL2 context; early exit if unavailable
    const tempGl = canvas.getContext('webgl2', {
      antialias: false,
      depth: false,
      stencil: false,
    }) as WebGL2RenderingContext | null;
    if (!tempGl) {
      canvas.style.display = 'none';
      return;
    }
    const gl: WebGL2RenderingContext = tempGl;

    // Cache non-null canvas for closure safety
    const c = canvas;
    let width = c.clientWidth;
    let height = c.clientHeight;
    c.width = width;
    c.height = height;
    gl.viewport(0, 0, width, height);

    // Vertex shader: convert clip‑space positions to UVs
    const vsSource = `#version 300 es
      precision highp float;
      in vec2 position;
      out vec2 vUv;
      void main() {
        vUv = position * 0.5 + 0.5;
        gl_Position = vec4(position, 0.0, 1.0);
      }
    `;

    // Fragment shader: curl noise drift with pointer & ripple
    const fsSource = `#version 300 es
      precision highp float;
      out vec4 fragColor;
      in vec2 vUv;
      uniform float uTime;
      uniform vec2 uPointer;
      uniform vec3 uRipple;
      // Biophilic palette (5 colours)
      const vec3 palette[5] = vec3[5](
        vec3(0.043137,0.239216,0.180392),
        vec3(0.086275,0.352941,0.290196),
        vec3(0.180392,0.545098,0.341176),
        vec3(0.607843,0.835294,0.690196),
        vec3(0.909803,0.960784,0.941176)
      );
      // Hash and noise functions
      float hash(vec2 p) {
        return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
      }
      float noise(vec2 p) {
        vec2 i = floor(p);
        vec2 f = fract(p);
        float a = hash(i);
        float b = hash(i + vec2(1.0, 0.0));
        float c2 = hash(i + vec2(0.0, 1.0));
        float d = hash(i + vec2(1.0, 1.0));
        vec2 u = f * f * (3.0 - 2.0 * f);
        return mix(mix(a, b, u.x), mix(c2, d, u.x), u.y);
      }
      // Compute curl of the noise field: returns a 2D vector
      vec2 curlNoise(vec2 p) {
        float e = 0.001;
        float n1 = noise(p + vec2(0.0, e));
        float n2 = noise(p - vec2(0.0, e));
        float n3 = noise(p + vec2(e, 0.0));
        float n4 = noise(p - vec2(e, 0.0));
        float dy = n3 - n4;
        float dx = n1 - n2;
        return normalize(vec2(dy, -dx));
      }
      // Palette lookup between five colours
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
        // Time‑varying position for drift; scale the domain
        vec2 p = uv * 3.0;
        float t = uTime * 0.05;
        // Integrate the curl field for swirling motion
        for (int i = 0; i < 4; i++) {
          vec2 v = curlNoise(p + t);
          p += v * 0.1;
        }
        float n = noise(p);
        float base = n * 0.5 + 0.5;
        // Pointer effect: brighten area near pointer
        float pointerDist = distance(uv, uPointer);
        float pointerFx = exp(-pointerDist * 8.0);
        // Ripple effect: damped sine waves from clicks
        float rippleVal = 0.0;
        float age = uRipple.z;
        if (age < 4.0) {
          float d = distance(uv, uRipple.xy);
          rippleVal = sin(d * 20.0 - age * 6.2831) * exp(-d * 10.0) * (1.0 - age / 4.0);
        }
        float colVal = base + pointerFx * 0.3 + rippleVal * 0.5;
        colVal = clamp(colVal, 0.0, 1.0);
        vec3 color = paletteLookup(colVal);
        fragColor = vec4(color, 1.0);
      }
    `;

    // Compile shader helpers
    function createShader(glCtx: WebGL2RenderingContext, type: number, source: string): WebGLShader {
      const shader = glCtx.createShader(type);
      if (!shader) throw new Error('Unable to create shader');
      glCtx.shaderSource(shader, source);
      glCtx.compileShader(shader);
      if (!glCtx.getShaderParameter(shader, glCtx.COMPILE_STATUS)) {
        console.error(glCtx.getShaderInfoLog(shader));
        throw new Error('Shader compilation failed');
      }
      return shader;
    }

    const vertShader = createShader(gl, gl.VERTEX_SHADER, vsSource);
    const fragShader = createShader(gl, gl.FRAGMENT_SHADER, fsSource);
    const program = gl.createProgram();
    if (!program) throw new Error('Unable to create program');
    gl.attachShader(program, vertShader);
    gl.attachShader(program, fragShader);
    gl.bindAttribLocation(program, 0, 'position');
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error(gl.getProgramInfoLog(program));
      throw new Error('Program link failed');
    }
    gl.useProgram(program);

    // Create geometry: two triangles forming a quad
    const positions = new Float32Array([
      -1, -1, 1, -1, -1, 1,
      -1, 1, 1, -1, 1, 1,
    ]);
    const vao = gl.createVertexArray();
    gl.bindVertexArray(vao);
    const vbo = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
    gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);
    gl.enableVertexAttribArray(0);
    gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);

    // Uniform locations
    const timeLoc = gl.getUniformLocation(program, 'uTime');
    const pointerLoc = gl.getUniformLocation(program, 'uPointer');
    const rippleLoc = gl.getUniformLocation(program, 'uRipple');

    // Interaction state
    let pointer = { x: 0.5, y: 0.5 };
    let ripple = { x: 0.5, y: 0.5, age: 10.0 };

    // Resize handler to maintain aspect ratio and viewport
    function resize() {
      width = c.clientWidth;
      height = c.clientHeight;
      c.width = width;
      c.height = height;
      gl.viewport(0, 0, width, height);
    }
    resize();
    window.addEventListener('resize', resize);

    // Pointer movement updates pointer position
    function onPointerMove(e: PointerEvent) {
      const rect = c.getBoundingClientRect();
      pointer.x = (e.clientX - rect.left) / rect.width;
      pointer.y = 1.0 - (e.clientY - rect.top) / rect.height;
    }
    function onPointerDown(e: PointerEvent) {
      const rect = c.getBoundingClientRect();
      ripple.x = (e.clientX - rect.left) / rect.width;
      ripple.y = 1.0 - (e.clientY - rect.top) / rect.height;
      ripple.age = 0.0;
    }
    c.addEventListener('pointermove', onPointerMove);
    c.addEventListener('pointerdown', onPointerDown);

    // Animation loop
    let startTime = performance.now();
    let lastTime = startTime;
    let rafId: number;
    const render = (now: number) => {
      const t = (now - startTime) / 1000;
      const dt = (now - lastTime) / 1000;
      lastTime = now;
      ripple.age += dt;
      gl.uniform1f(timeLoc, t);
      gl.uniform2f(pointerLoc, pointer.x, pointer.y);
      gl.uniform3f(rippleLoc, ripple.x, ripple.y, ripple.age);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
      rafId = requestAnimationFrame(render);
    };
    rafId = requestAnimationFrame(render);

    // Pause/resume when page visibility changes
    function onVisibility() {
      if (document.hidden) {
        cancelAnimationFrame(rafId);
      } else {
        lastTime = performance.now();
        rafId = requestAnimationFrame(render);
      }
    }
    document.addEventListener('visibilitychange', onVisibility);

    // Cleanup on unmount
    return () => {
      window.removeEventListener('resize', resize);
      c.removeEventListener('pointermove', onPointerMove);
      c.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('visibilitychange', onVisibility);
      cancelAnimationFrame(rafId);
      gl.deleteProgram(program);
      gl.deleteShader(vertShader);
      gl.deleteShader(fragShader);
      gl.deleteBuffer(vbo);
      gl.deleteVertexArray(vao);
    };
  }, []);

  // Render the canvas. The fixed positioning and negative z-index
  // ensure it sits behind content. Additional CSS fallback can be
  // provided via globals.css for browsers without WebGL2.
  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10 w-full h-full"
      style={{ display: 'block' }}
    />
  );
}
