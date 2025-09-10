'use client';
import { useState } from 'react';
import FlipCard from './FlipCard';
import { AboutFace } from './About';
import { TrackRecordFace } from './TrackRecord';
import FlipToggle from './ui/FlipToggle';

export default function AboutImpactCard() {
  const [showRight, setShowRight] = useState(true);

  return (
    // Extra bottom padding so the floating toggle never overlaps the next section
    <section id="about" className="section pb-24 md:pb-28">
      <div className="relative">
        {/* Keep rounded corners, but don't clip content */}
        <div className="glass rounded-2xl z-10">
          {/* Add bottom padding so content never hides behind the toggle */}
          <div className="p-6 md:p-8 pb-12 md:pb-14">
            <FlipCard
              isFlipped={showRight}
              onToggle={() => setShowRight(v => !v)}
              // Let the card size naturally on mobile to avoid clipping
              lockToFrontHeight={false}
              front={<AboutFace />}
              back={<TrackRecordFace />}
            />
          </div>
        </div>

        {/* Toggle pinned to the bottom edge of the card */}
        <div className="absolute inset-x-0 -bottom-5 md:-bottom-6 z-20 flex justify-center">
          <FlipToggle
            leftLabel="About Me"
            rightLabel="Track Record"
            isRight={showRight}
            onChange={() => setShowRight(v => !v)}
          />
        </div>
      </div>
    </section>
  );
}
