"use client";

import SectionHeader from './SectionHeader';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import content from '../content-map.json';

const impact = (content as any).impact;

export default function Impact() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const cards = [impact.automations, impact.occupancy];
  return (
    <div ref={ref} className="max-w-5xl mx-auto px-4">
      <SectionHeader kicker="Impact" title="Results that Speak" subtitle="Meaningful metrics from recent engagements." />
      <div className="grid gap-8 sm:grid-cols-2">
        {cards.map((card, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: idx * 0.2 }}
            className="bg-background/60 border border-primary/20 rounded-lg p-6 backdrop-blur-md bg-white/5 ring-1 ring-white/10 backdrop-blur-md bg-white/5 ring-1 ring-white/10 backdrop-blur-md bg-black/30 ring-1 ring-white/10 bg-black/25 backdrop-blur-md ring-1 ring-white/10 max-w-4xl mx-auto"
          >
            <h3 className="text-xl font-semibold mb-4">{card.title}</h3>
            <ul className="list-disc list-inside space-y-2">
              {card.items.map((item: string, i: number) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </div>
  );
}