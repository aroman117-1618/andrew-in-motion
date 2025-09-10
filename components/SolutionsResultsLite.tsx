'use client';
import { useMemo, useState } from 'react';
import Image from 'next/image';

function VideoCard({ src, alt }: { src: string; alt: string }) {
  return (
    <video
      className="w-full rounded-xl border border-white/10"
      src={src}
      autoPlay
      loop
      muted
      playsInline
      preload="auto"
      aria-label={alt}
    />
  );
}

export default function SolutionsResultsLite() {
  const cards = useMemo(
    () => [
      {
        key: 'gtm',
        label: 'GTM Programming',
        node: <VideoCard src="/solutions/gtm.webm" alt="GTM Programming demo" />,
      },
      {
        key: 'revops',
        label: 'RevOps Automation',
        node: (
          <Image
            src="/solutions/revops.png"
            alt="RevOps Automation summary"
            width={1200}
            height={800}
            className="w-full h-auto rounded-xl border border-white/10"
            priority
          />
        ),
      },
      {
        key: 'lifecycle',
        label: 'Lifecycle Automation',
        node: <VideoCard src="/solutions/lifecycle.webm" alt="Lifecycle Automation demo" />,
      },
    ],
    []
  );

  const [idx, setIdx] = useState(0);
  const next = () => setIdx(i => (i + 1) % cards.length);
  const active = cards[idx];
  const upcoming = cards[(idx + 1) % cards.length];

  return (
    // z-10 keeps it below About; larger margin avoids contact on mobile
    <section id="solutions" className="section mt-20 md:mt-28 relative z-10">
      <div className="relative max-w-[1040px] mx-auto rounded-2xl border border-white/10 bg-black/30 p-4 md:p-6 pb-6 md:pb-16 supports-[backdrop-filter]:backdrop-blur-md">
        <header className="mb-3 flex items-center justify-between gap-2">
          <div className="text-left">
            <h2 className="text-2xl md:text-3xl font-semibold">Solutions &amp; Results</h2>
            <p className="text-sm md:text-base text-white/70">Turning strategy into measurable outcomes</p>
          </div>
          <div className="flex items-center gap-2">
            {cards.map((c, i) => (
              <span
                key={c.key}
                title={c.label}
                className={`h-2 w-2 rounded-full ${i === idx ? 'bg-white' : 'bg-white/30'}`}
              />
            ))}
          </div>
        </header>

        <div className="max-w-[960px] mx-auto">{active.node}</div>

        {/* MOBILE: in-flow; DESKTOP: float just below the card edge */}
        <button
          onClick={next}
          type="button"
          className="
            relative mt-4
            md:mt-0 md:absolute md:-bottom-4 md:left-1/2 md:-translate-x-1/2
            rounded-full border border-white/15 bg-black/60 px-3 py-1.5
            text-sm font-medium shadow-md backdrop-blur
            supports-[backdrop-filter]:backdrop-blur-md
            hover:bg-black/70 focus:outline-none focus:ring-2 focus:ring-white/40
          "
          aria-label={`Next: ${upcoming.label}`}
        >
          Next: {upcoming.label}
        </button>
      </div>
    </section>
  );
}
