// DriftBackground.tsx – Animated drift background with curl noise and interaction
"use client";

import { useEffect, useRef } from "react";

export default function DriftBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      canvas.style.display = 'none';
      return;
    }

    const tempGl = canvas.getContext('webgl2', { antialias: false, depth: false, stencil: false }) as WebGL2RenderingContext | null;
    if (!tempGl) {
      canvas.style.display = 'none';
      return;
    }
    const gl: WebGL2RenderingContext = tempGl;
    document.documentElement.classList.add("has-gl");
document.documentElement.classList.add("has-gl");

    const c = canvas;
    let width = c.clientWidth;
    let height = c.clientHeight;
    c.width = width;
    c.height = height;
    gl.viewport(0, 0, width, height);

    const vsSource = `#version 300 es
      precision highp float;
      in vec2 position;
      out vec2 vUv;
      void main() { vUv = position * 0.5 + 0.5; gl_Position = vec4(position, 0.0, 1.0); }
    `;

    // Palette now supplied via uPalette[5] uniform
    const fsSource = `#version 300 es
      precision highp float;
      out vec4 fragColor;
      in vec2 vUv;
      uniform float uTime;
      uniform vec2 uPointer;
      uniform vec3 uRipple;
      uniform vec3 uPalette[5];

      float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1,311.7))) * 43758.5453123); }
      float noise(vec2 p){
        vec2 i=floor(p), f=fract(p);
        float a=hash(i), b=hash(i+vec2(1.,0.)), c2=hash(i+vec2(0.,1.)), d=hash(i+vec2(1.,1.));
        vec2 u=f*f*(3.-2.*f);
        return mix(mix(a,b,u.x), mix(c2,d,u.x), u.y);
      }
      vec2 curlNoise(vec2 p){
        float e=0.001;
        float n1=noise(p+vec2(0.,e)), n2=noise(p-vec2(0.,e));
        float n3=noise(p+vec2(e,0.)), n4=noise(p-vec2(e,0.));
        float dy=n3-n4, dx=n1-n2;
        return normalize(vec2(dy,-dx));
      }
      vec3 paletteLookup(float t){
        float x=clamp(t,0.,0.999); float seg=x*4.; int idx=int(floor(seg)); float f=fract(seg);
        vec3 c0=uPalette[idx]; vec3 c1=uPalette[idx+1]; return mix(c0,c1,f);
      }
      void main(){
        vec2 uv=vUv; vec2 p=uv*3.; float t=uTime*0.05;
        for(int i=0;i<4;i++){ vec2 v=curlNoise(p+t); p+=v*0.1; }
        float n=noise(p); float base=n*0.5+0.5;
        float pointerFx=exp(-distance(uv,uPointer)*8.);
        float rippleVal=0.; float age=uRipple.z;
        if(age<4.){ float d=distance(uv,uRipple.xy);
          rippleVal=sin(d*20.-age*6.2831)*exp(-d*10.)*(1.-age/4.); }
        float colVal=clamp(base+pointerFx*0.3+rippleVal*0.5,0.,1.);
        vec3 color=paletteLookup(colVal);
        fragColor=vec4(color,1.);
      }
    `;

    function createShader(glCtx: WebGL2RenderingContext, type: number, source: string): WebGLShader {
      const shader = glCtx.createShader(type)!; glCtx.shaderSource(shader, source); glCtx.compileShader(shader);
      if (!glCtx.getShaderParameter(shader, glCtx.COMPILE_STATUS)) { console.error(glCtx.getShaderInfoLog(shader)); throw new Error('Shader compile failed'); }
      return shader;
    }

    const vertShader = createShader(gl, gl.VERTEX_SHADER, vsSource);
    const fragShader = createShader(gl, gl.FRAGMENT_SHADER, fsSource);
    const program = gl.createProgram()!; gl.attachShader(program, vertShader); gl.attachShader(program, fragShader);
    gl.bindAttribLocation(program, 0, 'position'); gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) { console.error(gl.getProgramInfoLog(program)); throw new Error('Program link failed'); }
    gl.useProgram(program);

    gl.disable(gl.DEPTH_TEST);
