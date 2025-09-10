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
  const next = () => setIdx((i) => (i + 1) % cards.length);
  const active = cards[idx];
  const upcoming = cards[(idx + 1) % cards.length);

  return (
    <section id="solutions" className="section mt-12 md:mt-16">
      <div className="relative max-w-[1040px] mx-auto rounded-2xl border border-white/10 bg-black/30 p-4 md:p-6 supports-[backdrop-filter]:backdrop-blur-md">
        <div className="mb-3 flex items-center justify-between gap-2">
          <h2 className="text-2xl md:text-3xl font-semibold">Solutions &amp; Results</h2>
          <div className="flex items-center gap-2">
            {cards.map((c, i) => (
              <span key={c.key} title={c.label} className={`h-2 w-2 rounded-full ${i === idx ? 'bg-white' : 'bg-white/30'}`} />
            ))}
          </div>
        </div>
        <div className="max-w-[960px] mx-auto">{active.node}</div>
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
