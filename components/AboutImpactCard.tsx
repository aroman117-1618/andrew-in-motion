'use client';
import { useState } from 'react';
import FlipCard from './FlipCard';
import { AboutFace } from './About';
import TrackRecord from './TrackRecord'; // default export is fine
import FlipToggle from './ui/FlipToggle';

export default function AboutImpactCard() {
  // ⬇️ Default to LEFT side (About Me) showing
  const [isRight, setIsRight] = useState(false);

  return (
    // Reserve room below so the floating toggle never overlaps the next section
    <section id="about" className="section pb-28 md:pb-32">
      <div className="relative">
        {/* Keep rounded corners; do NOT clip content */}
        <div className="glass rounded-2xl z-10">
          {/* Extra bottom padding INSIDE the card so nothing hides behind the toggle */}
          <div className="p-6 md:p-8 pb-16 md:pb-20">
            <FlipCard
              // Show back when right is selected; front when left
              isFlipped={isRight}
              onToggle={() => setIsRight(v => !v)}
              // Let height size naturally on small screens to avoid clipping text/photos
              lockToFrontHeight={false}
              front={<AboutFace />}
              back={<TrackRecord />}
            />
          </div>
        </div>

        {/* Floating toggle pinned to the visual bottom edge of the card */}
        <div className="absolute inset-x-0 -bottom-6 md:-bottom-7 z-40 flex justify-center pointer-events-auto">
          <FlipToggle
            leftLabel="About Me"
            rightLabel="Track Record"
            isRight={isRight}
            onChange={() => setIsRight(v => !v)}
            // defensive: ensure buttons are clickable on iOS Safari
            className="touch-manipulation"
          />
        </div>
      </div>
    </section>
  );
}
