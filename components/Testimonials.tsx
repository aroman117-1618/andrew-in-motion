const QUOTES = [
  { q: 'Analytical and impact‑driven. Andrew’s reporting and approach influences not just CSMs—leaders learn from him too.', a: 'Allie Guertin - Senior Manager, Customer Success' },
  { q: 'Technical acumen + genuine customer care. A culture builder who quickly becomes the go‑to resource.', a: 'Jina Algarin - Director of Business Operations' },
  { q: 'Built a high‑trust, high‑performing team and broke down information silos with scalable process and enablement.', a: 'Omkar Waghe - Customer Success Engineer' },
  { q: 'Andrew brought clarity to complex change management—owning handoffs, dashboards, and process templates that simplified the work and raised the bar.', a: 'Rahat Rahman - Senior Strategy Manager' },
  { q: 'A mentor who creates space to grow. His guidance built confidence and accelerated my development.', a: 'Rob Allen Jr - Principal Customer Success Manager' },
  { q: 'He bridges customer needs with operational rigor. The billing workflow improvements boosted productivity across teams.', a: 'Natalia Wyatt - Billing Operations Manager' },
  { q: 'Proactive and relentlessly improvement‑minded. His work reduced unnecessary effort and empowered partner teams.', a: 'Junya Kato - Collections Manager' },
  { q: 'Significantly improved Sales and CS alignment and collaboration… crucial for closing deals.', a: 'RaeAnne English - Sales Operations Manager' },
]

function Row({ start=0 }: { start?: number }) {
  const items = [...QUOTES, ...QUOTES].slice(start, start + QUOTES.length * 2)
  return (
    <div className="t-track">
      {items.map((x, i) => (
        <figure key={i} className="glass-embed p-6 min-w-[340px] max-w-[420px]">
          <blockquote className="text-white/90">“{x.q}”</blockquote>
          <figcaption className="mt-3 text-sm text-white/60">— {x.a}</figcaption>
        </figure>
      ))}
    </div>
  )
}

export default function Testimonials() {
  return (
    <section id="testimonials" className="section">
      <h2 className="section-title">Testimonials</h2>
      <p className="section-sub">Endorsements from collaborators:</p>
      <div className="mt-6 glass p-4">
        <div className="t-carousel">
          <Row />
        </div>
      </div>
    </section>
  )
}
