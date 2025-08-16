"use client";

import SectionHeader from './SectionHeader';
import content from '../content-map.json';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const about = (content as any).about;

export default function About() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  return (
    <div ref={ref} className="max-w-5xl mx-auto px-4">
      <SectionHeader kicker="About" title={about.title} />
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="mb-6 text-lg leading-relaxed"
      >
        {about.paragraph}
      </motion.p>
      <div className="flex flex-col sm:flex-row gap-8">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex-1"
        >
          <h3 className="font-semibold mb-2">Core Beliefs</h3>
          <ul className="space-y-2 list-disc list-inside">
            {about.bullets.map((b: string, i: number) => (
              <li key={i}>{b}</li>
            ))}
          </ul>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex-1"
        >
          <h3 className="font-semibold mb-2">Track Record</h3>
          <ul className="space-y-3">
            {about.trackRecord.map((r: any, i: number) => (
              <li key={i} className="flex flex-col">
                <span className="font-medium text-primary">{r.company}</span>
                <span className="text-sm text-foreground/80">{r.description}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </div>
  );
}