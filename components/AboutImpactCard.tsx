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
    // Higher z so the next section can’t sit on top of this one
    <section id="about" className="section pb-24 md:pb-32 relative z-20">
      <div className="relative max-w-[1040px] mx-auto">
        {/* Glass card */}
        <div className="glass rounded-2xl overflow-hidden">
          {/* Extra bottom padding so content never hides behind the toggle */}
          <div className="p-6 md:p-8 pb-16 md:pb-24">
            <FlipCard
              // Keep the container as tall as the About face (prevents headshot cropping)
              isFlipped={isRight}
              onToggle={() => setIsRight(prev => !prev)}
              lockToFrontHeight={true}
              front={<AboutFace />}
              back={<TrackRecord />}
            />
          </div>
        </div>

        {/* Toggle: mobile – in-flow; md+ – floated at the visual bottom edge */}
        <div
          className="
            relative mt-4 z-40 flex justify-center pointer-events-auto
            md:mt-0 md:absolute md:inset-x-0 md:-bottom-8
          "
        >
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
