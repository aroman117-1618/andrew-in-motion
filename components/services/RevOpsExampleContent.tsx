'use client';

import { LogoPill, MetricBlock, QuoteLine } from './ExampleHelpers';
import { getTestimonialForService } from '@/data/testimonials';

const REVOPS_QUOTE = getTestimonialForService('revops');

function RevOpsIcon() {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <circle cx="24" cy="24" r="23" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
      <circle cx="24" cy="24" r="20" fill="rgba(43,119,106,0.3)" />
      {/* Revenue/chart bars */}
      <rect x="15" y="26" width="4" height="8" rx="1" fill="rgba(59,157,139,0.6)" />
      <rect x="22" y="22" width="4" height="12" rx="1" fill="rgba(59,157,139,0.8)" />
      <rect x="29" y="18" width="4" height="16" rx="1" fill="rgba(59,157,139,1)" />
      {/* Trend line */}
      <path
        d="M15 28 L22 24 L29 19 L35 16"
        stroke="rgba(230,213,163,0.6)"
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SlackMockup() {
  return (
    <div className="flex flex-col gap-2 h-full">
      {/* Channel header */}
      <div className="flex items-center gap-2 px-2 py-1.5 border-b border-white/5">
        <span className="text-[11px] font-semibold text-white/70"># deal-desk</span>
        <span className="text-[9px] text-white/20 ml-auto">Resources</span>
        <span className="text-[9px] text-white/20">Jira board</span>
      </div>

      {/* Chat area */}
      <div className="bg-black/40 rounded-lg p-3 space-y-3 font-mono text-[11px] flex-1">
        {/* User message */}
        <div className="flex items-start gap-2">
          <div className="w-5 h-5 rounded bg-[var(--nebula-teal)]/30 flex items-center justify-center text-[9px] text-white/60 shrink-0 mt-0.5">
            KP
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-white/70 font-semibold text-[10px]">Kenny Park</span>
              <span className="text-white/20 text-[9px]">11:55</span>
            </div>
            <p className="text-white/50 mt-0.5">/contract-success ABCD123</p>
          </div>
        </div>

        {/* Bot response */}
        <div className="flex items-start gap-2">
          <div className="w-5 h-5 rounded bg-white/10 flex items-center justify-center text-[9px] shrink-0 mt-0.5">
            <span className="text-[var(--nebula-teal-2)]">&#9889;</span>
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-1.5">
              <span className="text-white/70 font-semibold text-[10px]">Success Systems</span>
              <span className="text-white/20 text-[9px]">11:56</span>
            </div>
            <div className="text-white/50 space-y-0.5">
              <p className="text-white/60 font-semibold">Contracts &mdash; Aviation.org (ABCD123)</p>
              <p>L12M Product-1: 990K Profiles, $92,040</p>
              <p>L12M Product-2: 5.2M Credits, $51,000</p>
              <div className="border-t border-white/5 pt-1 mt-1">
                <p className="text-white/60">Optimized TCV: $118,530</p>
                <p className="text-green-400/70">Potential Savings: $24,510</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Input bar */}
      <div className="flex items-center gap-2 px-2 py-1 border border-white/5 rounded-lg">
        <span className="text-white/15 text-[10px]">Message #deal-desk</span>
      </div>
    </div>
  );
}

export default function RevOpsExampleContent() {
  return (
    <div className="space-y-4 relative">
      <QuoteLine
        quote={REVOPS_QUOTE.quote}
        attribution={`${REVOPS_QUOTE.name}, ${REVOPS_QUOTE.title}`}
      />
      
      {/* Title row */}
      <div className="flex items-center gap-3 pr-[260px] md:pr-[300px]">
        <RevOpsIcon />
        <div>
          <h4 className="text-lg md:text-xl font-semibold text-white leading-tight">
            RevOps Automation
          </h4>
          <p className="text-xs text-white/50 mt-0.5">Datadog &middot; Klaviyo &middot; Revenue Operations</p>
        </div>
      </div>

      {/* Tech/integration logos strip */}
      <div className="flex flex-wrap items-center gap-2">
        <LogoPill label="Snowflake" />
        <LogoPill label="Salesforce" />
        <LogoPill label="Gainsight" />
      </div>

      {/* Two-panel layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {/* Left: Challenge / Solution / Results */}
        <div className="glass-embed p-4 space-y-3 text-sm">
          <div>
            <p className="text-white/50 text-xs font-medium uppercase tracking-wider mb-1">Challenge:</p>
            <p className="text-white/70">
              Disparate systems &amp; data resulting in bottlenecks in quote-to-cash pipeline.
            </p>
          </div>
          <div>
            <p className="text-white/50 text-xs font-medium uppercase tracking-wider mb-1">Solution:</p>
            <p className="text-white/70">
              Unified datasets into Slack to accelerate analysis, proposal, and reconciliation.
            </p>
          </div>
          <div>
            <p className="accent text-xs font-semibold uppercase tracking-wider mb-1">Results:</p>
            <ul className="text-white/80 space-y-1 text-sm">
              <li className="flex items-start gap-1.5">
                <span className="text-[var(--nebula-teal-2)] mt-0.5">&#x2022;</span>
                <span>8x lift in Qualified Bookings</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-[var(--nebula-teal-2)] mt-0.5">&#x2022;</span>
                <span>34% decrease in Deal Cycle duration</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-[var(--nebula-teal-2)] mt-0.5">&#x2022;</span>
                <span>15+ hours/week/rep freed from admin</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Right: Slack #deal-desk mockup */}
        <div className="glass-embed p-3">
          <SlackMockup />
        </div>
      </div>

      {/* Bottom metrics strip */}
      <div className="flex items-center justify-around pt-1">
        <MetricBlock value="8x" label="Bookings" />
        <MetricBlock value="-34%" label="Cycle" />
        <MetricBlock value="15+" label="hrs/wk Saved" />
        <MetricBlock value="3" label="Systems Unified" />
      </div>
    </div>
  );
}
