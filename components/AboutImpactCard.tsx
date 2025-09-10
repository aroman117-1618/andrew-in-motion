'use client';
import { useState } from 'react';
import FlipCard from './FlipCard';
import { AboutFace } from './About';
import { ImpactFace } from './Impact';
import FlipToggle from './ui/FlipToggle';

export default function AboutImpactCard() {
  const [showImpact, setShowImpact] = useState(false);

  return (
    // extra bottom padding so the floating toggle never overlaps the next section
    <section id="about" className="section pb-24 md:pb-28">
      <div className="relative">
        {/* ONE glass wrapper around the whole card */}
        <div className="glass rounded-2xl overflow-hidden">
          {/* Card content */}
          <div className="p-6 md:p-8">
            <FlipCard
              isFlipped={showImpact}
              onToggle={() => setShowImpact(v => !v)}
              lockToFrontHeight={true}
              front={<AboutFace />}
              back={<ImpactFace />}
            />
          </div>
        </div>

        {/* Toggle pinned to bottom of the card */}
        <div className="absolute inset-x-0 -bottom-5 md:-bottom-6 z-20 flex justify-center">
          <FlipToggle
            leftLabel="About Me"
            rightLabel="Track Record"
            isRight={showImpact}
            onChange={() => setShowImpact(v => !v)}
          />
        </div>
      </div>
    </section>
  );
}
