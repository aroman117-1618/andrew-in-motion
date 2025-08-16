"use client";

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import type { ReactNode } from 'react';

interface SectionHeaderProps {
  kicker: string;
  title: string;
  subtitle?: string;
  Icon?: ReactNode;
}

export default function SectionHeader({ kicker, title, subtitle, Icon }: SectionHeaderProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  return (
    <div ref={ref} className="mb-10 text-center">
      {Icon && <div className="mx-auto mb-2 h-8 w-8 text-accent">{Icon}</div>}
      <motion.span
        initial={{ opacity: 0, y: 10 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        className="text-sm uppercase tracking-widest text-accent"
      >
        {kicker}
      </motion.span>
      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="text-2xl sm:text-3xl font-bold mt-1"
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-2 max-w-2xl mx-auto text-foreground/80"
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}