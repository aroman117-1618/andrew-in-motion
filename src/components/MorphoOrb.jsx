import React from "react";

/**
 * MorphoOrb — centered, blurred, additive “neural” orb.
 * - Additive blending + radial gradients (no hard edges)
 * - Soft trail for volumetric feel
 * - Pointer attractor + click pulse
 *
 * Props:
 *  - palette: Array of RGB triplets [[r,g,b], ...]
 *  - size: 0..1 relative to min(viewportW, viewportH)
 *  - lobes: number of overlapping blobs
 *  - blur: base blur radius in px
 *  - speed: base angular speed (radians/sec)
 */
export default function MorphoOrb({
  palette = [
    [59, 98, 85],    // #3B6255 pine
    [17, 41, 23],    // #112917 deep
    [28, 139, 102],  // emerald
    [155, 194, 60],  // lime
  ],
  size = 0.68,
  lobes = 5,
  blur = 180,
  speed = 0.09,
}) {
  const canvasRef = React.useRef(null);
  const rafRef = React.useRef(0);
  const t0 = React.useRef(performance.now());

  // normalized 0..1
  const center = React.useRef({ x: 0.5, y: 0.45 }); // slightly above center
  const target = React.useRef({ x: 0.5, y: 0.45 });
  const pulse = React.useRef(0); // 0..1
  const baseAngle = React.useRef(Math.random() * Math.PI * 2);

  // Hi‑DPI scaling
  React.useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const resize = () => {
      const dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1)); // cap DPR for perf
      const { width, height } = canvas.getBoundingClientRect();
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    return () => ro.disconnect();
  }, []);

  // Pointer interactions
  React.useEffect(() => {
    const el = canvasRef.current;

    const onMove = (e) => {
      const rect = el.getBoundingClientRect();
      target.current.x = (e.clientX - rect.left) / rect.width;
      target.current.y = (e.clientY - rect.top) / rect.height;
    };
    const onLeave = () => {
      target.current.x = 0.5;
      target.current.y = 0.45;
    };
    const onClick = () => {
      pulse.current = 1; // burst
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
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d", { alpha: true });

    const rgba = (rgb, a) => `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${a})`;
    // Slightly stronger alphas for richer glow
    const paletteColors = [
   rgba(palette[0 % palette.length], 0.20),
   rgba(palette[1 % palette.length], 0.16),
   rgba(palette[2 % palette.length], 0.13),
   rgba(palette[3 % palette.length], 0.10),
 ];

    const draw = (now) => {
      const t = (now - t0.current) / 1000;
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;

      // Soft trail: paint translucent dark over previous frame
			ctx.restore();
      ctx.globalCompositeOperation = "source-over";
      ctx.save();
			ctx.globalAlpha = 0.80; // darker canvas each frame → less lingering brightness
      ctx.fillStyle = "#141414";
      ctx.fillRect(0, 0, w, h);
      ctx.globalAlpha = 1;

      // Follow cursor slightly (lean, not chase)
      const ease = 0.08;
      center.current.x += (target.current.x - center.current.x) * ease;
      center.current.y += (target.current.y - center.current.y) * ease;

      // Base radius & pulse scale
      const baseR = Math.min(w, h) * size * 0.5;
      if (pulse.current > 0) pulse.current *= 0.92;
      const pulseScale = 1 + pulse.current * 0.28;

      // Additive blending for glow
      ctx.globalCompositeOperation = "lighter";

      const theta = baseAngle.current + t * (speed * (1 + pulse.current * 0.6));

      for (let i = 0; i < lobes; i++) {
        const phase = theta + (i * Math.PI * 2) / lobes;

        // Lower orbit so lobes overlap (unified mass)
        const orbit = baseR * 0.42;
        const wobble = Math.sin(t * 0.8 + i * 1.3) * baseR * 0.045;

        const cx = center.current.x * w + Math.cos(phase) * (orbit + wobble);
        const cy = center.current.y * h + Math.sin(phase) * (orbit + wobble * 0.6);

        // Larger, breathing lobes
        const r = baseR * pulseScale * (0.70 + 0.10 * Math.sin(t * 0.9 + i * 1.4));

        // Radial gradient with strong inner energy → smooth falloff
        ctx.save();
        ctx.filter = `blur(${blur}px)`;
        const col = paletteColors[i % paletteColors.length];

        const g = ctx.createRadialGradient(cx, cy, r * 0.1, cx, cy, r);
        // brighten center by bumping alpha inside the rgba()
        const toAlpha = (str, a) => str.replace(/rgba\((\d+),\s*(\d+),\s*(\d+),\s*([0-9.]+)\)/, `rgba($1,$2,$3,${a})`);
				g.addColorStop(0.0,  toAlpha(col, 0.22)); // softer center
				g.addColorStop(0.55, toAlpha(col, 0.14));
      	g.addColorStop(1.0, toAlpha(col, 0.00));

        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      // Reset composite for next frame
      ctx.globalCompositeOperation = "source-over";

      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(rafRef.current);
  }, [palette, size, lobes, blur, speed]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 h-full w-full bg-[#141414] pointer-events-auto"
      aria-hidden
    />
  );
}