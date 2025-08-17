"use client";

import { useRef, useEffect, useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import content from '../content-map.json';

const testimonials = (content as any).testimonials;

export default function Testimonials() {
  const trackRef = useRef<HTMLDivElement>(null);
  const xRef = useRef(0);
  const lastRef = useRef(0);
  const pausedRef = useRef(false);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    pausedRef.current = paused;
  }, [paused]);

  useEffect(() => {
    let rafId: number;
    const speed = 40; // px/s
    const tick = (t: number) => {
      if (!lastRef.current) lastRef.current = t;
      const dt = (t - lastRef.current) / 1000;
      lastRef.current = t;
      if (!pausedRef.current && trackRef.current) {
        xRef.current -= speed * dt;
        const total = trackRef.current.scrollWidth;
        const half = total / 2;
        if (Math.abs(xRef.current) >= half) {
          xRef.current += half;
        }
        trackRef.current.style.transform = `translateX(${xRef.current}px)`;
      }
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, []);

  // duplicate list to loop seamlessly
  const loop = useMemo(() => [...testimonials, ...testimonials], []);

  return (
    <div className="max-w-6xl mx-auto px-4">
      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-2xl sm:text-3xl font-bold mb-6 text-center"
      >
        Testimonials
      </motion.h2>
      <div
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        className="overflow-hidden relative"
      >
        <div ref={trackRef} className="flex gap-8">
          {loop.map((t, i) => (
            <div
              key={i}
              className="min-w-[280px] max-w-sm flex-shrink-0 bg-background/60 border border-primary/20 rounded-lg p-4 backdrop-blur-md bg-white/5 ring-1 ring-white/10 backdrop-blur-md bg-white/5 ring-1 ring-white/10 backdrop-blur-md bg-black/30 ring-1 ring-white/10 bg-black/25 backdrop-blur-md ring-1 ring-white/10"
            >
              <p className="italic mb-2">“{t.quote}”</p>
              <p className="font-medium">
                {t.name} <span className="text-foreground/70">• {t.title}</span>
              </p>
            </div>
          ))}
        </div>
        {/* edge fade gradient */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-background via-background/70 to-transparent"></div>
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-background via-background/70 to-transparent"></div>
      </div>
    </div>
  );
}