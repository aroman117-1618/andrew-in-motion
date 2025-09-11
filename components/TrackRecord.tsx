// components/TrackRecord.tsx
'use client';
import Image from 'next/image';

type Company = {
  key: 'nift' | 'robin' | 'datadog' | 'klaviyo';
  name: string;
  logoSrc: string;       // in /public
  stage: string;         // “Seed”, “Series B → D”, etc.
  growth: string;        // new: quick revenue growth tagline
  scope: string;         // short blurb of what you owned/delivered
};

const COMPANIES: Company[] = [
  {
    key: 'nift',
    name: 'Nift',
    logoSrc: '/nift.png',
    stage: 'Early-stage (Seed)',
    growth: '0 → ~$1M Revenue Foundation',
    scope: 'Built first GTM systems for early traction.',
  },
  {
    key: 'datadog',
    name: 'Datadog',
    logoSrc: '/datadog.png',
    stage: 'Post-IPO',
    growth: '$1B+ Revenue Scale',
    scope: 'FedGov & At-Scale Lifecycle Automation.',
  },
  {
    key: 'robin',
    name: 'Robin',
    logoSrc: '/robin.png',
    stage: 'Growth (Series A → B → C)',
    growth: 'Scaled Toward ~$10M ARR',
    scope: 'Implemented post-sale Lifecycle systems, scaled automation, and lifted retention.',
  },
  {
    key: 'klaviyo',
    name: 'Klaviyo',
    logoSrc: '/klaviyo.png',
    stage: 'Series D → Post-IPO',
    growth: '~$500M → $1B+ Revenue',
    scope: 'Accelerated pipeline velocity, quote-to-cash automation, and elevated NRR.',
  },
];

export default function TrackRecord() {
  return (
    <div className="space-y-6 md:space-y-8">
      <header className="text-left">
        <h2 className="text-2xl md:text-3xl font-semibold">Track Record</h2>
        <p className="mt-1 text-sm md:text-base text-white/70">
          A quick read on the companies I’ve impacted and my areas of focus — spanning growth from early traction to $1B+ ARR.
        </p>
      </header>

      {/* grid of company tiles */}
      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
        {COMPANIES.map((c) => (
          <li
            key={c.key}
            className="rounded-xl border border-white/10 bg-black/30 p-4 md:p-5 supports-[backdrop-filter]:backdrop-blur-md"
          >
            <div className="flex items-center gap-3 md:gap-4">
              <div className="shrink-0 rounded-lg border border-white/10 bg-black/40 p-2 md:p-3">
                <Image
                  src={c.logoSrc}
                  alt={`${c.name} logo`}
                  width={56}
                  height={56}
                  className="h-10 w-10 md:h-12 md:w-12 object-contain"
                  priority
                />
              </div>

              <div className="min-w-0">
                <div className="flex items-baseline gap-2 flex-wrap">
                  <h3 className="text-lg md:text-xl font-medium leading-tight">
                    {c.name}
                  </h3>
                  <span className="text-xs md:text-sm text-white/60">
                    {c.stage}
                  </span>
                </div>
                <p className="mt-0.5 text-xs md:text-sm text-emerald-400">
                  {c.growth}
                </p>
                <p className="mt-1 text-sm md:text-base leading-relaxed text-white/80">
                  {c.scope}
                </p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
