export default function CoreCompetencies() {
  const bullets = [
    'Lifecycle Design: programming that drives expansion & retention from pre-sale through renewal.',
    'System Automation: workflows that accelerate revenue, cut wasted hours, and raise data quality.',
    'Data-driven Storytelling: turn signals into strategy that scales growth rate.',
  ]
  return (
    <section id="competencies" className="section">
      <h2 className="h-heading text-3xl md:text-4xl font-semibold tracking-tight">Core Competencies</h2>
      <ul className="mt-4 space-y-2 text-white/85">
        {bullets.map(b => <li key={b}>• {b}</li>)}
      </ul>
    </section>
  )
}
