const QUOTES = [
  { q: 'Analytical and impact‑driven. Andrew’s reporting and approach influences not just CSMs—leaders learn from him too.', a: 'Allie Guertin — Senior Manager, Customer Success' },
  { q: 'Technical acumen + genuine customer care. A culture builder who quickly becomes the go‑to resource.', a: 'Jina Algarin — Director of Business Operations' },
  { q: 'Built a high‑trust, high‑performing team and broke down information silos with scalable process and enablement.', a: 'Omkar Waghe — Customer Success Engineer' },
  { q: 'Andrew brought clarity to complex change management—owning handoffs, dashboards, and process templates that raised the bar.', a: 'Rahat Rahman — Senior Strategy Manager' },
  { q: 'A mentor who creates space to grow. His guidance built confidence and accelerated my development.', a: 'Rob Allen Jr — Principal CSM' },
  { q: 'He bridges customer needs with operational rigor. The billing workflow improvements boosted productivity across teams.', a: 'Natalia Wyatt — Billing Ops Manager' },
  { q: 'Proactive and relentlessly improvement‑minded. His work reduced unnecessary effort and empowered partner teams.', a: 'Junya Kato — Collections Manager' },
  { q: 'Significantly improved Sales and CS alignment and collaboration… crucial for closing deals.', a: 'RaeAnne English — Sales Ops Manager' },
  { q: 'Andrew is always two steps ahead. His ability to anticipate customer and organizational challenges ensures teams stay aligned with future company initiatives while navigating today’s demands.', a: 'Amanda Twohig — Director of CS' },
  { q: 'Andrew brings clarity and structure to highly complex challenges. His leadership on Territory assignments, cross-functional coordination, and meticulous documentation not only resolved immediate issues but also built lasting process improvements that will benefit the entire org.', a: 'Deedee Fallon — VP of CS' },
]

function Row() {
  const items = [...QUOTES, ...QUOTES]      // duplicate for seamless loop
  return (
    <div className="t-track">
      {items.map((x,i)=>(
        <figure className="glass-embed p-6 t-card">
          <blockquote className="text-white/90">“{x.q}”</blockquote>
          <figcaption className="mt-3 text-sm text-white/60">— {x.a}</figcaption>
        </figure>
      ))}
    </div>
  )
}

export default function Testimonials(){
  return (
    <section id="testimonials" className="section">
      <h2 className="section-title">Testimonials</h2>
      <p className="section-sub">Endorsements from collaborators:</p>

      {/* full‑bleed carousel (no parent glass) */}
      <div className="mt-6 t-bleed">
        <div className="t-carousel">
          <Row />
        </div>
      </div>
    </section>
  )
}
