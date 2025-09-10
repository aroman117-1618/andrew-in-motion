'use client';
import { useState } from 'react';
import FlipCard from './FlipCard';
import { AboutFace } from './About';
import { ImpactFace } from './Impact';
import FlipToggle from './ui/FlipToggle';

export default function AboutImpactCard() {
  const [showImpact, setShowImpact] = useState(false);

  return (
    <section id="about" className="section pb-16 md:pb-20">
      <div className="relative">
        <FlipCard
          isFlipped={showImpact}
          onToggle={() => setShowImpact(v => !v)}
          front={<div className="glass p-6 md:p-8"><AboutFace /></div>}
          back={<div className="glass p-6 md:p-8"><ImpactFace /></div>}
          heightClass="min-h-[460px] md:min-h-[560px]"
        />
        <div className="pointer-events-none absolute inset-x-0 -bottom-6 flex justify-center">
          <div className="pointer-events-auto">
            <FlipToggle
              left="About"
              right="Impact"
              on={showImpact}
              onChange={setShowImpact}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
