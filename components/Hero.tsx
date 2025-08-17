"use client";

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  return (
    <section className="pt-32 sm:pt-48 pb-20" ref={ref}>
      <div className="max-w-4xl mx-auto px-4 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-3xl sm:text-5xl font-bold mb-4"
        >
          CS Advisory • GTM Automation • Lifecycle Systems
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-xl sm:text-3xl font-semibold mb-6"
        >
          Scale your growth without scaling headcount
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="max-w-3xl mx-auto text-base sm:text-lg text-foreground/80 mb-10"
        >
          Partnering with leaders to remove bottlenecks, create customer‑centric systems, and turn signals into sustainable growth.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="flex justify-center gap-6"
        >
          <a
            href="#services"
            className="px-6 py-3 rounded-full bg-primary text-white hover:bg-secondary focus:bg-secondary transition backdrop-blur-md bg-white/5 ring-1 ring-white/10 backdrop-blur-md bg-white/5 ring-1 ring-white/10 backdrop-blur-md bg-black/30 ring-1 ring-white/10"
          >
            Explore Services
          </a>
          <a
            href="#about"
            className="px-6 py-3 rounded-full border border-primary text-primary hover:bg-primary hover:text-white focus:bg-primary transition backdrop-blur-md bg-white/5 ring-1 ring-white/10 backdrop-blur-md bg-white/5 ring-1 ring-white/10 backdrop-blur-md bg-black/30 ring-1 ring-white/10"
          >
            Learn More
          </a>
        </motion.div>
      </div>
    </section>
  );
}