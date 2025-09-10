// components/AboutImpactCard.tsx
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
        <div className="glass rounded-2xl">
          <div className="p-6 md:p-8 pb-14 md:pb-16">
            <FlipCard
              isFlipped={showImpact}
              onToggle={() => setShowImpact(v => !v)}
              lockToFrontHeight={true}   // lock to About height
              minHeight={520}
              front={<AboutFace />}      // content-only
              back={<ImpactFace />}      // content-only
            />
          </div>
        </div>

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
