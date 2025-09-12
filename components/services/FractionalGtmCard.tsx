'use client';

import { useState, useMemo } from 'react';
import type { ReactNode } from 'react';
import FlipCard from '@/components/FlipCard';

function OverviewFace() {
  return (
    <div className="text-sm md:text-base text-white/70 space-y-4">
      <p>
        Lead your GTM program with operating cadence, cross-functional rituals, and AI fluency
        that accelerate growth from first touch through renewal.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h4 className="font-semibold mb-1">Expected Results:</h4>
          <ul className="list-disc list-inside space-y-1">
            <li>Clear GTM priorities and execution rhythm, accelerated by AI-driven insights</li>
            <li>Faster time-to-impact with strategic planning and execution</li>
            <li>Higher conversion and retention through AI-enabled customer engagement</li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-1">What I Deliver:</h4>
          <ul className="list-disc list-inside space-y-1">
            <li>Program design with measurable KPIs and structured benchmarks</li>
            <li>Cross-team operating model, with coaching to build AI fluency across GTM leaders</li>
            <li>Enablement, dashboards, and experiment loops with AI-powered analytics</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

function Video({ src, alt }: { src: string; alt: string }) {
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

type Tab = 'overview' | 'example';

export default function FractionalGTMCard() {
  const [active, setActive] = useState<Tab>('overview');
  const [isRight, setIsRight] = useState(false);
  const [leftFace, setLeftFace] = useState<ReactNode>(<OverviewFace />);
  const [rightFace, setRightFace] = useState<ReactNode>(
    <Video src="/solutions/gtm.webm" alt="GTM Programming demo" />
  );

  const renderTab = useMemo(
    () => (tab: Tab): ReactNode =>
      tab === 'overview' ? <OverviewFace /> : <Video src="/solutions/gtm.webm" alt="GTM Programming demo" />,
    []
  );

  // Flip on every change between overview <-> example
  const selectTab = (next: Tab) => {
    if (next === active) return;
    const willShowRight = !isRight; // we flip immediately
    if (willShowRight) setRightFace(renderTab(next));
    else setLeftFace(renderTab(next));
    setIsRight(prev => !prev);
    setActive(next);
  };

  return (
    <div className="glass rounded-2xl relative">
      <div className="p-6 md:p-8 pb-20">
        <h3 className="text-xl md:text-2xl font-semibold mb-4">
          Fractional GTM Leadership &amp; Programming
        </h3>

        <FlipCard
          isFlipped={isRight}
          onToggle={() => setIsRight(v => !v)}
          lockToFrontHeight={false}
          minHeight={225}
          front={leftFace}
          back={rightFace}
        />
      </div>

      <div className="absolute inset-x-0 -bottom-6 z-20 flex justify-center">
        <div className="inline-flex items-center gap-1 rounded-full border border-white/15 bg-black/60 px-1 py-1 text-sm shadow-md backdrop-blur supports-[backdrop-filter]:backdrop-blur-md">
          <button
            type="button"
            onClick={() => selectTab('overview')}
            className={`rounded-full px-3 py-1 font-medium transition ${
              active === 'overview' ? 'bg-white text-black' : 'text-white/80 hover:text-white'
            }`}
            aria-pressed={active === 'overview'}
          >
            Overview
          </button>
          <button
            type="button"
            onClick={() => selectTab('example')}
            className={`rounded-full px-3 py-1 font-medium transition ${
              active === 'example' ? 'bg-white text-black' : 'text-white/80 hover:text-white'
            }`}
            aria-pressed={active === 'example'}
          >
            Example
          </button>
        </div>
      </div>
    </div>
  );
}