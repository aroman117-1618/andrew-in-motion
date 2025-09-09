'use client';

import { useEffect, useState } from 'react';

type Quote = { q: string; a: string };

const QUOTES: Quote[] = [
  { q: 'Analytical and impact-driven. Andrew’s reporting and approach influences not just CSMs—leaders learn from him too.', a: 'Allie Guertin: Senior Manager, Customer Success' },
  { q: 'Technical acumen + genuine customer care. A culture builder who quickly becomes the go-to resource.', a: 'Jina Algarin: Director of Business Operations' },
  { q: 'Built a high-trust, high-performing team and broke down information silos with scalable process and enablement.', a: 'Omkar Waghe: Customer Success Engineer' },
  { q: 'Andrew brought clarity to complex change management—owning handoffs, dashboards, and process templates that raised the bar.', a: 'Rahat Rahman: Senior Strategy Manager' },
  { q: 'A mentor who creates space to grow. His guidance built confidence and accelerated my development.', a: 'Rob Allen Jr: Principal CSM' },
  { q: 'He bridges customer needs with operational rigor. The billing workflow improvements boosted productivity across teams.', a: 'Natalia Wyatt: Billing Ops Manager' },
  { q: 'Proactive and relentlessly improvement-minded. His work reduced unnecessary effort and empowered partner teams.', a: 'Junya Kato: Collections Manager' },
  { q: 'Significantly improved Sales and CS alignment and collaboration… crucial for closing deals.', a: 'RaeAnne English: Sales Ops Manager' },
  // { q: 'Andrew is always two steps ahead, anticipating challenges and keeping teams aligned with future initiatives while navigating today’s demands.', a: 'Amanda Twohig: Director of CS' },
  // { q: 'Andrew unites product, revenue, and CS teams—strengthening retention and fueling growth.', a: 'Lauren Squier: Director of CS' },
  { q: 'Andrew combines strategic leadership with hands-on coaching - driving customer engagement, guiding CSMs through challenges, and building scalable enablement that elevates the team.', a: 'Lauren Squier: Director of CS' },
  // { q: 'Andrew brings clarity to complex challenges. His leadership on Territory planning and cross-functional coordination built lasting process improvements for the GTM org.', a: 'Deedee Fallon: VP of CS' },
];

// Fisher–Yates shuffle
function shuffle<T>(arr: T[]): T[] {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function Row() {
  const [ordered, setOrdered] = useState<Quote[] | null>(null);

  // Shuffle client-side to prevent SSR/CSR mismatch
  useEffect(() => {
    setOrdered(shuffle(QUOTES));
  }, []);

  if (!ordered) return null;

  // duplicate for seamless loop (preserves marquee behavior)
  const items = [...ordered, ...ordered];

  return (
    <div className="t-track">
      {items.map((x, i) => (
        <figure key={`${x.a}-${i}`} className="glass-embed p-6 t-card">
          <blockquote className="text-white/90">“{x.q}”</blockquote>
          <figcaption className="mt-3 text-sm text-white/60">— {x.a}</figcaption>
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

      {/* full-bleed carousel (no parent glass) */}
      <div className="mt-6 t-bleed">
        <div className="t-carousel">
          <Row />
        </div>
      </div>
    </section>
  );
}
