'use client';
import React, { useEffect, useRef } from 'react';
import { frag, vert } from './shaders';

const makeShader = (gl: WebGL2RenderingContext, type: number, src: string) => {
  const s = gl.createShader(type)!;
  gl.shaderSource(s, src);
  gl.compileShader(s);
  if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
    throw new Error(gl.getShaderInfoLog(s) || 'Shader compile failed');
  }
  return s;
};

const makeProgram = (gl: WebGL2RenderingContext, vsrc: string, fsrc: string) => {
  const vs = makeShader(gl, gl.VERTEX_SHADER, vsrc);
  const fs = makeShader(gl, gl.FRAGMENT_SHADER, fsrc);
  const p = gl.createProgram()!;
  gl.attachShader(p, vs);
  gl.attachShader(p, fs);
  gl.linkProgram(p);
  if (!gl.getProgramParameter(p, gl.LINK_STATUS)) {
    throw new Error(gl.getProgramInfoLog(p) || 'Program link failed');
  }
  return p;
};

export default function DriftBackground() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const prefersReduced = typeof window !== 'undefined'
      && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const canvas = ref.current!;
    const gl = canvas.getContext('webgl2', { antialias: false, depth: false, stencil: false }) as WebGL2RenderingContext | null;
    if (!gl || prefersReduced) {
      // graceful fallback: solid background using the darkest palette color
      canvas.style.background = 'var(--aim-1, #0b3d2e)';
      return;
    }

    // Setup
    let w = 0, h = 0, dpr = Math.min(2, window.devicePixelRatio || 1);
    const resize = () => {
      const { innerWidth, innerHeight } = window;
      if (innerWidth === w && innerHeight === h) return;
      w = innerWidth; h = innerHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = w + 'px';
      canvas.style.height = h + 'px';
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    resize();
    window.addEventListener('resize', resize);

    const prog = makeProgram(gl, vert, frag);
    gl.useProgram(prog);

    // Fullscreen quad
    const vao = gl.createVertexArray()!;
    gl.bindVertexArray(vao);
    const pos = new Float32Array([
      -1, -1,  1, -1, -1, 1,
       1, -1,  1,  1, -1, 1
    ]);
    const buf = gl.createBuffer()!;
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, pos, gl.STATIC_DRAW);
    const aPos = gl.getAttribLocation(prog, 'a_position');
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    // Uniforms
    const uTime = gl.getUniformLocation(prog, 'u_time');
    const uRes  = gl.getUniformLocation(prog, 'u_resolution');
    const uSeed = gl.getUniformLocation(prog, 'u_seed');
    const uColors = [
      gl.getUniformLocation(prog, 'u_colors[0]'),
      gl.getUniformLocation(prog, 'u_colors[1]'),
      gl.getUniformLocation(prog, 'u_colors[2]'),
      gl.getUniformLocation(prog, 'u_colors[3]'),
      gl.getUniformLocation(prog, 'u_colors[4]')
    ];

    // Pull colors from CSS variables (AIM palette), fallback if missing
    const getCss = (name: string, fallback: string) =>
      getComputedStyle(document.documentElement).getPropertyValue(name).trim() || fallback;
    const hexToRgb = (hex: string) => {
      const h = hex.replace('#','');
      const bigint = parseInt(h.length===3 ? h.split('').map(c=>c+c).join('') : h, 16);
      return [(bigint>>16&255)/255, (bigint>>8&255)/255, (bigint&255)/255];
    };
    const paletteHex = [
      getCss('--aim-1', '#0b3d2e'),
      getCss('--aim-2', '#165a4a'),
      getCss('--aim-3', '#2e8b57'),
      getCss('--aim-4', '#9bd5b0'),
      getCss('--aim-5', '#e8f5f0'),
    ];
    paletteHex.map(hexToRgb).forEach((rgb, i) => gl.uniform3fv(uColors[i], rgb));

    gl.uniform1f(uSeed, Math.random() * 1000);

    let t0 = performance.now();
    let raf = 0;
    const frame = (now: number) => {
      const t = (now - t0) * 0.001; // seconds
      gl.uniform1f(uTime, t);
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(raf);
      gl.deleteBuffer(buf);
      gl.deleteVertexArray(vao);
      gl.deleteProgram(prog);
    };
  }, []);

  // Fixed, behind everything, no interactivity
  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: -1,
        pointerEvents: 'none'
      }}
    />
  );
}
