'use client';

import { useState } from 'react';
import FlipCard from '@/components/FlipCard';
import FlipToggle from '@/components/ui/FlipToggle';

function OverviewFace() {
  return (
    <div className="text-sm md:text-base text-white/70 space-y-4">
      <p>
        Design and lead your GTM program with the right operating cadence, cross-functional rituals,
        and analytics to drive growth from first touch through renewal.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h4 className="font-semibold mb-1">Expected Results:</h4>
          <ul className="list-disc list-inside space-y-1">
            <li>Clear GTM priorities and execution rhythm</li>
            <li>Shorter time-to-impact on initiatives</li>
            <li>Higher conversion and retention across the funnel</li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-1">What I Deliver:</h4>
          <ul className="list-disc list-inside space-y-1">
            <li>Program design with measurable KPIs</li>
            <li>Cross-team operating model and reviews</li>
            <li>Enablement, dashboards, and experiment loops</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

function ExampleFace() {
  return (
    <video
      className="w-full rounded-xl border border-white/10"
      src="/solutions/gtm.webm"
      autoPlay
      loop
      muted
      playsInline
      preload="auto"
      aria-label="GTM Programming demo"
    />
  );
}

export default function FractionalGTMCard() {
  // false = Overview, true = Example
  const [isRight, setIsRight] = useState(false);

  return (
    <div className="glass rounded-2xl relative">
      <div className="p-6 md:p-8 pb-16">
        <h3 className="text-xl md:text-2xl font-semibold mb-4">Fractional GTM</h3>

        <FlipCard
          isFlipped={isRight}
          onToggle={() => setIsRight(v => !v)}
          lockToFrontHeight={false}
          minHeight={320}
          front={<OverviewFace />}
          back={<ExampleFace />}
        />
      </div>

      {/* Toggle pinned to bottom edge of the card */}
      <div className="absolute inset-x-0 -bottom-6 z-20 flex justify-center">
        <FlipToggle
          leftLabel="Overview"
          rightLabel="Example"
          isRight={isRight}
          onChange={() => setIsRight(v => !v)}
        />
      </div>
    </div>
  );
}
