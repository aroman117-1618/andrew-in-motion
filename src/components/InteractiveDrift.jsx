import React, { useEffect, useRef } from "react";

/**
 * InteractiveDrift — Nebula "Drift" background (soft/fuzzy)
 * - Full-bleed fixed canvas
 * - Offscreen buffer + blur so ribbons read as haze, not lines
 * - Mouse biases flow, scroll drifts vertically, clicks add glow ripples
 */
export default function InteractiveDrift({
  background = [20, 20, 20],     // page base behind trails
  backgroundFade = 0.06,         // 0.05–0.10; lower = longer trails
  ribbons = 12,                  // number of curves
  thickness = 2.0,               // base stroke width (scaled by DPR)
  speed = 0.18,                  // animation speed
  blurPx = 16,                   // blur applied to ribbons (8–24)
  // Brand‑friendly palette (RGB arrays)
  palette = [
    [ 59,  98,  85], // pine #3B6255
    [ 17,  41,  23], // deep pine #112917
    [  8,  38,  31], // deep forest
    [  6,  74,  99], // teal navy
    [ 28, 139, 102], // emerald
    [155, 194,  60], // lime
    [207, 226, 142], // light lime
  ],
}) {
  const mainRef = useRef(null);
  const offRef  = useRef({ canvas: null, ctx: null }); // offscreen buffer
  const mouse   = useRef({ x: 0.5, y: 0.5 });
  const clicks  = useRef([]); // click ripples
  const t0      = performance.now();

  useEffect(() => {
    const canvas = mainRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });

    // Create offscreen buffer once
    if (!offRef.current.canvas) {
      offRef.current.canvas = document.createElement("canvas");
      offRef.current.ctx = offRef.current.canvas.getContext("2d", { alpha: true });
    }
    const offCanvas = offRef.current.canvas;
    const offCtx    = offRef.current.ctx;

    let raf;
    let w = 0, h = 0, dpr = 1;

    const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
    const lerp  = (a, b, t) => a + (b - a) * t;
    const mix3  = (A, B, t) => [lerp(A[0], B[0], t), lerp(A[1], B[1], t), lerp(A[2], B[2], t)];
    const rgba  = (c, a = 1) => `rgba(${c[0]}, ${c[1]}, ${c[2]}, ${a})`;

    // Seed ribbons (phases, amplitudes, and colors)
    const seeds = Array.from({ length: ribbons }).map(() => {
      const p = Array.from({ length: 4 }, () => Math.random() * Math.PI * 2);
      const d = Array.from({ length: 4 }, () => 0.6 + Math.random() * 0.6);
      const amp = 0.22 + Math.random() * 0.14;
      const cA = palette[(Math.random() * palette.length) | 0];
      const cB = palette[(Math.random() * palette.length) | 0];
      return { p, d, amp, cA, cB };
    });

    function resize() {
      const isDesktop = window.innerWidth >= 1024;
      dpr = Math.min(window.devicePixelRatio || 1, isDesktop ? 2.5 : 2);

      w = window.innerWidth;
      h = window.innerHeight;

      // Main canvas
      canvas.width = Math.max(1, Math.floor(w * dpr));
      canvas.height = Math.max(1, Math.floor(h * dpr));
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Offscreen canvas
      offCanvas.width = canvas.width;
      offCanvas.height = canvas.height;
      offCtx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Prime backgrounds
      ctx.fillStyle = rgba(background, 1);
      ctx.fillRect(0, 0, w, h);
      offCtx.clearRect(0, 0, w, h);

      // Static starfield on MAIN canvas (very subtle)
      ctx.save();
      ctx.globalAlpha = 0.18;
      const stars = Math.floor((w * h) / 12000);
      for (let i = 0; i < stars; i++) {
        const sx = Math.random() * w, sy = Math.random() * h;
        const r = Math.random() * 1.1;
        ctx.fillStyle = `rgba(255,255,255,${0.15 + Math.random() * 0.35})`;
        ctx.beginPath(); ctx.arc(sx, sy, r, 0, Math.PI * 2); ctx.fill();
      }
      ctx.restore();
    }

    function onMove(e) {
      const cx = (e.clientX ?? e.touches?.[0]?.clientX ?? w / 2) / w;
      const cy = (e.clientY ?? e.touches?.[0]?.clientY ?? h / 2) / h;
      mouse.current.x = clamp(cx, 0, 1);
      mouse.current.y = clamp(cy, 0, 1);
    }

    function onScroll() {
      const y = (window.scrollY % h) / h;
      mouse.current.y = clamp(0.2 + y * 0.6, 0, 1);
    }

    function onClick(e) {
      clicks.current.push({ x: e.clientX, y: e.clientY, t: performance.now(), life: 1200 });
    }

    function draw() {
      const t = (performance.now() - t0) * 0.001 * speed;

      // Fade previous MAIN frame (trail persistence)
      ctx.globalCompositeOperation = "source-over";
      ctx.fillStyle = `rgba(${background[0]}, ${background[1]}, ${background[2]}, ${backgroundFade})`;
      ctx.fillRect(0, 0, w, h);

      // Clear OFFSCREEN before drawing fresh ribbons
      offCtx.clearRect(0, 0, w, h);
      offCtx.globalCompositeOperation = "lighter";
      offCtx.lineCap = "round";
      offCtx.lineJoin = "round";

      const biasX = (mouse.current.x - 0.5) * 0.5;
      const biasY = (mouse.current.y - 0.5) * 0.5;

      // Draw soft ribbons into OFFSCREEN at lower alpha
      seeds.forEach((s) => {
        const [p1, p2, p3, p4] = s.p;
        const [d1, d2, d3, d4] = s.d;

        const x1 = w * (0.5 + (s.amp * Math.sin(t * (0.8 + d1) + p1)) + biasX * 0.8);
        const y1 = h * (0.5 + (s.amp * 0.8 * Math.cos(t * (0.7 + d2) + p2)) + biasY * 0.7);

        const cx1 = w * (0.5 + (s.amp * 1.15 * Math.cos(t * (0.55 + d3) + p3)) + biasX * 0.6);
        const cy1 = h * (0.5 + (s.amp * 0.9  * Math.sin(t * (0.85 + d4) + p4)) + biasY * 0.5);

        const cx2 = w * (0.5 + (s.amp * 1.10 * Math.sin(t * (0.65 + d2) + p2 + 1.2)) - biasX * 0.6);
        const cy2 = h * (0.5 + (s.amp * 0.95 * Math.cos(t * (0.75 + d1) + p1 + 0.8)) - biasY * 0.5);

        const x2 = w * (0.5 + (s.amp * Math.cos(t * (0.8 + d4) + p4 + 0.9)) - biasX * 0.9);
        const y2 = h * (0.5 + (s.amp * 0.85 * Math.sin(t * (0.6 + d3) + p3 + 0.6)) - biasY * 0.8);

        const grad = offCtx.createLinearGradient(x1, y1, x2, y2);
        grad.addColorStop(0.0, rgba(s.cA, 0.50));
        grad.addColorStop(0.5, rgba(mix3(s.cA, s.cB, 0.5), 0.32));
        grad.addColorStop(1.0, rgba(s.cB, 0.14));
        offCtx.strokeStyle = grad;

        offCtx.lineWidth = Math.max(1, thickness * dpr);
        offCtx.beginPath(); offCtx.moveTo(x1, y1); offCtx.bezierCurveTo(cx1, cy1, cx2, cy2, x2, y2); offCtx.stroke();
        offCtx.globalAlpha = 0.7;
        offCtx.lineWidth = Math.max(0.6, thickness * 0.66 * dpr);
        offCtx.stroke();
        offCtx.globalAlpha = 1;
      });

      // Composite OFFSCREEN → MAIN with blur & reduced alpha (the “fuzz”)
      ctx.save();
      ctx.filter = `blur(${blurPx}px)`;  // make the haze softer/hazier
      ctx.globalAlpha = 0.85;            // overall haze strength
      ctx.drawImage(offCanvas, 0, 0, canvas.width, canvas.height, 0, 0, w, h);
      ctx.restore();

      // Click ripples (also blurred a bit)
      if (clicks.current.length) {
        ctx.save();
        ctx.filter = `blur(${Math.floor(blurPx * 0.75)}px)`;
        ctx.globalCompositeOperation = "lighter";
        clicks.current = clicks.current.filter((c) => {
          const age = performance.now() - c.t;
          const k = 1 - age / c.life;
          if (k <= 0) return false;
          const r = (1 - k) * Math.max(w, h) * 0.25;
          const col = mix3(palette[0], palette[5], 1 - k);
          const g = ctx.createRadialGradient(c.x, c.y, 0, c.x, c.y, r);
          g.addColorStop(0, rgba(col, 0.28 * k));
          g.addColorStop(1, rgba(col, 0));
          ctx.fillStyle = g;
          ctx.beginPath(); ctx.arc(c.x, c.y, r, 0, Math.PI * 2); ctx.fill();
          return true;
        });
        ctx.restore();
      }

      // Gentle vignette to keep edges moody and text readable
      const vg = ctx.createRadialGradient(w * 0.5, h * 0.5, Math.min(w, h) * 0.5, w * 0.5, h * 0.5, Math.max(w, h));
      vg.addColorStop(0, "rgba(0,0,0,0)");
      vg.addColorStop(1, "rgba(0,0,0,0.22)");
      ctx.globalCompositeOperation = "multiply";
      ctx.fillStyle = vg;
      ctx.fillRect(0, 0, w, h);

      ctx.globalCompositeOperation = "source-over";
      raf = requestAnimationFrame(draw);
    }

    function startLoop() { if (!raf) raf = requestAnimationFrame(draw); }
    function stopLoop()  { if (raf) cancelAnimationFrame(raf), (raf = null); }

    resize(); startLoop();

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("touchmove", onMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("click", onClick, { passive: true });
    document.addEventListener("visibilitychange", () => (document.hidden ? stopLoop() : startLoop()));

    return () => {
      stopLoop();
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("touchmove", onMove);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("click", onClick);
      document.removeEventListener("visibilitychange", () => {});
    };
  }, [background, backgroundFade, ribbons, thickness, speed, blurPx, palette]);

  return (
    <canvas
      ref={mainRef}
      className="pointer-events-none fixed inset-0 z-0 h-screen w-screen"
      aria-hidden
    />
  );
}