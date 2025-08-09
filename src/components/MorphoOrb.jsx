// src/components/MorphoOrb.jsx
import React from "react";

/**
 * MorphoOrb (Emerald)
 *  - Multi-layer, additive/screen glow with heavy blur (no hard edges)
 *  - Radial gradients per lobe; capped alphas to avoid white blowout
 *  - Soft trail fade (volumetric feel)
 *  - Organic wobble + slow drift; cursor attractor + click pulse
 *  - Grain overlay + vignette to match Morpho's textured look
 *
 * Tunables via props at the bottom of this file (see default export signature).
 */

export default function MorphoOrb({
  // Emerald-forward palette (dark → light)
  palette = [
    [17, 41, 23],   // deep pine   #112917
    [59, 98, 85],   // pine        #3B6255
    [28, 139, 102], // emerald
    [155, 194, 60], // lime accent
  ],
  // Size relative to min(viewportW, viewportH)
  size = 0.64,
  // Layers of blobs; each layer has its own small differences
  layers = 3,
  // Lobes per layer (array or single number)
  lobes = [5, 4, 6],
  // Base blur in px (each layer scales from this)
  blur = 190,
  // Base angular speed
  speed = 0.085,
  // Master gain (overall brightness clamp)
  gain = 0.78,
}) {
  const canvasRef = React.useRef(null);
  const rafRef = React.useRef(0);
  const t0 = React.useRef(performance.now());

  // Centers (normalized)
  const center = React.useRef({ x: 0.5, y: 0.47 });
  const target = React.useRef({ x: 0.5, y: 0.47 });

  // Interaction state
  const pulse = React.useRef(0); // 0..1 (click burst)
  const baseAngles = React.useRef(
    Array.from({ length: layers }, () => Math.random() * Math.PI * 2)
  );

  // Grain (generated once, reused)
  const grainCanvas = React.useRef(null);

  // --- Utilities ---
  const rgba = (rgb, a) => `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${a})`;

  // Small helper to generate film grain on an offscreen canvas
  const genGrain = React.useCallback((w = 512, h = 512) => {
    const off = document.createElement("canvas");
    off.width = w;
    off.height = h;
    const ictx = off.getContext("2d");
    const id = ictx.createImageData(w, h);
    const data = id.data;
    for (let i = 0; i < data.length; i += 4) {
      // 0..255 but stay dark to avoid whitening
      const v = 28 + (Math.random() * 40) | 0; // ~dark gray noise
      data[i] = v;
      data[i + 1] = v;
      data[i + 2] = v;
      data[i + 3] = 255;
    }
    ictx.putImageData(id, 0, 0);
    return off;
  }, []);

  // Hi-DPI scaling
  React.useEffect(() => {
    const c = canvasRef.current;
    const ctx = c.getContext("2d");
    const resize = () => {
      const dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
      const { width, height } = c.getBoundingClientRect();
      c.width = Math.floor(width * dpr);
      c.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(c);
    return () => ro.disconnect();
  }, []);

  // Generate grain once
  React.useEffect(() => {
    grainCanvas.current = genGrain(512, 512);
  }, [genGrain]);

  // Pointer interactions
  React.useEffect(() => {
    const el = canvasRef.current;
    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      target.current.x = (e.clientX - r.left) / r.width;
      target.current.y = (e.clientY - r.top) / r.height;
    };
    const onLeave = () => {
      target.current.x = 0.5;
      target.current.y = 0.47;
    };
    const onClick = () => {
      pulse.current = 1;
    };
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    el.addEventListener("click", onClick);
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
      el.removeEventListener("click", onClick);
    };
  }, []);

  React.useEffect(() => {
    const c = canvasRef.current;
    const ctx = c.getContext("2d", { alpha: true });

    // Build color set (no high alphas → avoid white blowout)
    const cols = [
      rgba(palette[0 % palette.length], 0.18),
      rgba(palette[1 % palette.length], 0.14),
      rgba(palette[2 % palette.length], 0.12),
      rgba(palette[3 % palette.length], 0.10),
    ];
    const toAlpha = (str, a) =>
      str.replace(
        /rgba\((\d+),\s*(\d+),\s*(\d+),\s*([0-9.]+)\)/,
        `rgba($1,$2,$3,${a})`
      );

    const drawLayer = (t, layerIdx, w, h) => {
      const nLobes =
        Array.isArray(lobes) ? (lobes[layerIdx] ?? lobes[0]) : lobes;
      const theta = baseAngles.current[layerIdx] + t * (speed * (0.8 + layerIdx * 0.12));
      const layerGain = gain * (0.9 + layerIdx * 0.05);

      // Slightly different radii per layer
      const baseR = Math.min(w, h) * size * (0.48 + layerIdx * 0.06);
      // Click “burst” decays
      if (pulse.current > 0) pulse.current *= 0.92;
      const burst = 1 + pulse.current * 0.22;
      const ease = 0.085;
      center.current.x += (target.current.x - center.current.x) * ease;
      center.current.y += (target.current.y - center.current.y) * ease;

      // Additive glow, then clamp by layerGain
      ctx.save();
      ctx.globalCompositeOperation = "lighter";
      ctx.globalAlpha = layerGain;

      for (let i = 0; i < nLobes; i++) {
        const phase = theta + (i * Math.PI * 2) / nLobes;

        // Lower orbit so lobes overlap heavily (unified mass)
        const orbit = baseR * 0.40 * (1 + 0.03 * Math.sin(t * 0.7 + i));
        // Organic wobble
        const wobble =
          Math.sin(t * (0.7 + 0.05 * i) + i * 1.3) * baseR * 0.035 +
          Math.cos(t * 0.5 + i * 0.7) * baseR * 0.02;

        const cx = center.current.x * w + Math.cos(phase) * (orbit + wobble);
        const cy = center.current.y * h + Math.sin(phase) * (orbit + wobble * 0.6);

        // Larger, breathing lobes
        const r =
          baseR *
          burst *
          (0.72 +
            0.08 * Math.sin(t * (0.8 + 0.07 * i) + i * 1.4) +
            0.02 * Math.cos(t * 0.6 + i));

        // Radial gradient: brighter core -> smooth falloff (no white)
        ctx.save();
        ctx.filter = `blur(${(blur * (0.9 + layerIdx * 0.15)) | 0}px)`;

        const col = cols[(i + layerIdx) % cols.length];
        const g = ctx.createRadialGradient(cx, cy, r * 0.08, cx, cy, r);
        g.addColorStop(0.0, toAlpha(col, 0.20)); // keep color in the core
        g.addColorStop(0.5, toAlpha(col, 0.12));
        g.addColorStop(1.0, toAlpha(col, 0.00));

        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      ctx.restore();
    };

    const render = (now) => {
      const t = (now - t0.current) / 1000;
      const w = c.clientWidth;
      const h = c.clientHeight;

      // Soft trail: fade toward black each frame
      ctx.globalCompositeOperation = "source-over";
      ctx.globalAlpha = 0.22; // darker = less lingering brightness
      ctx.fillStyle = "#141414";
      ctx.fillRect(0, 0, w, h);
      ctx.globalAlpha = 1;

      // Draw layers
      for (let L = 0; L < layers; L++) drawLayer(t, L, w, h);

      // Grain overlay (soft-light): repeats to fill
      if (grainCanvas.current) {
        ctx.save();
        ctx.globalCompositeOperation = "soft-light";
        ctx.globalAlpha = 0.25; // grain strength (0.18–0.3)
        const g = grainCanvas.current;
        // tile it
        for (let y = 0; y < h; y += g.height) {
          for (let x = 0; x < w; x += g.width) {
            ctx.drawImage(g, x, y);
          }
        }
        ctx.restore();
      }

      // Subtle vignette to aid legibility
      ctx.save();
      const vg = ctx.createRadialGradient(
        w * 0.5,
        h * 0.52,
        Math.min(w, h) * 0.36,
        w * 0.5,
        h * 0.52,
        Math.min(w, h) * 0.70
      );
      vg.addColorStop(0.0, "rgba(20,20,20,0.00)");
      vg.addColorStop(1.0, "rgba(20,20,20,0.22)");
      ctx.fillStyle = vg;
      ctx.fillRect(0, 0, w, h);
      ctx.restore();

      rafRef.current = requestAnimationFrame(render);
    };

    rafRef.current = requestAnimationFrame(render);
    return () => cancelAnimationFrame(rafRef.current);
  }, [palette, size, layers, lobes, blur, speed, gain]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 h-full w-full bg-[#141414] pointer-events-auto"
      aria-hidden
    />
  );
}