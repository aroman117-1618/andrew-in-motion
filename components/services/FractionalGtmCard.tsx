'use client';
import { useState } from 'react';

function VideoCard({ src, alt }: { src: string; alt: string }) {
  return (
    <video
      className="w-full rounded-xl border border-white/10"
      src={src}
      autoPlay
      loop
      muted
      playsInline
      preload="auto"
      aria-label={alt}
    />
  );
}

export default function FractionalGTMCard() {
  const [tab, setTab] = useState<'overview' | 'example'>('overview');

  return (
    <div className="glass rounded-2xl p-6 md:p-8 flex flex-col gap-6">
      <h3 className="text-xl md:text-2xl font-semibold">Fractional GTM</h3>

      {tab === 'overview' ? (
        <div className="text-sm md:text-base text-white/70 space-y-4">
          <p>
            Design and lead your GTM program with the right operating cadence, cross-functional rituals,
            and analytics to drive growth from first touch through renewal.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-1">Expected Results:</h4>
              <ul className="list-disc list-inside space-y-1">
                <li>Clear GTM priorities and execution rhythm</li>
                <li>Shorter time-to-impact on initiatives</li>
                <li>Higher conversion and retention lift across the funnel</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-1">What I Deliver:</h4>
              <ul className="list-disc list-inside space-y-1">
                <li>Program design with measurable KPIs</li>
                <li>Cross-team operating model and reviews</li>
                <li>Enablement, dashboards, and experiment loops</li>
              </ul>
            </div>
          </div>
        </div>
      ) : (
        <VideoCard src="/solutions/gtm.webm" alt="GTM Programming demo" />
      )}

      <div className="flex justify-center gap-3 pt-4">
        <button
          onClick={() => setTab('overview')}
          className={`px-3 py-1 rounded-full border text-sm font-medium ${
            tab === 'overview'
              ? 'bg-white text-black border-white'
              : 'bg-black/40 border-white/20 text-white/70 hover:text-white'
          }`}
        >
          Overview
        </button>
        <button
          onClick={() => setTab('example')}
          className={`px-3 py-1 rounded-full border text-sm font-medium ${
            tab === 'example'
              ? 'bg-white text-black border-white'
              : 'bg-black/40 border-white/20 text-white/70 hover:text-white'
          }`}
        >
          Example
        </button>
      </div>
    </div>
  );
}
