// components/services/FractionalGtmCard.tsx
'use client';

import { useState } from 'react';
import FlipCard from '../FlipCard';
import FlipToggle from '../ui/FlipToggle';

function FractionalFront() {
  return (
    <div className="glass-embed p-6 md:p-8 rounded-2xl">
      <h3 className="h-heading text-xl font-semibold">Fractional GTM Leadership</h3>
      <p className="mt-2 text-white/85">
        Senior-level GTM leadership that accelerates growth, without the full-time cost.
      </p>

      <div className="mt-4 grid md:grid-cols-2 gap-6">
        <div>
          <div className="font-medium">Expected Results:</div>
          <ul className="mt-2 space-y-2 text-white/85">
            <li>• Immediate lift in qualified bookings</li>
            <li>• Increased pipeline velocity and ACV</li>
            <li>• Predictable, scalable lifecycle operations</li>
          </ul>
        </div>
        <div>
          <div className="font-medium">What I Deliver:</div>
          <ul className="mt-2 space-y-2 text-white/85">
            <li>• Strategic planning &amp; programming support</li>
            <li>• GTM coaching &amp; playbook development</li>
            <li>• Renewal &amp; expansion programming</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

function GtmProgrammingBack() {
  return (
    <div className="glass-embed p-6 md:p-8 rounded-2xl">
      <h3 className="h-heading text-xl font-semibold">GTM Programming</h3>
      {/* Using the same demo asset your slider uses */}
      <div className="mt-4">
        <video
          className="w-full rounded-xl border border-white/10"
          src="/solutions/gtm.webm"
          autoPlay
          loop
            muted
          playsInline
          preload="auto"
          aria-label="GTM Programming demo"
        />
      </div>
    </div>
  );
}

export default function FractionalGtmCard() {
  const [isBack, setIsBack] = useState(false);

  return (
    <section id="service-fractional" className="section pb-16 md:pb-20">
      <div className="relative">
        <div className="glass p-6 md:p-8 pb-12 md:pb-14 rounded-2xl">
          <FlipCard
            isFlipped={isBack}
            onToggle={() => setIsBack(v => !v)}
            lockToFrontHeight={false}
            front={<FractionalFront />}
            back={<GtmProgrammingBack />}
          />

          {/* Bottom-center toggle */}
          <div className="absolute inset-x-0 -bottom-5 md:-bottom-6 flex justify-center">
            <FlipToggle
              isOn={isBack}
              onToggle={() => setIsBack(v => !v)}
              leftLabel="Fractional GTM Leadership"
              rightLabel="GTM Programming"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
