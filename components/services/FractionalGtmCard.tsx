// components/services/FractionalGtmCard.tsx
'use client';

import { useState } from 'react';
import FlipCard from '../FlipCard';

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
        <div className="glass p-6 md:p-8 pb-16 md:pb-18 rounded-2xl">
          <FlipCard
            isFlipped={isBack}
            onToggle={() => setIsBack(v => !v)}
            lockToFrontHeight={false}
            front={<FractionalFront />}
            back={<GtmProgrammingBack />}
          />

          {/* Bottom/center segmented control (replaces FlipToggle) */}
          <div className="absolute inset-x-0 -bottom-5 md:-bottom-6 flex justify-center">
            <div
              className="
                inline-flex items-center gap-1 rounded-full border border-white/15 bg-black/40
                supports-[backdrop-filter]:backdrop-blur-[1.5px]
                md:supports-[backdrop-filter]:backdrop-blur-md
                p-1
              "
              role="tablist"
              aria-label="Service mode"
            >
              <button
                role="tab"
                aria-selected={!isBack}
                onClick={() => setIsBack(false)}
                className={`
                  px-3 md:px-4 py-1.5 rounded-full text-sm md:text-base transition
                  ${!isBack ? 'bg-white/15 font-semibold' : 'hover:bg-white/10'}
                `}
              >
                Fractional GTM Leadership
              </button>
              <button
                role="tab"
                aria-selected={isBack}
                onClick={() => setIsBack(true)}
                className={`
                  px-3 md:px-4 py-1.5 rounded-full text-sm md:text-base transition
                  ${isBack ? 'bg-white/15 font-semibold' : 'hover:bg-white/10'}
                `}
              >
                GTM Programming
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
