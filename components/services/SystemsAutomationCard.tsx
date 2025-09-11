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

export default function SystemsAutomationCard() {
  const [tab, setTab] = useState<'Overview' | 'Example'>('Overview');

  return (
    <div className="glass rounded-2xl p-6 md:p-8 flex flex-col gap-6">
      <h3 className="text-xl md:text-2xl font-semibold">Systems Automation</h3>

      {tab === 'revops' ? (
        <div className="text-sm md:text-base text-white/70 space-y-4">
          <p>
            Design, implement, and automate the systems your team relies on to scale.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-1">Expected Results:</h4>
              <ul className="list-disc list-inside space-y-1">
                <li>10–20 hours/rep/week saved</li>
                <li>SLA Compliance &amp; customer satisfaction gains</li>
                <li>Real-time data for faster decision-making</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-1">What I Deliver:</h4>
              <ul className="list-disc list-inside space-y-1">
                <li>End-to-end GTM architecture</li>
                <li>Cross-system automations for data integrity and reporting</li>
                <li>AI integration across GTM tooling &amp; workflows</li>
              </ul>
            </div>
          </div>
        </div>
      ) : (
        <VideoCard src="/solutions/lifecycle.webm" alt="Lifecycle Automation demo" />
      )}

      <div className="flex justify-center gap-3 pt-4">
        <button
          onClick={() => setTab('Overview')}
          className={`px-3 py-1 rounded-full border text-sm font-medium ${
            tab === 'Overview'
              ? 'bg-white text-black border-white'
              : 'bg-black/40 border-white/20 text-white/70 hover:text-white'
          }`}
        >
          Overview
        </button>
        <button
          onClick={() => setTab('Example')}
          className={`px-3 py-1 rounded-full border text-sm font-medium ${
            tab === 'Example'
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
