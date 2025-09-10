'use client';
import { useState } from 'react';
import FlipCard from './FlipCard';
import { AboutFace } from './About';
import { ImpactFace } from './Impact';

export default function AboutImpactCard() {
  const [flipped, setFlipped] = useState(false);

  return (
    // add extra bottom padding so the absolute toggle doesn’t overlap next section
    <section id="about" className="section pb-10 md:pb-12">
      <FlipCard
        isFlipped={flipped}
        onToggle={() => setFlipped((f) => !f)}
        front={
          <div className="glass p-6 md:p-8">
            <AboutFace />
          </div>
        }
        back={
          <div className="glass p-6 md:p-8">
            <ImpactFace />
          </div>
        }
        heightClass="min-h-[420px] md:min-h-[520px]"
      />
    </section>
  );
}