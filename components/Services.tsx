"use client";

import SectionHeader from './SectionHeader';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const SERVICES = [
  {
    title: 'Advisory & Strategy',
    tagline: 'Drive sustainable growth through customer success.',
    bullets: ['Lifecycle planning', 'Change management', 'Playbook design'],
    results: ['Higher retention', 'Improved NRR', 'Scalable operations']
  },
  {
    title: 'Automation & Systems',
    tagline: 'Turn signals into action with intelligent workflows.',
    bullets: ['RevOps automation', 'Lifecycle triggers', 'Contract‑to‑cash flows'],
    results: ['Hours saved', 'Error reduction', 'Faster time to value']
  },
  {
    title: 'Insights & Reporting',
    tagline: 'Illuminate growth levers through data.',
    bullets: ['Signal attribution', 'Cohort analysis', 'ROI dashboards'],
    results: ['Visibility for leaders', 'Aligned teams', 'Informed decision making']
  }
];

export default function Services() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  return (
    <div ref={ref} className="max-w-6xl mx-auto px-4">
      <SectionHeader kicker="Services" title="How I Can Help" subtitle="From advisory to automation to insights, choose the engagement that matches your needs." />
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {SERVICES.map((svc, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: idx * 0.2 }}
            className="bg-background/60 border border-primary/20 rounded-lg p-6 hover:shadow-lg transition backdrop-blur-md bg-white/5 ring-1 ring-white/10 backdrop-blur-md bg-white/5 ring-1 ring-white/10 backdrop-blur-md bg-black/30 ring-1 ring-white/10 bg-black/25 backdrop-blur-md ring-1 ring-white/10 max-w-4xl mx-auto"
          >
            <h3 className="text-xl font-semibold mb-2">{svc.title}</h3>
            <p className="text-sm text-foreground/80 mb-4">{svc.tagline}</p>
            <ul className="list-disc list-inside space-y-1 mb-4">
              {svc.bullets.map((b, i) => (
                <li key={i}>{b}</li>
              ))}
            </ul>
            <h4 className="font-medium mb-1">Expected Results</h4>
            <ul className="list-disc list-inside text-sm space-y-1">
              {svc.results.map((r, i) => (
                <li key={i}>{r}</li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </div>
  );
}