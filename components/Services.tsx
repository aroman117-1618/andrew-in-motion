import CTA from './CTA'

export default function Services() {
  return (
    <section id="services" className="section">
      <h2 className="h-heading text-3xl md:text-4xl font-semibold tracking-tight">Services</h2>
      <p className="mt-3 text-white/80">Two ways to engage, endless ways to deliver.</p>
      <p className="text-white/80">Simple hourly pricing + tailored scopes to fit your growth stage.</p>

      {/* Service 1 */}
      <div className="card p-6 md:p-8 mt-8">
        <h3 className="h-heading text-xl font-semibold">1. Fractional Customer Success Leadership</h3>
        <p className="mt-2 text-white/85">
          Ongoing, high‑leverage retention focused leadership, without the full‑time headcount.
        </p>

        <div className="mt-5 grid md:grid-cols-2 gap-6">
          <div>
            <div className="font-medium">Expected Results:</div>
            <ul className="mt-2 space-y-2 text-white/85">
              <li>• Immediate lift in retention & NRR</li>
              <li>• More confident, higher‑performing CS teams</li>
              <li>• Predictable, scalable customer lifecycle operations</li>
            </ul>
          </div>
          <div>
            <div className="font-medium">What I Deliver:</div>
            <ul className="mt-2 space-y-2 text-white/85">
              <li>• Strategic planning & programming support</li>
              <li>• GTM coaching & playbook development</li>
              <li>• Renewal & expansion programming</li>
            </ul>
          </div>
        </div>

        <div className="mt-6"><CTA /></div>
      </div>

      {/* Service 2 */}
      <div className="card p-6 md:p-8 mt-6">
        <h3 className="h-heading text-xl font-semibold">2. GTM Lifecycle & RevOps Automation:</h3>
        <p className="mt-2 text-white/85">
          Design, implement, and optimize the systems your team relies on to scale.
        </p>

        <div className="mt-5 grid md:grid-cols-2 gap-6">
          <div>
            <div className="font-medium">Expected Results:</div>
            <ul className="mt-2 space-y-2 text-white/85">
              <li>• 10–20 hours saved per GTM rep per week</li>
              <li>• SLA compliance + customer satisfaction gains</li>
              <li>• Real‑time data for faster decision‑making</li>
            </ul>
          </div>
          <div>
            <div className="font-medium">What I Deliver:</div>
            <ul className="mt-2 space-y-2 text-white/85">
              <li>• End‑to‑end GTM architecture</li>
              <li>• Cross-system automations for data integrity and reporting</li>
              <li>• AI-integration across GTM tooling & workflows</li>
            </ul>
          </div>
        </div>

        <div className="mt-6"><CTA /></div>
      </div>
    </section>
  )
}
