// src/components/MorphoOrb.jsx
import React from "react";

/**
 * MorphoOrb (Emerald, low-brightness)
 * - Multi-layer blobs with SCREEN blending (prevents white blowout)
 * - Soft trail fade, organic wobble
 * - Click/touch: pulls center toward tap & adds a gentle pulse
 * - Grain + vignette for texture/legibility
 */

export default function MorphoOrb({
  palette = [
    [17, 41, 23],   // deep pine   #112917
    [59, 98, 85],   // pine        #3B6255
    [28, 139, 102], // emerald
    [155, 194, 60], // lime accent
  ],
  size = 0.62,     // slightly smaller mass
  layers = 3,
  lobes = [5, 4, 6],
  blur = 200,      // a bit more blur for softer core
  speed = 0.085,
  gain = 0.48,     // *** MASTER BRIGHTNESS (lower = darker). Was ~0.78
}) {
  const canvasRef = React.useRef(null);
  const rafRef = React.useRef(0);
  const t0 = React.useRef(performance.now());

  // Normalized center & target (0..1)
  const center = React.useRef({ x: 0.5, y: 0.47 });
  const target = React.useRef({ x: 0.5, y: 0.47 });

  // Interaction
  const pulse = React.useRef(0);
  const baseAngles = React.useRef(
    Array.from({ length: layers }, () => Math.random() * Math.PI * 2)
  );

  // Grain
  const grainCanvas = React.useRef(null);

  const rgba = (rgb, a) => `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${a})`;

  const genGrain = React.useCallback((w = 512, h = 512) => {
    const off = document.createElement("canvas");
    off.width = w;
    off.height = h;
    const ictx = off.getContext("2d");
    const id = ictx.createImageData(w, h);
    const data = id.data;
    for (let i = 0; i < data.length; i += 4) {
      const v = 26 + (Math.random() * 36) | 0; // dark speckle
      data[i] = v; data[i + 1] = v; data[i + 2] = v; data[i + 3] = 255;
    }
    ictx.putImageData(id, 0, 0);
    return off;
  }, []);

  // Hi‑DPI
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

  React.useEffect(() => {
    grainCanvas.current = genGrain(512, 512);
  }, [genGrain]);

  // --- Interaction (mouse, pen, touch) ---
  React.useEffect(() => {
    const el = canvasRef.current;

    const setTargetFromPoint = (clientX, clientY) => {
      const r = el.getBoundingClientRect();
      target.current.x = (clientX - r.left) / r.width;
      target.current.y = (clientY - r.top) / r.height;
    };

    const onPointerMove = (e) => setTargetFromPoint(e.clientX, e.clientY);

    const onPointerDown = (e) => {
      setTargetFromPoint(e.clientX, e.clientY);
      pulse.current = 1; // start pulse
      // small immediate nudge toward click
      center.current.x = center.current.x * 0.8 + target.current.x * 0.2;
      center.current.y = center.current.y * 0.8 + target.current.y * 0.2;
    };

    const onTouchStart = (e) => {
      if (e.touches && e.touches.length) {
        const t = e.touches[0];
        setTargetFromPoint(t.clientX, t.clientY);
        pulse.current = 1;
        center.current.x = center.current.x * 0.8 + target.current.x * 0.2;
        center.current.y = center.current.y * 0.8 + target.current.y * 0.2;
      }
    };

    const onLeave = () => {
      target.current.x = 0.5;
      target.current.y = 0.47;
    };

    el.addEventListener("pointermove", onPointerMove, { passive: true });
    el.addEventListener("pointerdown", onPointerDown, { passive: true });
    el.addEventListener("touchstart", onTouchStart, { passive: true });
    el.addEventListener("pointerleave", onLeave, { passive: true });

    return () => {
      el.removeEventListener("pointermove", onPointerMove);
      el.removeEventListener("pointerdown", onPointerDown);
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  React.useEffect(() => {
    const c = canvasRef.current;
    const ctx = c.getContext("2d", { alpha: true });

    const cols = [
      rgba(palette[0 % palette.length], 0.12),
      rgba(palette[1 % palette.length], 0.10),
      rgba(palette[2 % palette.length], 0.08),
      rgba(palette[3 % palette.length], 0.07),
    ];
    const toAlpha = (str, a) =>
      str.replace(/rgba\((\d+),\s*(\d+),\s*(\d+),\s*([0-9.]+)\)/,
        `rgba($1,$2,$3,${a})`);

    const drawLayer = (t, layerIdx, w, h) => {
      const nLobes = Array.isArray(lobes) ? (lobes[layerIdx] ?? lobes[0]) : lobes;
      const theta = baseAngles.current[layerIdx] + t * (speed * (0.8 + layerIdx * 0.12));
      const layerGain = gain * (0.9 + layerIdx * 0.05);

      // radius & motion
      const baseR = Math.min(w, h) * size * (0.48 + layerIdx * 0.06);
      if (pulse.current > 0) pulse.current *= 0.92;
      const burst = 1 + pulse.current * 0.18;

      // follow pointer
      const ease = 0.10;
      center.current.x += (target.current.x - center.current.x) * ease;
      center.current.y += (target.current.y - center.current.y) * ease;

      ctx.save();
      // SCREEN preserves color & avoids hard white
      ctx.globalCompositeOperation = "screen";
      ctx.globalAlpha = layerGain;

      for (let i = 0; i < nLobes; i++) {
        const phase = theta + (i * Math.PI * 2) / nLobes;

        const orbit = baseR * 0.38 * (1 + 0.03 * Math.sin(t * 0.7 + i));
        const wobble =
          Math.sin(t * (0.7 + 0.05 * i) + i * 1.3) * baseR * 0.035 +
          Math.cos(t * 0.5 + i * 0.7) * baseR * 0.02;

        const cx = center.current.x * w + Math.cos(phase) * (orbit + wobble);
        const cy = center.current.y * h + Math.sin(phase) * (orbit + wobble * 0.6);

        const r =
          baseR * burst *
          (0.70 +
            0.07 * Math.sin(t * (0.8 + 0.07 * i) + i * 1.4) +
            0.02 * Math.cos(t * 0.6 + i));

        ctx.save();
        ctx.filter = `blur(${(blur * (0.9 + layerIdx * 0.15)) | 0}px)`;

        const col = cols[(i + layerIdx) % cols.length];
        // *** LOWERED center alpha dramatically to prevent white core
        const g = ctx.createRadialGradient(cx, cy, r * 0.10, cx, cy, r);
        g.addColorStop(0.0, toAlpha(col, 0.10)); // was 0.20
        g.addColorStop(0.55, toAlpha(col, 0.06)); // was 0.12
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

      // Darker trail so the glow never stacks to white
      ctx.globalCompositeOperation = "source-over";
      ctx.globalAlpha = 0.28;           // ↑ fade to black
      ctx.fillStyle = "#141414";
      ctx.fillRect(0, 0, w, h);
      ctx.globalAlpha = 1;

      for (let L = 0; L < layers; L++) drawLayer(t, L, w, h);

      // Grain (very subtle)
      if (grainCanvas.current) {
        ctx.save();
        ctx.globalCompositeOperation = "soft-light";
        ctx.globalAlpha = 0.22;
        const g = grainCanvas.current;
        for (let y = 0; y < h; y += g.height) {
          for (let x = 0; x < w; x += g.width) ctx.drawImage(g, x, y);
        }
        ctx.restore();
      }

      // Vignette for legibility
      ctx.save();
      const vg = ctx.createRadialGradient(
        w * 0.5, h * 0.52, Math.min(w, h) * 0.36,
        w * 0.5, h * 0.52, Math.min(w, h) * 0.70
      );
      vg.addColorStop(0.0, "rgba(20,20,20,0.00)");
      vg.addColorStop(1.0, "rgba(20,20,20,0.24)");
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