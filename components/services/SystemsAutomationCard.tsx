'use client';

import { useState } from 'react';
import FlipCard from '@/components/FlipCard';
import FlipToggle from '@/components/ui/FlipToggle';

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

function ExampleFace() {
  return (
    <video
      className="w-full rounded-xl border border-white/10"
      src="/solutions/lifecycle.webm"
      autoPlay
      loop
      muted
      playsInline
      preload="auto"
      aria-label="Lifecycle Automation demo"
    />
  );
}

export default function SystemsAutomationCard() {
  // false = Overview, true = Example
  const [isRight, setIsRight] = useState(false);

  return (
    <div className="glass rounded-2xl relative">
      <div className="p-6 md:p-8 pb-16">
        <h3 className="text-xl md:text-2xl font-semibold mb-4">Systems Automation</h3>

        <FlipCard
          isFlipped={isRight}
          onToggle={() => setIsRight(v => !v)}
          lockToFrontHeight={false}
          minHeight={225}
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
