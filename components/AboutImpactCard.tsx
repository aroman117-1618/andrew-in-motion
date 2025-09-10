'use client';
import { useState } from 'react';
import FlipCard from './FlipCard';
import About from './About';
import Impact from './Impact';

export default function AboutImpactCard() {
  const [flipped, setFlipped] = useState(false);

  return (
    <section id="about" className="section">
      <FlipCard
        isFlipped={flipped}
        onToggle={() => setFlipped((f) => !f)}
        front={<About />}
        back={<Impact />}
      />
    </section>
  );
}
