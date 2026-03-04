'use client';

import { useEffect, useState } from 'react';
import { TESTIMONIALS, type Testimonial } from '@/data/testimonials';

function shuffle<T>(arr: T[]): T[] {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function Row() {
  const [ordered, setOrdered] = useState<Testimonial[] | null>(null);

  useEffect(() => {
    setOrdered(shuffle(TESTIMONIALS));
  }, []);

  if (!ordered) return null;

  const items = [...ordered, ...ordered];

  return (
    <div className="t-track">
      {items.map((x, i) => (
        <figure key={`${x.name}-${i}`} className="glass-embed p-6 t-card">
          <blockquote className="text-white/90">&ldquo;{x.quote}&rdquo;</blockquote>
          <figcaption className="mt-3 text-sm text-white/60">— {x.name}: {x.title}</figcaption>
        </figure>
      ))}
    </div>
  );
}

export default function Testimonials() {
  return (
    <section id="testimonials" className="section">
      <h2 className="section-title">Testimonials</h2>
      <p className="section-sub font-medium leading-relaxed text-brand-emerald italic">Trusted by leaders and operators: real‑world endorsements.</p>

      <div className="mt-6 t-bleed">
        <div className="t-carousel">
          <Row />
        </div>
      </div>
    </section>
  );
}
