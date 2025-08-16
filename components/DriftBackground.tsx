"use client";

import { useEffect, useRef } from 'react';

/**
 * DriftBackground implements a subtle, continuous motion backdrop using WebGL2.
 * When WebGL or motion is unavailable it falls back to a simple radial-gradient animation.
 */
export default function DriftBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    // Respect prefers-reduced-motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      canvas.style.display = 'none';
      return;
    }
    const gl = canvas.getContext('webgl2', { antialias: false, depth: false, stencil: false });
    if (!gl) {
      // WebGL unsupported; hide canvas and let CSS fallback take over
      canvas.style.display = 'none';
      return;
    }
    let width = canvas.clientWidth;
    let height = canvas.clientHeight;
    canvas.width = width;
    canvas.height = height;
    gl.viewport(0, 0, width, height);

    // Vertex shader: full screen triangle
    const vsSource = `#version 300 es
    precision highp float;
    in vec2 position;
    out vec2 vUv;
    void main() {
      vUv = position * 0.5 + 0.5;
      gl_Position = vec4(position, 0.0, 1.0);
    }
    `;
    // Fragment shader: layered noise and pointer ripple
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
    // Simple 2D value noise based on cosines; not true simplex but cheap
    float valueNoise(vec2 p) {
      vec2 i = floor(p);
      vec2 f = fract(p);
      // Four corners
      float a = dot(sin(i), vec2(127.1,311.7));
      float b = dot(sin(i + vec2(1.0,0.0)), vec2(269.5,183.3));
      float c = dot(sin(i + vec2(0.0,1.0)), vec2(419.2,371.9));
      float d = dot(sin(i + vec2(1.0,1.0)), vec2(219.7,438.4));
      vec2 u = f*f*(3.0-2.0*f);
      return mix(mix(sin(a), sin(b), u.x), mix(sin(c), sin(d), u.x), u.y);
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
      // time-based motion on noise coordinate
      float t = uTime * 0.05;
      float n = valueNoise((uv + t) * 3.0);
      float n2 = valueNoise((uv - t*0.7) * 6.0);
      float combined = mix(n, n2, 0.5);
      // Pointer attraction: radial falloff
      float distPointer = distance(uv, uPointer);
      float pointerEffect = exp(-distPointer * 8.0);
      // Ripple: radial wave emanating from uRipple.x/y, damped over time
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
    }
    `;
    // Compile shaders
    function createShader(gl, type, source) {
      const shader = gl.createShader(type);
      if (!shader) throw new Error('shader');
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error(gl.getShaderInfoLog(shader));
        throw new Error('Shader compile failed');
      }
      return shader;
    }
    const vertexShader = createShader(gl, gl.VERTEX_SHADER, vsSource);
    const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fsSource);
    const program = gl.createProgram();
    if (!program) throw new Error('program');
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.bindAttribLocation(program, 0, 'position');
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error(gl.getProgramInfoLog(program));
      throw new Error('Program link failed');
    }
    gl.useProgram(program);
    // Provide geometry: two triangles covering full screen
    const positions = new Float32Array([
      -1, -1,   1, -1,  -1, 1,
      -1, 1,    1, -1,   1, 1
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
    // State
    let pointer = { x: 0.5, y: 0.5 };
    let ripple = { x: 0.5, y: 0.5, age: 10.0 };
    // Resize handler
    function resize() {
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = width;
      canvas.height = height;
      gl.viewport(0, 0, width, height);
    }
    resize();
    window.addEventListener('resize', resize);
    // Pointer movement and ripple
    function setPointer(e) {
      const rect = canvas.getBoundingClientRect();
      pointer.x = (e.clientX - rect.left) / rect.width;
      pointer.y = 1.0 - (e.clientY - rect.top) / rect.height;
    }
    function click(e) {
      const rect = canvas.getBoundingClientRect();
      ripple.x = (e.clientX - rect.left) / rect.width;
      ripple.y = 1.0 - (e.clientY - rect.top) / rect.height;
      ripple.age = 0.0;
    }
    canvas.addEventListener('pointermove', setPointer);
    canvas.addEventListener('pointerdown', click);
    // Animation loop
    let start = performance.now();
    let lastTime = start;
    let rafId;
    const render = (now) => {
      const time = (now - start) / 1000;
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
    // Pause on tab hidden to save resources
    function handleVisibility() {
      if (document.hidden) {
        cancelAnimationFrame(rafId);
      } else {
        lastTime = performance.now();
        rafId = requestAnimationFrame(render);
      }
    }
    document.addEventListener('visibilitychange', handleVisibility);
    return () => {
      window.removeEventListener('resize', resize);
      canvas.removeEventListener('pointermove', setPointer);
      canvas.removeEventListener('pointerdown', click);
      document.removeEventListener('visibilitychange', handleVisibility);
      cancelAnimationFrame(rafId);
      gl.deleteProgram(program);
      gl.deleteShader(vertexShader);
      gl.deleteShader(fragmentShader);
      gl.deleteBuffer(vbo);
      gl.deleteVertexArray(vao);
    };
  }, []);

  // CSS fallback: radial gradient animation via inline style
  return (
    <>
      <canvas ref={canvasRef} className="fixed inset-0 w-full h-full pointer-events-none select-none" />
      <div className="fixed inset-0 -z-10 animate-gradient bg-gradient-radial from-primary/40 via-background to-background" />
    </>
  );
}