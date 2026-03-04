'use client';

import { LogoPill, MetricBlock, QuoteLine } from './ExampleHelpers';
import { getTestimonialForService } from '@/data/testimonials';

const AI_QUOTE = getTestimonialForService('ai-strategist');

function AthenaIcon() {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Owl silhouette — Athena's symbol */}
      <circle cx="24" cy="24" r="23" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
      <circle cx="24" cy="24" r="20" fill="rgba(43,119,106,0.3)" />
      {/* Eyes */}
      <circle cx="18" cy="20" r="4" fill="rgba(59,157,139,0.8)" />
      <circle cx="30" cy="20" r="4" fill="rgba(59,157,139,0.8)" />
      <circle cx="18" cy="20" r="1.5" fill="white" />
      <circle cx="30" cy="20" r="1.5" fill="white" />
      {/* Beak */}
      <path d="M22 26 L24 30 L26 26" stroke="rgba(230,213,163,0.8)" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      {/* Brow lines */}
      <path d="M13 16 Q18 13, 23 16" stroke="rgba(255,255,255,0.4)" strokeWidth="1" fill="none" />
      <path d="M25 16 Q30 13, 35 16" stroke="rgba(255,255,255,0.4)" strokeWidth="1" fill="none" />
    </svg>
  );
}

export default function AthenaExampleContent() {
  return (
    <div className="space-y-4 relative">
      <QuoteLine
        quote={AI_QUOTE.quote}
        attribution={`${AI_QUOTE.name}, ${AI_QUOTE.title}`}
      />
      
      {/* Title row */}
      <div className="flex items-center gap-3 pr-[260px] md:pr-[300px]">
        <AthenaIcon />
        <div>
          <h4 className="text-lg md:text-xl font-semibold text-white leading-tight">
            Full Stack AI Strategist
          </h4>
          <p className="text-xs text-white/50 mt-0.5">Postman &middot; Hybrid Customer Success</p>
        </div>
      </div>

      {/* Tech/integration logos strip */}
      <div className="flex flex-wrap items-center gap-2">
        <LogoPill label="Cursor IDE" />
        <LogoPill label="Salesforce" />
        <LogoPill label="Gong" />
        <LogoPill label="Gainsight" />
        <LogoPill label="Google Drive" />
      </div>

      {/* Two-panel layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {/* Left: Challenge / Solution / Results */}
        <div className="glass-embed p-4 space-y-3 text-sm">
          <div>
            <p className="text-white/50 text-xs font-medium uppercase tracking-wider mb-1">Challenge:</p>
            <p className="text-white/70">
              15 CSMs manually stitching data from 4+ systems per account.
              2-4 hours before any health check, meeting prep, or outreach.
            </p>
          </div>
          <div>
            <p className="text-white/50 text-xs font-medium uppercase tracking-wider mb-1">Solution:</p>
            <p className="text-white/70">
              AI agent with 10 skills, 5 automated data pipelines, and a
              real-time telemetry dashboard — all writing to shared
              customer Intel folders.
            </p>
          </div>
          <div>
            <p className="accent text-xs font-semibold uppercase tracking-wider mb-1">Results:</p>
            <ul className="text-white/80 space-y-1 text-sm">
              <li className="flex items-start gap-1.5">
                <span className="text-[var(--nebula-teal-2)] mt-0.5">&#x2022;</span>
                <span>562 accounts synced automatically</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-[var(--nebula-teal-2)] mt-0.5">&#x2022;</span>
                <span>~27.7K API calls/week, zero manual pulls</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-[var(--nebula-teal-2)] mt-0.5">&#x2022;</span>
                <span>5-minute setup, zero ongoing maintenance</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Right: Dashboard/terminal mockup */}
        <div className="glass-embed p-3 flex flex-col gap-2">
          {/* Fake terminal header */}
          <div className="flex items-center gap-1.5 px-2 py-1">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
            <span className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
            <span className="text-[10px] text-white/30 ml-2 font-mono">athena-dashboard</span>
          </div>
          {/* Simulated dashboard content */}
          <div className="bg-black/40 rounded-lg p-3 space-y-2.5 font-mono text-[11px] flex-1">
            <div className="flex items-center justify-between">
              <span className="text-white/40">Pipeline Status</span>
              <span className="text-[var(--nebula-teal-2)] text-[10px]">Live</span>
            </div>
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-white/60">Kepler (SFDC+Gong)</span>
                <span className="text-green-400/80 text-[10px]">&#10003; 2x/day</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-white/60">Looker Usage</span>
                <span className="text-green-400/80 text-[10px]">&#10003; monthly</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-white/60">Gainsight CTAs</span>
                <span className="text-green-400/80 text-[10px]">&#10003; 3x/week</span>
              </div>
            </div>
            <div className="border-t border-white/5 pt-2 mt-1">
              <div className="flex items-center justify-between">
                <span className="text-white/40">Skills</span>
                <span className="text-white/40">10 active</span>
              </div>
              <div className="flex flex-wrap gap-1 mt-1.5">
                {['health-check', 'territory-review', 'onboarding-deck', 'success-plan', 'email-outreach'].map(s => (
                  <span key={s} className="px-1.5 py-0.5 rounded bg-[var(--nebula-teal)]/20 text-[var(--nebula-teal-2)] text-[9px]">
                    /{s}
                  </span>
                ))}
                <span className="px-1.5 py-0.5 rounded bg-white/5 text-white/30 text-[9px]">+5 more</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom metrics strip */}
      <div className="flex items-center justify-around pt-1">
        <MetricBlock value="562" label="Accounts" />
        <MetricBlock value="10" label="Skills" />
        <MetricBlock value="5" label="Pipelines" />
        <MetricBlock value="0 min" label="CSM Setup" />
      </div>
    </div>
  );
}
