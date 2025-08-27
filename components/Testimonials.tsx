'use client';

import { useEffect, useMemo, useState } from 'react';

type Quote = { q: string; a: string };

const QUOTES: Quote[] = [
  { q: 'Analytical and impact-driven. Andrew’s reporting and approach influences not just CSMs—leaders learn from him too.', a: 'Allie Guertin — Senior Manager, Customer Success' },
  { q: 'Technical acumen + genuine customer care. A culture builder who quickly becomes the go-to resource.', a: 'Jina Algarin — Director of Business Operations' },
  { q: 'Built a high-trust, high-performing team and broke down information silos with scalable process and enablement.', a: 'Omkar Waghe — Customer Success Engineer' },
  { q: 'Andrew brought clarity to complex change management—owning handoffs, dashboards, and process templates that raised the bar.', a: 'Rahat Rahman — Senior Strategy Manager' },
  { q: 'A mentor who creates space to grow. His guidance built confidence and accelerated my development.', a: 'Rob Allen Jr — Principal CSM' },
  { q: 'He bridges customer needs with operational rigor. The billing workflow improvements boosted productivity across teams.', a: 'Natalia Wyatt — Billing Ops Manager' },
  { q: 'Proactive and relentlessly improvement-minded. His work reduced unnecessary effort and empowered partner teams.', a: 'Junya Kato — Collections Manager' },
  { q: 'Significantly improved Sales and CS alignment and collaboration… crucial for closing deals.', a: 'RaeAnne English — Sales Ops Manager' },
  // Trimmed quotes you approved:
  { q: 'Andrew is always two steps ahead, anticipating challenges and keeping teams aligned with future initiatives.', a: 'Amanda Twohig — Director of Customer Success' },
  { q: 'Andrew brings clarity to complex challenges. His leadership on BoB balancing and cross-functional coordination built lasting process improvements for the CS org.', a: 'Deedee Fallon — VP of Customer Success' },
];

function shuffleOnce<T>(arr: T[]): T[] {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function MarqueeRow() {
  const [shuffled, setShuffled] = useState<Quote[] | null>(null);

  // Randomize client-side only to avoid SSR/CSR mismatch
  useEffect(() => {
    setShuffled(shuffleOnce(QUOTES));
  }, []);

  // Duplicate the row for a seamless loop
  const items = useMemo(() => (shuffled ? [...shuffled, ...shuffled] : null), [shuffled]);

  if (!items) return null;

  return (
    <div
      className="relative w-full overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_8%,black_92%,transparent)]"
      aria-label="Testimonials carousel"
    >
      <div className="flex gap-4 md:gap-6 py-1 md:py-2 animate-[marquee_36s_linear_infinite] will-change-transform">
        {items.map((x, i) => (
          <figure
            key={`${x.a}-${i}`}
            className="shrink-0 w-[420px] md:w-[480px] rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md shadow-sm p-3 md:p-4"
          >
            <blockquote className="text-[13px] md:text-sm leading-snug whitespace-pre-line">“{x.q}”</blockquote>
            <figcaption className="mt-3 text-[11px] md:text-xs font-medium text-white/85">— {x.a}</figcaption>
          </figure>
        ))}
      </div>

      {/* Co-located keyframes to keep behavior identical everywhere */}
      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-$begin:math:display$marquee_36s_linear_infinite$end:math:display$ { animation: none; transform: none; }
        }
      `}</style>
    </div>
  );
}

export default function Testimonials() {
  return (
    <section className="w-full">
      <h2 className="text-xl font-semibold tracking-tight">Testimonials</h2>
      <p className="mb-4 text-sm text-white/70">Endorsements from collaborators:</p>
      <MarqueeRow />
    </section>
  );
}
