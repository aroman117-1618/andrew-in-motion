'use client';

import { useEffect, useRef } from 'react';

export default function DriftBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Respect prefers‑reduced‑motion; hide canvas if user prefers reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      canvas.style.display = 'none';
      return;
    }

    // Get WebGL2 context; handle null separately then cast to non-null
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

    // Cache canvas in a new variable for TS non-null inference
    const c = canvas;

    // Setup size and viewport
    let width = c.clientWidth;
    let height = c.clientHeight;
    c.width = width;
    c.height = height;
    gl.viewport(0, 0, width, height);

    // Vertex shader: pass UV coords to fragment shader
    const vsSource = `#version 300 es
    precision highp float;
    in vec2 position;
    out vec2 vUv;
    void main() {
      vUv = position * 0.5 + 0.5;
      gl_Position = vec4(position, 0.0, 1.0);
    }`;

    // Fragment shader: curl noise drift + pointer and ripple interactions
    const fsSource = `#version 300 es
    precision highp float;
    out vec4 fragColor;
    in vec2 vUv;
    uniform float uTime;
    uniform vec2 uPointer;
    uniform vec3 uRipple;
    // Biophilic colour palette from your instructions
    const vec3 palette[5] = vec3[5](
      vec3(0.043137,0.239216,0.180392),
      vec3(0.086275,0.352941,0.290196),
      vec3(0.180392,0.545098,0.341176),
      vec3(0.607843,0.835294,0.690196),
      vec3(0.909803,0.960784,0.941176)
    );
    // Simple hash and value noise
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
    // Curl of the noise field yields a swirling vector
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
    // Palette lookup by linear interpolation across five colours
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
      // Sample the curl noise field over several steps to create swirling motion
      vec2 p = uv * 3.0;
      float time = uTime * 0.05;
      for (int i = 0; i < 4; i++) {
        vec2 v = curlNoise(p + time);
        p += v * 0.1;
      }
      float n = noise(p);
      float colorVal = n * 0.5 + 0.5;

      // Mouse/touch pointer brightening
      float distPointer = distance(uv, uPointer);
      float pointerEffect = exp(-distPointer * 8.0);

      // Ripple on click: damped oscillation expanding outward
      float ripple = 0.0;
      float rippleAge = uRipple.z;
      if (rippleAge < 4.0) {
        float rippleDist = distance(uv, uRipple.xy);
        ripple = sin(rippleDist * 20.0 - rippleAge * 6.2831)
                 * exp(-rippleDist * 10.0)
                 * (1.0 - rippleAge / 4.0);
      }

      float finalVal = colorVal + pointerEffect * 0.3 + ripple * 0.5;
      finalVal = clamp(finalVal, 0.0, 1.0);
      vec3 col = paletteLookup(finalVal);
      fragColor = vec4(col, 1.0);
    }`;

    // Compile and link shaders
    function createShader(glCtx: WebGL2RenderingContext, type: number, source: string): WebGLShader {
      const shader = glCtx.createShader(type);
      if (!shader) throw new Error('Failed to create shader');
      glCtx.shaderSource(shader, source);
      glCtx.compileShader(shader);
      if (!glCtx.getShaderParameter(shader, glCtx.COMPILE_STATUS)) {
        console.error(glCtx.getShaderInfoLog(shader));
        throw new Error('Shader compile failed');
      }
      return shader;
    }
    const vertexShader = createShader(gl, gl.VERTEX_SHADER, vsSource);
    const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fsSource);

    const program = gl.createProgram();
    if (!program) throw new Error('Program creation failed');
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.bindAttribLocation(program, 0, 'position');
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error(gl.getProgramInfoLog(program));
      throw new Error('Program link failed');
    }
    gl.useProgram(program);

    // Full-screen triangle strip
    const positions = new Float32Array([
      -1, -1,
       1, -1,
      -1,  1,
      -1,  1,
       1, -1,
       1,  1,
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

    // Resize handler
    function resize() {
      width = c.clientWidth;
      height = c.clientHeight;
      c.width = width;
      c.height = height;
      gl.viewport(0, 0, width, height);
    }
    resize();
    window.addEventListener('resize', resize);

    // Pointer event handlers
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

    // Render loop with ripple aging
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

    // Pause and resume rendering when the tab visibility changes
    function onVisibility() {
      if (document.hidden) {
        cancelAnimationFrame(rafId);
      } else {
        lastTime = performance.now();
        rafId = requestAnimationFrame(render);
      }
    }
    document.addEventListener('visibilitychange', onVisibility);

    // Cleanup when component unmounts
    return () => {
      window.removeEventListener('resize', resize);
      c.removeEventListener('pointermove', onPointerMove);
      c.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('visibilitychange', onVisibility);
      cancelAnimationFrame(rafId);
      gl.deleteProgram(program);
      gl.deleteShader(vertexShader);
      gl.deleteShader(fragmentShader);
      gl.deleteBuffer(vbo);
      gl.deleteVertexArray(vao);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10 w-full h-full"
      style={{ display: 'block' }}
    />
  );
}
