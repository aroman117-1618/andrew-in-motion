'use client';

export default function AthenaExampleContent() {
  return (
    <div className="text-sm md:text-base text-white/70 space-y-4">
      <p>
        Athena — AI strategic advisor for Hybrid Customer Success at Postman.
        Built on Cursor IDE, serving 15 CSMs across 562 managed accounts.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h4 className="font-semibold mb-1">What I Built:</h4>
          <ul className="list-disc list-inside space-y-1">
            <li>
              <strong>Skills layer (10 skills):</strong> Health checks, onboarding
              decks, success plans, territory reviews, outreach emails — grounded
              in SPIN Selling, Golden Path, and Dale Carnegie frameworks
            </li>
            <li>
              <strong>Data pipelines (5):</strong> Automated SFDC + Gong ingestion
              via Kepler API (2x/day comms, 3x/week snapshots), Looker usage
              metrics, Gainsight CTAs, and Slack activity
            </li>
            <li>
              <strong>Telemetry dashboard:</strong> FastAPI + Alpine.js — execution
              metrics, per-CSM adoption profiles, coaching signals, pipeline health
            </li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-1">By the Numbers:</h4>
          <ul className="list-disc list-inside space-y-1">
            <li>562 priority accounts synced automatically</li>
            <li>~27.7K API calls/week across split-schedule pipelines</li>
            <li>Zero CSM setup — one 5-minute install script</li>
          </ul>
        </div>
      </div>

      <p className="text-xs text-white/50">
        <strong className="text-white/70">Stack:</strong> Cursor IDE, Python,
        FastAPI, Alpine.js, Chart.js, Google Drive, macOS LaunchAgents, Kepler API
      </p>
    </div>
  );
}
