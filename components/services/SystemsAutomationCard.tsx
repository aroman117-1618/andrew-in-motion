// components/services/SystemsAutomationCard.tsx
'use client';

import { useState } from 'react';

type Mode = 'revops' | 'lifecycle';

/** Re-uses your existing Services copy verbatim */
function SystemsBody() {
  return (
    <div className="mt-2">
      <p className="mt-2 text-white/85">
        Design, implement, and automate the systems your team relies on to scale
      </p>

      <div className="mt-4 grid md:grid-cols-2 gap-6">
        <div>
          <div className="font-medium">Expected Results:</div>
          <ul className="mt-2 space-y-2 text-white/85">
            <li>• 10–20 hours/rep/week saved</li>
            <li>• SLA Compliance &amp; customer satisfaction gains</li>
            <li>• Real-time data for faster decision-making</li>
          </ul>
        </div>
        <div>
          <div className="font-medium">What I Deliver:</div>
          <ul className="mt-2 space-y-2 text-white/85">
            <li>• End-to-end GTM architecture</li>
            <li>• Cross-system automations for data integrity and reporting</li>
            <li>• AI Integration across GTM tooling &amp; workflows</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default function SystemsAutomationCard() {
  const [mode, setMode] = useState<Mode>('revops');

  return (
    <section id="service-systems-automation" className="section pb-16 md:pb-20">
      <div className="relative">
        <div className="glass p-6 md:p-8 pb-16 md:pb-18 rounded-2xl">
          <header className="mb-4 md:mb-6">
            <h3 className="h-heading text-3xl md:text-4xl font-semibold tracking-tight">
              Systems Automation
            </h3>
            <p className="section-sub mt-2 opacity-90">
              Explore the two core modes: RevOps and Lifecycle
            </p>
          </header>

          {/* Content stays identical to your existing “RevOps & Lifecycle Automation” card copy */}
          <div className="min-h-[220px] md:min-h-[260px]">
            <SystemsBody />
          </div>

          {/* Bottom-center segmented control */}
          <div className="absolute inset-x-0 -bottom-5 md:-bottom-6 flex justify-center">
            <div
              className="
                inline-flex items-center gap-1 rounded-full border border-white/15 bg-black/40
                supports-[backdrop-filter]:backdrop-blur-[1.5px]
                md:supports-[backdrop-filter]:backdrop-blur-md
                p-1
              "
              role="tablist"
              aria-label="Systems Automation Modes"
            >
              <button
                role="tab"
                aria-selected={mode === 'revops'}
                onClick={() => setMode('revops')}
                className={`
                  px-3 md:px-4 py-1.5 rounded-full text-sm md:text-base transition
                  ${mode === 'revops' ? 'bg-white/15 font-semibold' : 'hover:bg-white/10'}
                `}
              >
                RevOps
              </button>
              <button
                role="tab"
                aria-selected={mode === 'lifecycle'}
                onClick={() => setMode('lifecycle')}
                className={`
                  px-3 md:px-4 py-1.5 rounded-full text-sm md:text-base transition
                  ${mode === 'lifecycle' ? 'bg-white/15 font-semibold' : 'hover:bg-white/10'}
                `}
              >
                Lifecycle
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
