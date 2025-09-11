'use client';
import { useState } from 'react';
import FlipCard from './FlipCard';
import { AboutFace } from './About';
import TrackRecord from './TrackRecord';
import FlipToggle from './ui/FlipToggle';

export default function AboutImpactCard() {
  // false = About Me (left) by default
  const [isRight, setIsRight] = useState(false);

  return (
    // Reserve space for the floating toggle; keep this above the next section
    <section id="about" className="section pb-28 md:pb-36 relative z-20">
      <div className="relative max-w-[1040px] mx-auto">
        {/* Glass card */}
        <div className="glass rounded-2xl overflow-hidden">
          {/* Internal padding; a bit of bottom room so content never kisses the toggle */}
          <div className="p-6 md:p-8 pb-14 md:pb-20">
            <FlipCard
              isFlipped={isRight}
              onToggle={() => setIsRight(v => !v)}
              // ADAPT to the active face (About or Track Record)
              lockToFrontHeight={false}
              // Allow the container to shrink when Track Record is shorter than About
              minHeight={360}
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
            onChange={() => setIsRight(v => !v)}
          />
        </div>
      </div>
    </section>
  );
}
