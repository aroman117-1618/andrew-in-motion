'use client';

import { useState, useMemo } from 'react';
import type { ReactNode } from 'react';
import FlipCard from '@/components/FlipCard';

function OverviewFace() {
  return (
    <div className="text-sm md:text-base text-white/70 space-y-4">
      <p>Design, implement, and automate the systems your team relies on to scale—now powered by AI.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h4 className="font-semibold mb-1">Expected Results:</h4>
          <ul className="list-disc list-inside space-y-1">
            <li>10–20 hours/rep/week saved through AI-orchestrated workflows</li>
            <li>SLA compliance &amp; satisfaction gains with predictive monitoring</li>
            <li>Real-time insights and recommendations for faster decisions</li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-1">What I Deliver:</h4>
          <ul className="list-disc list-inside space-y-1">
            <li>End-to-end GTM architecture with AI-based optimization</li>
            <li>Cross-system automations with AI-driven anomaly detection &amp; reporting</li>
            <li>AI copilots and assistants embedded in GTM workflows</li>
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

type Tab = 'overview' | 'ex1' | 'ex2';

export default function SystemsAutomationCard() {
  const [active, setActive] = useState<Tab>('overview');
  const [isRight, setIsRight] = useState(false);
  const [leftFace, setLeftFace] = useState<ReactNode>(<OverviewFace />);
  const [rightFace, setRightFace] = useState<ReactNode>(
    <Video src="/solutions/lifecycle.webm" alt="Lifecycle Automation demo" />
  );

  const renderTab = useMemo(
    () => (tab: Tab): ReactNode => {
      switch (tab) {
        case 'ex2':
          return <Video src="/solutions/revops.webm" alt="RevOps Automation demo" />;
        case 'ex1':
          return <Video src="/solutions/lifecycle.webm" alt="Lifecycle Automation demo" />;
        case 'overview':
        default:
          return <OverviewFace />;
      }
    },
    []
  );

  const selectTab = (next: Tab) => {
    if (next === active) return;
    const willShowRight = !isRight;
    if (willShowRight) setRightFace(renderTab(next));
    else setLeftFace(renderTab(next));
    setIsRight(prev => !prev);
    setActive(next);
  };

  return (
    <div className="glass rounded-2xl relative">
      <div className="p-6 md:p-8 pb-20">
        <h3 className="text-xl md:text-2xl font-semibold mb-4">AI-Powered Systems Automation</h3>

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
            onClick={() => selectTab('ex1')}
            className={`rounded-full px-3 py-1 font-medium transition ${
              active === 'ex1' ? 'bg-white text-black' : 'text-white/80 hover:text-white'
            }`}
            aria-pressed={active === 'ex1'}
          >
            Example 1
          </button>
          <button
            type="button"
            onClick={() => selectTab('ex2')}
            className={`rounded-full px-3 py-1 font-medium transition ${
              active === 'ex2' ? 'bg-white text-black' : 'text-white/80 hover:text-white'
            }`}
            aria-pressed={active === 'ex2'}
          >
            Example 2
          </button>
        </div>
      </div>
    </div>
  );
}