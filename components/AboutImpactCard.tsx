'use client';
import { useState } from 'react';
import FlipCard from './FlipCard';
import { AboutFace } from './About';
import TrackRecord from './TrackRecord';
import FlipToggle from './ui/FlipToggle';

export default function AboutImpactCard() {
  // false = About (left) showing by default
  const [isRight, setIsRight] = useState(false);

  return (
    // Reserve room below for the floating toggle; keep this stack above the next section
    <section id="about" className="section pb-28 md:pb-36 relative z-20">
      <div className="relative max-w-[1040px] mx-auto">
        {/* Glass card */}
        <div className="glass rounded-2xl overflow-hidden">
          {/* Internal padding; extra bottom so nothing collides with the toggle */}
          <div className="p-6 md:p-8 pb-16 md:pb-24">
            <FlipCard
              isFlipped={isRight}
              onToggle={() => setIsRight(prev => !prev)}
              // ADAPTIVE: container height will equal the ACTIVE face height
              lockToFrontHeight={false}
              front={<AboutFace />}
              back={<TrackRecord />}
            />
          </div>
        </div>

        {/* Toggle pinned to the visual bottom of the glass */}
        <div className="absolute inset-x-0 -bottom-8 z-40 flex justify-center pointer-events-auto">
          <FlipToggle
            leftLabel="About Me"
            rightLabel="Track Record"
            isRight={isRight}
            onChange={() => setIsRight(prev => !prev)}
          />
        </div>
      </div>
    </section>
  );
}
