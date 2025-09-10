'use client';
import { useState } from 'react';
import FlipCard from './FlipCard';
import { AboutFace } from './About';
import TrackRecord from './TrackRecord';
import FlipToggle from './ui/FlipToggle';

export default function AboutTrackRecordCard() {
  const [showTrack, setShowTrack] = useState(false);

  return (
    <section id="about" className="section pb-16 md:pb-20">
      <div className="relative">
        <div className="glass p-6 md:p-8 pb-12 md:pb-14 rounded-2xl">
          <FlipCard
            isFlipped={showTrack}
            onToggle={() => setShowTrack(v => !v)}
            lockToFrontHeight={true}
            front={<AboutFace />}
            back={<TrackRecord />}
          />

          <div className="mt-4 flex justify-center">
            <FlipToggle
              isOn={showTrack}
              onToggle={() => setShowTrack(v => !v)}
              offLabel="About Me"
              onLabel="Track Record"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
