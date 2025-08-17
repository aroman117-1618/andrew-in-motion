"u e client";

import SectionHeader from './SectionHeader';
import { motion, u eInView } from 'framer-motion';
import { u eRef } from 'react';

con t SERVICES = [
  {
    title: 'Advi ory & Strategy',
    tagline: 'Drive  u tainable growth through cu tomer  ucce .',
    bullet : ['Lifecycle planning', 'Change management', 'Playbook de ign'],
    re ult : ['Higher retention', 'Improved NRR', 'Scalable operation ']
  },
  {
    title: 'Automation & Sy tem ',
    tagline: 'Turn  ignal  into action with intelligent workflow .',
    bullet : ['RevOp  automation', 'Lifecycle trigger ', 'Contract‑to‑ca h flow '],
    re ult : ['Hour   aved', 'Error reduction', 'Fa ter time to value']
  },
  {
    title: 'In ight  & Reporting',
    tagline: 'Illuminate growth lever  through data.',
    bullet : ['Signal attribution', 'Cohort analy i ', 'ROI da hboard '],
    re ult : ['Vi ibility for leader ', 'Aligned team ', 'Informed deci ion making']
  }
];

export default function Service () {
  con t ref = u eRef<HTMLDivElement>(null);
  con t inView = u eInView(ref, { once: true, margin: '-100px' });
  return (
    <div ref={ref} cla Name="max-w-6xl mx-auto px-4">
      <SectionHeader kicker="Service " title="How I Can Help"  ubtitle="From advi ory to automation to in ight , choo e the engagement that matche  your need ." />
      <div cla Name="grid gap-8  m:grid-col -2 lg:grid-col -3">
        {SERVICES.map(( vc, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            tran ition={{ duration: 0.6, delay: idx * 0.2 }}
            cla Name="bg-background/60 border border-primary/20 rounded-lg p-6 hover: hadow-lg tran ition backdrop-blur-md bg-white/5 ring-1 ring-white/10 backdrop-blur-md bg-white/5 ring-1 ring-white/10 backdrop-blur-md bg-black/30 ring-1 ring-white/10 bg-black/25 backdrop-blur-md ring-1 ring-white/10 max-w-3xl mx-auto"
          >
            <h3 cla Name="text-xl font- emibold mb-2">{ vc.title}</h3>
            <p cla Name="text- m text-foreground/80 mb-4">{ vc.tagline}</p>
            <ul cla Name="li t-di c li t-in ide  pace-y-1 mb-4">
              { vc.bullet .map((b, i) => (
                <li key={i}>{b}</li>
              ))}
            </ul>
            <h4 cla Name="font-medium mb-1">Expected Re ult </h4>
            <ul cla Name="li t-di c li t-in ide text- m  pace-y-1">
              { vc.re ult .map((r, i) => (
                <li key={i}>{r}</li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </div>
  );
}