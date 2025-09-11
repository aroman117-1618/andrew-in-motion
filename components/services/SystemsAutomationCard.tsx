'use client';

import { useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import FlipCard from '@/components/FlipCard';

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

type Tab = 'overview' | 'ex1' | 'ex2';

export default function SystemsAutomationCard() {
  // Which tab the user has selected
  const [active, setActive] = useState<Tab>('overview');

  // Which side is currently visible (false = left/front, true = right/back)
  const [isRight, setIsRight] = useState(false);

  // The actual React nodes sitting on each face right now
  const [leftFace, setLeftFace] = useState<ReactNode>(<OverviewFace />);
  const [rightFace, setRightFace] = useState<ReactNode>(<Video src="/solutions/lifecycle.webm" alt="Lifecycle Automation demo" />);

  // Factory to render a tab's content
  const renderTab = useMemo(
    () => (tab: Tab): ReactNode => {
      switch (tab) {
        case 'overview':
          return <OverviewFace />;
        case 'ex2':
          return <Video src="/solutions/revops.webm" alt="RevOps Automation demo" />;
        case 'ex1':
        default:
          return <Video src="/solutions/lifecycle.webm" alt="Lifecycle Automation demo" />;
      }
    },
    []
  );

  // Handle a tab click so that EVERY change triggers a flip
  const selectTab = (next: Tab) => {
    if (next === active) return;

    const willShowRight = !isRight; // because we flip immediately
    if (willShowRight) {
      setRightFace(renderTab(next));
    } else {
      setLeftFace(renderTab(next));
    }

    // flip the card (3D rotation)
    setIsRight(prev => !prev);
    setActive(next);
  };

  return (
    <div className="glass rounded-2xl relative">
      <div className="p-6 md:p-8 pb-20">
        <h3 className="text-xl md:text-2xl font-semibold mb-4">Systems Automation</h3>

        <FlipCard
          isFlipped={isRight}
          onToggle={() => setIsRight(v => !v)}   // not used by the pill, but keeps a11y path
          lockToFrontHeight={false}              // adapt to whichever face is visible
          minHeight={225}                        // requested minimum height
          front={leftFace}
          back={rightFace}
        />
      </div>

      {/* Three-option pill pinned below the card */}
      <div className="absolute inset-x-0 -bottom-6 z-20 flex justify-center">
        <div className="inline-flex items-center gap-1 rounded-full border border-white/15 bg-black/60 px-1 py-1 text-sm shadow-md backdrop-blur supports-[backdrop-filter]:backdrop-blur-md">
          <button
            type="button"
            onClick={() => selectTab('overview')}
            className={`rounded-full px-3 py-1 font-medium transition ${active === 'overview' ? 'bg-white text-black' : 'text-white/80 hover:text-white'}`}
            aria-pressed={active === 'overview'}
          >
            Overview
          </button>
          <button
            type="button"
            onClick={() => selectTab('ex1')}
            className={`rounded-full px-3 py-1 font-medium transition ${active === 'ex1' ? 'bg-white text-black' : 'text-white/80 hover:text-white'}`}
            aria-pressed={active === 'ex1'}
          >
            Example 1
          </button>
          <button
            type="button"
            onClick={() => selectTab('ex2')}
            className={`rounded-full px-3 py-1 font-medium transition ${active === 'ex2' ? 'bg-white text-black' : 'text-white/80 hover:text-white'}`}
            aria-pressed={active === 'ex2'}
          >
            Example 2
          </button>
        </div>
      </div>
    </div>
  );
}
