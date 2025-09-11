'use client';

import { useState, useMemo } from 'react';
import FlipCard from '@/components/FlipCard';
import FlipToggle from '@/components/ui/FlipToggle'; // used for 2-state; we’ll add a third button inline

function OverviewFace() {
  return (
    <div className="text-sm md:text-base text-white/70 space-y-4">
      <p>Design, implement, and automate the systems your team relies on to scale.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h4 className="font-semibold mb-1">Expected Results:</h4>
          <ul className="list-disc list-inside space-y-1">
            <li>10–20 hours/rep/week saved</li>
            <li>SLA Compliance &amp; customer satisfaction gains</li>
            <li>Real-time data for faster decision-making</li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-1">What I Deliver:</h4>
          <ul className="list-disc list-inside space-y-1">
            <li>End-to-end GTM architecture</li>
            <li>Cross-system automations for data integrity and reporting</li>
            <li>AI integration across GTM tooling &amp; workflows</li>
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

export default function SystemsAutomationCard() {
  // tabs: overview | ex1 | ex2
  const [tab, setTab] = useState<'overview' | 'ex1' | 'ex2'>('overview');

  // Flip when leaving/entering Overview; stay on back face while switching ex1<->ex2
  const isRight = tab !== 'overview';

  const backFace = useMemo(() => {
    if (tab === 'ex2') {
      return <Video src="/solutions/revops.webm" alt="RevOps Automation demo" />;
    }
    // default to Example 1
    return <Video src="/solutions/lifecycle.webm" alt="Lifecycle Automation demo" />;
  }, [tab]);

  return (
    <div className="glass rounded-2xl relative">
      <div className="p-6 md:p-8 pb-20">
        <h3 className="text-xl md:text-2xl font-semibold mb-4">Systems Automation</h3>

        <FlipCard
          isFlipped={isRight}
          onToggle={() =>
            setTab(prev => (prev === 'overview' ? 'ex1' : 'overview'))
          }
          lockToFrontHeight={false}
          minHeight={320}
          front={<OverviewFace />}
          back={backFace}
        />
      </div>

      {/* 3-option pill pinned to the bottom edge */}
      <div className="absolute inset-x-0 -bottom-6 z-20 flex justify-center">
        <div className="inline-flex items-center gap-1 rounded-full border border-white/15 bg-black/60 px-1 py-1 text-sm shadow-md backdrop-blur supports-[backdrop-filter]:backdrop-blur-md">
          <button
            type="button"
            onClick={() => setTab('overview')}
            className={`rounded-full px-3 py-1 font-medium transition ${
              tab === 'overview' ? 'bg-white text-black' : 'text-white/80 hover:text-white'
            }`}
            aria-pressed={tab === 'overview'}
          >
            Overview
          </button>
          <button
            type="button"
            onClick={() => setTab('ex1')}
            className={`rounded-full px-3 py-1 font-medium transition ${
              tab === 'ex1' ? 'bg-white text-black' : 'text-white/80 hover:text-white'
            }`}
            aria-pressed={tab === 'ex1'}
          >
            Example 1
          </button>
          <button
            type="button"
            onClick={() => setTab('ex2')}
            className={`rounded-full px-3 py-1 font-medium transition ${
              tab === 'ex2' ? 'bg-white text-black' : 'text-white/80 hover:text-white'
            }`}
            aria-pressed={tab === 'ex2'}
          >
            Example 2
          </button>
        </div>
      </div>
    </div>
  );
}
