import CTA from './CTA'

export default function Services(){
  return (
    <section id="services" className="section">
      <div className="glass p-8 md:p-10">
        <h2 className="section-title">Services</h2>
        <p className="section-sub">Two ways to engage, endless ways to deliver. Simple hourly pricing + tailored scopes to fit your growth stage.</p>

        <div className="mt-8 grid md:grid-cols-2 gap-6">
          {/* Card 1 */}
          <div className="glass-embed p-6 md:p-8">
            <h3 className="h-heading text-xl font-semibold">Fractional GTM Leadership</h3>
            <p className="mt-2 text-white/85">Ongoing, high‑leverage growth focused leadership, without the full‑time headcount</p>

            <div className="mt-4 grid md:grid-cols-2 gap-6">
              <div>
                <div className="font-medium">Expected Results:</div>
                <ul className="mt-2 space-y-2 text-white/85">
                  <li>• Immediate lift in qualified bookings</li>
                  <li>• Increased pipeline velocity and ACV</li>
                  <li>• Predictable, scalable lifecycle operations</li>
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
          </div>

          {/* Card 2 */}
          <div className="glass-embed p-6 md:p-8">
            <h3 className="h-heading text-xl font-semibold">RevOps & Lifecycle Automation</h3>
            <p className="mt-2 text-white/85">Design, implement, and optimize the systems your team relies on to scale</p>

            <div className="mt-4 grid md:grid-cols-2 gap-6">
              <div>
                <div className="font-medium">Expected Results:</div>
                <ul className="mt-2 space-y-2 text-white/85">
                  <li>• 10–20 hours/rep/week saved</li>
                  <li>• SLA Compliance & customer satisfaction gains</li>
                  <li>• Real‑time data for faster decision‑making</li>
                </ul>
              </div>
              <div>
                <div className="font-medium">What I Deliver:</div>
                <ul className="mt-2 space-y-2 text-white/85">
                  <li>• End-to-end GTM architecture</li>
                  <li>• Cross-system automations for data integrity and reporting</li>
                  <li>• AI Integration across GTM tooling & workflows</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
