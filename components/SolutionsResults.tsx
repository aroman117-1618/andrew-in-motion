'use client';

import { useMemo, useState } from 'react';
import FigmaFrame from './embeds/FigmaFrame';

type Card = { key: 'gtm' | 'revops' | 'lifecycle'; label: string; node: React.ReactNode };

export default function SolutionsResults() {
  const cards: Card[] = useMemo(
    () => [
      {
        key: 'gtm',
        label: 'GTM Programming',
        node: (
          <FigmaFrame
            title="GTM Programming"
            minHeight={720}
            src={
              'https://www.figma.com/proto/9C4klx9VsDGmvNZmbvAlUl/andrewinmotion?page-id=0%3A1&node-id=55-327&starting-point-node-id=55%3A327&scaling=scale-down&content-scaling=fixed&show-proto-sidebar=0'
            }
          />
        ),
      },
      {
        key: 'revops',
        label: 'RevOps Automation',
        node: (
          <div className="prose prose-invert max-w-none">
            <h3 className="text-xl font-semibold mb-2">RevOps Automation</h3>
            <p className="opacity-90">
              Replace this placeholder with a concise description or static image.
            </p>
            <img
              src="/images/revops-card.png"
              alt="RevOps Automation"
              className="rounded-xl border border-white/10"
            />
          </div>
        ),
      },
      {
        key: 'lifecycle',
        label: 'Lifecycle Automation',
        node: (
          <FigmaFrame
            title="Lifecycle Automation"
            minHeight={720}
            src={
              'https://www.figma.com/proto/9C4klx9VsDGmvNZmbvAlUl/andrewinmotion?page-id=0%3A1&node-id=55-405&starting-point-node-id=55%3A395&scaling=scale-down&content-scaling=fixed&show-proto-sidebar=0'
            }
          />
        ),
      },
    ],
    []
  );

  const [idx, setIdx] = useState(0);
  const next = () => setIdx((i) => (i + 1) % cards.length);

  const active = cards[idx];
  const upcoming = cards[(idx + 1) % cards.length];

  return (
    <section id="solutions" className="section">
      <div className="relative rounded-2xl border border-white/10 bg-black/30 p-4 md:p-6 supports-[backdrop-filter]:backdrop-blur-md">
        <div className="mb-3 flex items-center justify-between gap-2">
          <h2 className="text-2xl md:text-3xl font-semibold">Solutions &amp; Results</h2>
          <div className="flex items-center gap-2" aria-label="Card position">
            {cards.map((c, i) => (
              <span
                key={c.key}
                title={c.label}
                className={`h-2 w-2 rounded-full ${i === idx ? 'bg-white' : 'bg-white/30'}`}
              />
            ))}
          </div>
        </div>

        <div className="min-h-[320px] md:min-h-[420px]">{active.node}</div>

        <button
          onClick={next}
          className="absolute -bottom-4 left-1/2 -translate-x-1/2 rounded-full border border-white/15 bg-black/60 px-3 py-1.5 text-sm font-medium shadow-md backdrop-blur supports-[backdrop-filter]:backdrop-blur-md hover:bg-black/70 focus:outline-none focus:ring-2 focus:ring-white/40"
          aria-label={`Next: ${upcoming.label}`}
        >
          Next: {upcoming.label}
        </button>
      </div>
    </section>
  );
}