gl.disable(gl.CULL_FACE);
const positions = new Float32Array([ -1,-1,  1,-1,  -1,1,  -1,1,  1,-1,  1,1 ]);
    const vao = gl.createVertexArray()!; gl.bindVertexArray(vao);
    const vbo = gl.createBuffer()!; gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
    gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);
    gl.enableVertexAttribArray(0); gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);

    const timeLoc    = gl.getUniformLocation(program, 'uTime');
    const pointerLoc = gl.getUniformLocation(program, 'uPointer');
    const rippleLoc  = gl.getUniformLocation(program, 'uRipple');
    const paletteLoc = gl.getUniformLocation(program, 'uPalette[0]');

    // Fallback biophilic palette (matches your spec)
    let currentPalette: number[][] = [
      [0.043137,0.239216,0.180392],
      [0.086275,0.352941,0.290196],
      [0.180392,0.545098,0.341176],
      [0.607843,0.835294,0.690196],
      [0.909803,0.960784,0.941176],
    ];

    // Try to sample /public/palette.png (5-stops) to override palette
    (() => {
      try {
        const img = new Image(); img.crossOrigin = 'anonymous';
        img.onload = () => {
          const stops = 5, can = document.createElement('canvas'); can.width = stops; can.height = 1;
          const ctx = can.getContext('2d'); if (!ctx) return;
          ctx.drawImage(img, 0, 0, stops, 1);
          const d = ctx.getImageData(0,0,stops,1).data; const cols: number[][] = [];
          for (let i=0;i<stops;i++) { const k=i*4; cols.push([d[k]/255,d[k+1]/255,d[k+2]/255]); }
          currentPalette = cols; gl.useProgram(program);
          gl.disable(gl.DEPTH_TEST);
    gl.disable(gl.CULL_FACE);
gl.uniform3fv(paletteLoc, new Float32Array(currentPalette.flat()));
        };
        img.onerror = () => {};
        img.src = '/palette.png';
      } catch {}
    })();

    gl.useProgram(program);
    gl.uniform3fv(paletteLoc, new Float32Array(currentPalette.flat()));

    let pointer = { x: 0.5, y: 0.5 };
    let ripple  = { x: 0.5, y: 0.5, age: 10.0 };

    function resize(){ width=c.clientWidth; height=c.clientHeight; c.width=width; c.height=height; gl.viewport(0,0,width,height); }
    resize(); window.addEventListener('resize', resize);

    function onPointerMove(e: PointerEvent){ const r=c.getBoundingClientRect();
      pointer.x=(e.clientX-r.left)/r.width; pointer.y=1.-(e.clientY-r.top)/r.height; }
    function onPointerDown(e: PointerEvent){ const r=c.getBoundingClientRect();
      ripple.x=(e.clientX-r.left)/r.width; ripple.y=1.-(e.clientY-r.top)/r.height; ripple.age=0.; }
    c.addEventListener('pointermove', onPointerMove); c.addEventListener('pointerdown', onPointerDown);

    let start=performance.now(), last=start, raf=0 as unknown as number;
    const render=(now:number)=>{ const t=(now-start)/1000, dt=(now-last)/1000; last=now; ripple.age+=dt;
      gl.uniform1f(timeLoc, t); gl.uniform2f(pointerLoc, pointer.x, pointer.y); gl.uniform3f(rippleLoc, ripple.x, ripple.y, ripple.age);
      gl.clearColor(0.0,0.0,0.0,1.0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.clearColor(0.0,0.0,0.0,1.0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.TRIANGLES, 0, 6); raf=requestAnimationFrame(render); };
    raf=requestAnimationFrame(render);

    function onVis(){ if(document.hidden){ cancelAnimationFrame(raf); } else { last=performance.now(); raf=requestAnimationFrame(render);} }
    document.addEventListener('visibilitychange', onVis);

    return () => {
      document.documentElement.classList.remove("has-gl");
document.documentElement.classList.remove("has-gl");
      window.removeEventListener('resize', resize);
      c.removeEventListener('pointermove', onPointerMove);
      c.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('visibilitychange', onVis);
      cancelAnimationFrame(raf);
      gl.deleteProgram(program); gl.deleteShader(vertShader); gl.deleteShader(fragShader);
      gl.deleteBuffer(vbo); gl.deleteVertexArray(vao);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 z-0 w-full h-full" style={{ display: 'block' }} />;
}
