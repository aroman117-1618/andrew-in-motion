export default function Impact() {
  const track = [
    '• Nift (Seed): Built first GTM systems for early traction.',
    '• Robin (Series A/B/C): Implemented post‑sale Lifecycle systems, scaled automation, and lifted retention.',
    '• Klaviyo (Series D/IPO): Accelerated pipeline velocity, quote‑to‑cash automation, and elevated NRR.',
    '• Datadog (Public): FedGov & At‑Scale Lifecycle Automation.',
  ]
  const verified = [
    '• 8x lift in qualified bookings',
    '• 42% decrease in Closed Lost rates',
    '• +18 point increase in buyer confidence',
    '• 34% decrease in Deal cycle duration',
    '• +$3.6M ARR unlocked via expansion',
    '• 15+ hours/week/rep freed from Admin',
  ]

  return (
    <section id="impact" className="section">
      <div className="glass p-8 md:p-10">
        <h2 className="section-title">Impact & Results</h2>
        <p className="section-sub">Proof in performance.</p>

        <div className="mt-6 grid md:grid-cols-2 gap-6">
          <div className="glass-embed p-6 md:p-8">
            <div className="font-medium">Track Record:</div>
            <ul className="mt-2 space-y-2 text-white/85">
              {track.map(t => <li key={t}>{t}</li>)}
            </ul>
          </div>

          <div className="glass-embed p-6 md:p-8">
            <div className="font-medium">Verified Outcomes:</div>
            <ul className="mt-2 space-y-2 text-white/85">
              {verified.map(v => <li key={v}>{v}</li>)}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
