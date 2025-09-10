'use client';
import { useState } from 'react';
import FlipCard from './FlipCard';
import { AboutFace } from './About';
import TrackRecord from './TrackRecord'; // default export
import FlipToggle from './ui/FlipToggle';

export default function AboutImpactCard() {
  // Default to LEFT side (“About Me”)
  const [isRight, setIsRight] = useState(false);

  return (
    // On mobile we need less section padding because the toggle is in-flow.
    // On md+ we reserve extra space for the floating toggle.
    <section id="about" className="section pb-12 md:pb-28">
      <div className="relative max-w-[1040px] mx-auto">
        {/* Glass wrapper: do NOT clip content */}
        <div className="glass rounded-2xl z-20">
          {/* Give the content bottom padding so nothing gets cramped */}
          <div className="p-6 md:p-8 pb-6 md:pb-16">
            <FlipCard
              isFlipped={isRight}
              onToggle={() => setIsRight(v => !v)}
              // Let height grow on small screens to avoid text/image clipping
              lockToFrontHeight={false}
              front={<AboutFace />}
              back={<TrackRecord />}
            />
          </div>
        </div>

        {/* Toggle:
            - MOBILE: in normal flow (relative + mt-4) so it's always clickable.
            - DESKTOP: floated at the bottom edge of the card. */}
        <div
          className="
            relative mt-4 z-40 flex justify-center pointer-events-auto
            md:mt-0 md:absolute md:inset-x-0 md:-bottom-6
          "
        >
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
