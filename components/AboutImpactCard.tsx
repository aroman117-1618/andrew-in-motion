// components/AboutTrackRecordCard.tsx  (you can keep the original filename if you like)
'use client';
import { useState } from 'react';
import FlipCard from './FlipCard';
import { AboutFace } from './About';          // your existing About face
import TrackRecord from './TrackRecord';      // new face
import FlipToggle from './ui/FlipToggle';

export default function AboutImpactCard() {
  const [showTrack, setShowTrack] = useState(false);

  return (
    // extra bottom padding so the control never overlaps the next section
    <section id="about" className="section pb-16 md:pb-20">
      <div className="relative">
        {/* ONE glass wrapper around the whole card */}
        <div className="glass p-6 md:p-8 pb-12 md:pb-14 rounded-2xl">
          <FlipCard
            isFlipped={showTrack}
            onToggle={() => setShowTrack(v => !v)}
            lockToFrontHeight={true}
            front={<AboutFace />}
            back={<TrackRecord />}
            frontLabel="About Me"
            backLabel="Track Record"
          />

          {/* toggle lives outside so it doesn’t get clipped */}
          <div className="mt-4 flex justify-center">
            <FlipToggle
              isOn={showTrack}
              onToggle={() => setShowTrack(v => !v)}
              offLabel="About"
              onLabel="Track Record"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
