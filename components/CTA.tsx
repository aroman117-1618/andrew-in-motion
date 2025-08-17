"use client";

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

export default function CTA() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  return (
    <div ref={ref} className="max-w-4xl mx-auto px-4 text-center">
      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="text-2xl sm:text-3xl font-bold mb-4"
      >
        Ready to remove bottlenecks and surface real signal?
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="text-lg text-foreground/80 mb-6"
      >
        Let’s connect and explore how we can level up your customer operations together.
      </motion.p>
      <motion.a
        initial={{ opacity: 0, y: 10 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.4 }}
        href="mailto:andrew@example.com"
        className="inline-block px-8 py-3 rounded-full bg-accent text-background font-semibold hover:bg-secondary focus:bg-secondary transition backdrop-blur-md bg-white/5 ring-1 ring-white/10 backdrop-blur-md bg-white/5 ring-1 ring-white/10 backdrop-blur-md bg-black/30 ring-1 ring-white/10"
      >
        Get in touch
      </motion.a>
    </div>
  );
}