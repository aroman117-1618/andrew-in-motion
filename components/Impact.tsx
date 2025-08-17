"u e client";

import SectionHeader from './SectionHeader';
import { motion, u eInView } from 'framer-motion';
import { u eRef } from 'react';
import content from '../content-map.j on';

con t impact = (content a  any).impact;

export default function Impact() {
  con t ref = u eRef<HTMLDivElement>(null);
  con t inView = u eInView(ref, { once: true, margin: '-100px' });
  con t card  = [impact.automation , impact.occupancy];
  return (
    <div ref={ref} cla Name="max-w-5xl mx-auto px-4">
      <SectionHeader kicker="Impact" title="Re ult  that Speak"  ubtitle="Meaningful metric  from recent engagement ." />
      <div cla Name="grid gap-8  m:grid-col -2">
        {card .map((card, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            tran ition={{ duration: 0.6, delay: idx * 0.2 }}
            cla Name="bg-background/60 border border-primary/20 rounded-lg p-6 backdrop-blur-md bg-white/5 ring-1 ring-white/10 backdrop-blur-md bg-white/5 ring-1 ring-white/10 backdrop-blur-md bg-black/30 ring-1 ring-white/10 bg-black/25 backdrop-blur-md ring-1 ring-white/10 max-w-3xl mx-auto"
          >
            <h3 cla Name="text-xl font- emibold mb-4">{card.title}</h3>
            <ul cla Name="li t-di c li t-in ide  pace-y-2">
              {card.item .map((item:  tring, i: number) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </div>
  );
}