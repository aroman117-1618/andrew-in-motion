'use client';

import { LogoPill, MetricBlock, QuoteLine } from './ExampleHelpers';
import { getTestimonialForService } from '@/data/testimonials';

const GTM_QUOTE = getTestimonialForService('gtm');

function GtmIcon() {
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
      {/* Calendar/rhythm icon */}
      <rect x="14" y="16" width="20" height="18" rx="2" fill="rgba(59,157,139,0.2)" stroke="rgba(59,157,139,0.6)" strokeWidth="1.5" />
      <line x1="18" y1="20" x2="18" y2="22" stroke="rgba(59,157,139,0.8)" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="22" y1="20" x2="22" y2="22" stroke="rgba(59,157,139,0.8)" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="26" y1="20" x2="26" y2="22" stroke="rgba(59,157,139,0.8)" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="30" y1="20" x2="30" y2="22" stroke="rgba(59,157,139,0.8)" strokeWidth="1.5" strokeLinecap="round" />
      {/* Rhythm waves */}
      <path d="M 16 28 Q 20 26, 24 28 T 32 28" stroke="rgba(230,213,163,0.6)" strokeWidth="1.5" fill="none" strokeLinecap="round" />
    </svg>
  );
}

function GtmRhythmDashboard() {
  return (
    <div className="flex flex-col gap-2 h-full">
      {/* Calendar header */}
      <div className="flex items-center gap-2 px-2 py-1.5 border-b border-white/5">
        <span className="text-[11px] font-semibold text-white/70">Weekly Cadence</span>
        <span className="text-[9px] text-white/20 ml-auto">This Week</span>
      </div>

      {/* Calendar view */}
      <div className="bg-black/40 rounded-lg p-3 space-y-3 flex-1">
        {/* Week grid */}
        <div className="grid grid-cols-5 gap-1.5">
          {[
            { day: 'Mon', event: 'QBR', type: 'meeting' },
            { day: 'Tue', event: '', type: 'empty' },
            { day: 'Wed', event: 'Sync', type: 'sync' },
            { day: 'Thu', event: '', type: 'empty' },
            { day: 'Fri', event: 'Review', type: 'review' },
          ].map((item, i) => (
            <div key={i} className="text-center">
              <div className="text-[9px] text-white/50 mb-1.5">{item.day}</div>
              {item.event ? (
                <div className={`h-12 rounded-lg border flex flex-col items-center justify-center p-1 ${
                  item.type === 'meeting' 
                    ? 'bg-[var(--nebula-teal)]/20 border-[var(--nebula-teal)]/40' 
                    : item.type === 'sync'
                    ? 'bg-blue-500/15 border-blue-500/30'
                    : 'bg-purple-500/15 border-purple-500/30'
                }`}>
                  <div className={`text-[9px] font-semibold ${
                    item.type === 'meeting' ? 'text-[var(--nebula-teal-2)]' : 'text-white/80'
                  }`}>
                    {item.event}
                  </div>
                  <div className="text-[7px] text-white/40 mt-0.5">
                    {item.type === 'meeting' ? '9am' : item.type === 'sync' ? '2pm' : '4pm'}
                  </div>
                </div>
              ) : (
                <div className="h-12 rounded-lg border border-white/5 bg-white/5 flex items-center justify-center">
                  <span className="text-[8px] text-white/20">—</span>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Key metrics */}
        <div className="border-t border-white/5 pt-2.5">
          <div className="text-[9px] text-white/50 font-medium mb-2">This Week's Focus</div>
          <div className="space-y-1.5">
            {[
              { metric: 'Pipeline', value: '+12%', trend: 'up' },
              { metric: 'Cycle Time', value: '-18%', trend: 'down' },
              { metric: 'Health Score', value: '92%', trend: 'up' },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between">
                <span className="text-[9px] text-white/60">{item.metric}</span>
                <span className={`text-[9px] font-semibold ${
                  item.trend === 'up' ? 'text-emerald-400' : 'text-blue-400'
                }`}>
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function GtmExampleContent() {
  return (
    <div className="space-y-4 relative">
      <QuoteLine
        quote={GTM_QUOTE.quote}
        attribution={`${GTM_QUOTE.name}, ${GTM_QUOTE.title}`}
      />
      
      {/* Title row */}
      <div className="flex items-center gap-3 pr-[260px] md:pr-[300px]">
        <GtmIcon />
        <div>
          <h4 className="text-lg md:text-xl font-semibold text-white leading-tight">
            GTM Programming
          </h4>
          <p className="text-xs text-white/50 mt-0.5">Early-Stage SaaS &middot; Revenue Leadership</p>
        </div>
      </div>

      {/* Tech/integration logos strip */}
      <div className="flex flex-wrap items-center gap-2">
        <LogoPill label="Salesforce" />
        <LogoPill label="Gong" />
        <LogoPill label="Looker" />
        <LogoPill label="Slack" />
      </div>

      {/* Two-panel layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {/* Left: Challenge / Solution / Results */}
        <div className="glass-embed p-4 space-y-3 text-sm">
          <div>
            <p className="text-white/50 text-xs font-medium uppercase tracking-wider mb-1">Challenge:</p>
            <p className="text-white/70">
              No clear operating rhythm, misaligned priorities, and inconsistent execution across GTM teams.
            </p>
          </div>
          <div>
            <p className="text-white/50 text-xs font-medium uppercase tracking-wider mb-1">Solution:</p>
            <p className="text-white/70">
              Designed and implemented a structured GTM program with weekly cadences, AI-powered insights, and cross-functional rituals.
            </p>
          </div>
          <div>
            <p className="accent text-xs font-semibold uppercase tracking-wider mb-1">Results:</p>
            <ul className="text-white/80 space-y-1 text-sm">
              <li className="flex items-start gap-1.5">
                <span className="text-[var(--nebula-teal-2)] mt-0.5">&#x2022;</span>
                <span>+12% increase in Qualified Bookings</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-[var(--nebula-teal-2)] mt-0.5">&#x2022;</span>
                <span>18% reduction in Sales Cycle duration</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-[var(--nebula-teal-2)] mt-0.5">&#x2022;</span>
                <span>92% customer health score (up from 68%)</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Right: GTM Rhythm Dashboard */}
        <div className="glass-embed p-3">
          <GtmRhythmDashboard />
        </div>
      </div>

      {/* Bottom metrics strip */}
      <div className="flex items-center justify-around pt-1">
        <MetricBlock value="+12%" label="Bookings" />
        <MetricBlock value="-18%" label="Cycle" />
        <MetricBlock value="92%" label="Health" />
        <MetricBlock value="4" label="Systems" />
      </div>
    </div>
  );
}
