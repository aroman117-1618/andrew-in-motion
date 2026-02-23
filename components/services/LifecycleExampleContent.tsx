'use client';

import { LogoPill, MetricBlock, QuoteLine } from './ExampleHelpers';

function LifecycleIcon() {
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
      {/* Clockwise arrows forming a cycle */}
      <path
        d="M16 20 A10 10 0 0 1 32 20"
        stroke="rgba(59,157,139,0.8)"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
      />
      <path d="M31 17 L32 20 L29 20" fill="rgba(59,157,139,0.8)" />
      <path
        d="M32 28 A10 10 0 0 1 16 28"
        stroke="rgba(59,157,139,0.8)"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
      />
      <path d="M17 31 L16 28 L19 28" fill="rgba(59,157,139,0.8)" />
    </svg>
  );
}

function ProductDevelopmentWorkflow() {
  return (
    <div className="flex flex-col gap-2 h-full">
      {/* Jira board header */}
      <div className="flex items-center gap-2 px-2 py-1.5 border-b border-white/5">
        <span className="text-[11px] font-semibold text-white/70">Jira Board</span>
        <span className="text-[9px] text-white/20 ml-auto">Product Loop</span>
      </div>

      {/* Simplified board view */}
      <div className="bg-black/40 rounded-lg p-3 space-y-2.5 flex-1">
        {/* Column headers */}
        <div className="grid grid-cols-4 gap-2 mb-3">
          {['To Do', 'In Progress', 'Review', 'Done'].map((col, i) => (
            <div key={col} className="text-center pb-2 border-b border-white/10">
              <div className="text-[10px] text-white/70 font-semibold">{col}</div>
              <div className="text-[9px] text-white/40 mt-0.5">{i === 0 ? '2' : i === 1 ? '1' : i === 2 ? '1' : '3'}</div>
            </div>
          ))}
        </div>

        {/* Card examples */}
        <div className="space-y-2">
          {/* To Do card */}
          <div className="bg-white/5 rounded border border-white/10 p-2">
            <div className="flex items-start justify-between mb-1">
              <span className="text-[10px] font-semibold text-white/80">CS-1234</span>
              <span className="text-[8px] text-white/40">High</span>
            </div>
            <p className="text-[9px] text-white/60 leading-tight">Customer feedback: Feature X needed</p>
            <div className="flex items-center gap-1 mt-1.5">
              <span className="w-4 h-4 rounded bg-[var(--nebula-teal)]/30 border border-[var(--nebula-teal)]/50 flex items-center justify-center text-[7px]">CS</span>
              <span className="text-[8px] text-white/40">→</span>
              <span className="w-4 h-4 rounded bg-blue-500/30 border border-blue-500/50 flex items-center justify-center text-[7px]">Dev</span>
            </div>
          </div>

          {/* In Progress card */}
          <div className="bg-[var(--nebula-teal)]/10 rounded border border-[var(--nebula-teal)]/30 p-2">
            <div className="flex items-start justify-between mb-1">
              <span className="text-[10px] font-semibold text-white/90">CS-1235</span>
              <span className="text-[8px] text-emerald-400/70">In Dev</span>
            </div>
            <p className="text-[9px] text-white/70 leading-tight">Implementing Feature Y</p>
            <div className="flex items-center gap-1 mt-1.5">
              <span className="w-4 h-4 rounded bg-blue-500/40 border border-blue-500/60 flex items-center justify-center text-[7px]">Dev</span>
              <span className="text-[8px] text-white/50">→</span>
              <span className="w-4 h-4 rounded bg-purple-500/30 border border-purple-500/50 flex items-center justify-center text-[7px]">QA</span>
            </div>
          </div>

          {/* Done card */}
          <div className="bg-emerald-500/10 rounded border border-emerald-500/30 p-2 opacity-75">
            <div className="flex items-start justify-between mb-1">
              <span className="text-[10px] font-semibold text-white/80">CS-1233</span>
              <span className="text-[8px] text-emerald-400/80">✓ Shipped</span>
            </div>
            <p className="text-[9px] text-white/60 leading-tight">Feature Z deployed</p>
            <div className="flex items-center gap-1 mt-1.5">
              <span className="text-[8px] text-emerald-400/70">Live in production</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function LifecycleExampleContent() {
  return (
    <div className="space-y-4 relative">
      <QuoteLine
        quote="Andrew unites product, revenue, and customer success — strengthening retention, fueling growth, and improving systems that scale across the org."
        attribution="Director of Customer Success, Datadog/Robin"
      />
      
      {/* Title row */}
      <div className="flex items-center gap-3 pr-[260px] md:pr-[300px]">
        <LifecycleIcon />
        <div>
          <h4 className="text-lg md:text-xl font-semibold text-white leading-tight">
            Lifecycle Automation
          </h4>
          <p className="text-xs text-white/50 mt-0.5">Datadog &middot; Robin &middot; Customer Success</p>
        </div>
      </div>

      {/* Tech/integration logos strip */}
      <div className="flex flex-wrap items-center gap-2">
        <LogoPill label="Salesforce" />
        <LogoPill label="Slack" />
        <LogoPill label="Confluence" />
        <LogoPill label="Intercom" />
        <LogoPill label="Jira" />
      </div>

      {/* Two-panel layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {/* Left: Challenge / Solution / Results */}
        <div className="glass-embed p-4 space-y-3 text-sm">
          <div>
            <p className="text-white/50 text-xs font-medium uppercase tracking-wider mb-1">Challenge:</p>
            <p className="text-white/70">
              23% uptick in Contracted Churn related to misalignment with Product Development.
            </p>
          </div>
          <div>
            <p className="text-white/50 text-xs font-medium uppercase tracking-wider mb-1">Solution:</p>
            <p className="text-white/70">
              Architected a full Product Development Loop across GTM stakeholders and systems.
            </p>
          </div>
          <div>
            <p className="accent text-xs font-semibold uppercase tracking-wider mb-1">Results:</p>
            <ul className="text-white/80 space-y-1 text-sm">
              <li className="flex items-start gap-1.5">
                <span className="text-[var(--nebula-teal-2)] mt-0.5">&#x2022;</span>
                <span>+18% increase in aCLV</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-[var(--nebula-teal-2)] mt-0.5">&#x2022;</span>
                <span>+$3.6M in Net New Revenue/Quarter</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Right: Product Development Workflow */}
        <div className="glass-embed p-3">
          <ProductDevelopmentWorkflow />
        </div>
      </div>

      {/* Bottom metrics strip */}
      <div className="flex items-center justify-around pt-1">
        <MetricBlock value="+18%" label="aCLV" />
        <MetricBlock value="$3.6M" label="Rev/Qtr" />
        <MetricBlock value="5" label="Integrations" />
        <MetricBlock value="0" label="Manual Steps" />
      </div>
    </div>
  );
}
