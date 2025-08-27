'use client';

import { useEffect, useMemo, useState } from 'react';

type Quote = { q: string; a: string };

const QUOTES: Quote[] = [
  { q: 'Analytical and impact-driven. Andrew’s reporting and approach influences not just CSMs—leaders learn from him too.', a: 'Allie Guertin — Senior Manager, Customer Success' },
  { q: 'Technical acumen + genuine customer care.\nA culture builder who quickly becomes the go-to resource.', a: 'Jina Algarin — Director of Business Operations' },
  { q: 'Built a high-trust, high-performing team and broke down information silos with scalable process and enablement.', a: 'Omkar Waghe — Customer Success Engineer' },
  { q: 'Andrew brought clarity to complex change management—owning handoffs, dashboards, and process templates that raised the bar.', a: 'Rahat Rahman — Senior Strategy Manager' },
  { q: 'A mentor who creates space to grow.\nHis guidance built confidence and accelerated my development.', a: 'Rob Allen Jr — Principal CSM' },
  { q: 'He bridges customer needs with operational rigor. The billing workflow improvements boosted productivity across teams.', a: 'Natalia Wyatt — Billing Ops Manager' },
  { q: 'Proactive and relentlessly improvement-minded.\nHis work reduced unnecessary effort and empowered partner teams.', a: 'Junya Kato — Collections Manager' },
  { q: 'Significantly improved Sales and CS alignment and collaboration… crucial for closing deals.', a: 'RaeAnne English — Sales Ops Manager' },
  { q: 'Andrew is always two steps ahead, anticipating challenges and keeping teams aligned with future initiatives while navigating today’s demands.', a: 'Amanda Twohig — Director of CS' },
  { q: 'Andrew brings clarity to complex challenges.\nHis leadership on Territory planning and cross-functional coordination built lasting process improvements for the GTM org.', a: 'Deedee Fallon — VP of CS' },
];

function shuffleOnce<T>(arr: T[]): T[] {
  const a = arr.slice();
  // Fisher–Yates
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function Row() {
  const [shuffled, setShuffled] = useState<Quote[] | null>(null);

  useEffect(() => {
    // shuffle client-side once to avoid SSR/CSR mismatch
    setShuffled(shuffleOnce(QUOTES));
  }, []);

  // duplicate for seamless loop once we have a shuffled order
  const items = useMemo(() => (shuffled ? [...shuffled, ...shuffled] : null), [shuffled]);

  if (!items) {
    // render nothing (or a minimal skeleton) to avoid layout shift
    return null;
  }

  return (
    <div
      className="relative w-full overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_10%,black_90%,transparent)]"
      aria-label="Testimonials carousel"
    >
      <div
        className="flex gap-6 py-2 animate-[marquee_35s_linear_infinite]"
        // Pause on hover if you like:
        // onMouseEnter={(e) => (e.currentTarget.style.animationPlayState = 'paused')}
        // onMouseLeave={(e) => (e.currentTarget.style.animationPlayState = 'running')}
      >
        {items.map((x, i) => (
          <figure
            key={`${x.a}-${i}`}
            className="shrink-0 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-md shadow-sm"
          >
            <blockquote className="text-sm italic leading-snug whitespace-pre-line">“{x.q}”</blockquote>
            <figcaption className="mt-3 text-xs font-medium text-white/90">— {x.a}</figcaption>
          </figure>
        ))}
      </div>

      {/* Marquee keyframes – co-locate for convenience */}
      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
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
      {/* full-bleed carousel (no parent glass) */}
      <Row />
    </section>
  );
}
