import React from "react";

/**
 * MorphoOrb — centered, blurred, additive “neural” orb.
 * - Additive blending (lighter) for glow
 * - Multiple soft lobes orbiting a center with noise
 * - Pointer attractor + click pulse
 *
 * Props:
 *  - palette: Array of RGB triplets [[r,g,b], ...]
 *  - size: relative size vs viewport (0–1) default 0.55
 *  - lobes: number of overlapping blobs (default 6)
 *  - blur: base blur radius in px (default 120)
 *  - speed: base angular speed (default 0.12)
 */
export default function MorphoOrb({
  palette = [
    [59, 98, 85],   // pine    #3B6255
    [17, 41, 23],   // deep    #112917
    [28, 139, 102], // emerald
    [155, 194, 60], // lime
  ],
  size = 0.55,
  lobes = 6,
  blur = 120,
  speed = 0.12,
}) {
  const ref = React.useRef(null);
  const rafRef = React.useRef(0);
  const t0 = React.useRef(performance.now());
  const center = React.useRef({ x: 0.5, y: 0.5 });       // normalized
  const target = React.useRef({ x: 0.5, y: 0.5 });       // pointer target
  const pulse = React.useRef(0);                         // 0..1 burst
  const angleBase = React.useRef(Math.random() * Math.PI * 2);

  // DPI-aware resize
  React.useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext("2d");
    const resize = () => {
      const dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1)); // cap DPR for perf
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    return () => ro.disconnect();
  }, []);

  // Pointer interactions
  React.useEffect(() => {
    const canvas = ref.current;
    const onMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      target.current.x = x;
      target.current.y = y;
    };
    const onLeave = () => {
      target.current.x = 0.5;
      target.current.y = 0.5;
    };
    const onClick = () => {
      pulse.current = 1; // trigger a burst
    };
    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerleave", onLeave);
    canvas.addEventListener("click", onClick);
    return () => {
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerleave", onLeave);
      canvas.removeEventListener("click", onClick);
    };
  }, []);

  // Render loop
  React.useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext("2d", { alpha: true });

    // precompute palette rgba strings
    const rgba = (rgb, a) => `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${a})`;
    const colors = [
      rgba(palette[0 % palette.length], 0.22),
      rgba(palette[1 % palette.length], 0.18),
      rgba(palette[2 % palette.length], 0.14),
      rgba(palette[3 % palette.length], 0.1),
    ];

    const rand = (seed) => {
      // xorshift-ish pseudo-random (deterministic by index)
      let x = Math.sin(seed) * 10000;
      return x - Math.floor(x);
    };

    const draw = (now) => {
      const t = (now - t0.current) / 1000;
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;

      // ease the center toward the target (cursor attractor)
      const ease = 0.06;
      center.current.x += (target.current.x - center.current.x) * ease;
      center.current.y += (target.current.y - center.current.y) * ease;

      // compute orb radius based on viewport & pulse
      const baseRadius = Math.min(w, h) * size * 0.5;
      // pulse decay & scale boost
      if (pulse.current > 0) pulse.current *= 0.92;
      const pulseScale = 1 + pulse.current * 0.22;

      // background fade (very subtle to keep trails silky)
      ctx.clearRect(0, 0, w, h);

      // set additive blending for glow
      ctx.globalCompositeOperation = "lighter";

      // base angle (slow rotation) + tiny pulse speedup
      const theta = angleBase.current + t * (speed * (1 + pulse.current * 0.6));

      // draw multiple lobes
      for (let i = 0; i < lobes; i++) {
        const phase = theta + (i * Math.PI * 2) / lobes;

        // lobe orbit radius & wobble
        const orbit = baseRadius * 0.55;
        const wobble = Math.sin(t * 0.9 + i) * baseRadius * 0.06;

        // lobe position
        const cx = center.current.x * w + Math.cos(phase) * (orbit + wobble);
        const cy = center.current.y * h + Math.sin(phase) * (orbit + wobble * 0.6);

        // lobe radius with breathing
        const r =
          baseRadius * pulseScale * (0.55 + 0.15 * Math.sin(t * 1.2 + i * 1.7));

        // shadow blur trick for buttery edges
        ctx.save();
        ctx.filter = `blur(${blur}px)`;
        ctx.shadowColor = colors[i % colors.length];
        ctx.shadowBlur = blur * 1.2;
        ctx.fillStyle = colors[i % colors.length];

        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      // reset composite for next frame
      ctx.globalCompositeOperation = "source-over";

      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(rafRef.current);
  }, [palette, size, lobes, blur, speed]);

  return (
    <canvas
      ref={ref}
      className="pointer-events-auto fixed inset-0 z-0 h-full w-full bg-[#141414]"
      aria-hidden
    />
  );
}