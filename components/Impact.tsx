export default function Impact() {
  const track = [
    <>
      • <strong>Nift (Seed)</strong>: Built first GTM systems for early traction.
    </>,
    <>
      • <strong>Robin (Series A/B/C)</strong>: Implemented post-sale Lifecycle systems, scaled automation, and lifted retention.
    </>,
    <>
      • <strong>Klaviyo (Series D/IPO)</strong>: Accelerated pipeline velocity, quote-to-cash automation, and elevated NRR.
    </>,
    <>
      • <strong>Datadog (Public)</strong>: FedGov & At-Scale Lifecycle Automation.
    </>,
  ]

  const verified = [
    <>
      • <strong>8x lift</strong> in qualified bookings
    </>,
    <>
      • <strong>42% decrease</strong> in Closed Lost rates
    </>,
    <>
      • <strong>+18 point increase</strong> in buyer confidence
    </>,
    <>
      • <strong>34% decrease</strong> in Deal cycle duration
    </>,
    <>
      • <strong>+$3.6M ARR unlocked</strong> via expansion
    </>,
    <>
      • <strong>15+ hours/week/rep</strong> freed from Admin
    </>,
  ]

  return (
    <section id="impact" className="section">
      <div className="glass p-8 md:p-10">
        <h2 className="section-title">Impact & Results</h2>
        <p className="section-sub font-medium leading-relaxed text-emerald-300 italic ">Turning strategy into measurable outcomes</p>

        <div className="mt-6 grid md:grid-cols-2 gap-6">
          <div className="glass-embed p-6 md:p-8">
            <div className="font-medium">Track Record:</div>
            <ul className="mt-2 space-y-2 text-white/85">
              {track.map((t, i) => (
                <li key={i}>{t}</li>
              ))}
            </ul>
          </div>

          <div className="glass-embed p-6 md:p-8">
            <div className="font-medium">Verified Outcomes:</div>
            <ul className="mt-2 space-y-2 text-white/85">
              {verified.map((v, i) => (
                <li key={i}>{v}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
