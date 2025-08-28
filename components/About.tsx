export default function About() {
  return (
    <section id="about" className="section">
      <div className="glass p-8 md:p-10">
        <h2 className="section-title">About Me</h2>
        <p className="section-sub font-medium leading-relaxed text-emerald-300 italic">
          Empowering growth‑focused teams to boost revenue and retention through GTM coaching, lifecycle design & automation.
        </p>

        <div className="mt-6 grid md:grid-cols-2 gap-8 text-white/85">
          <div>
            <p className="text-lg">
              Started in fine dining, where success meant collaboration, precision, and adaptability. I bring that ethos to tech – coaching GTM teams and engineering systems, across seed‑state startups to public enterprises, that drive revenue, evolve teams, and surface real customer signals.
            </p>
          </div>

          <div>
            <h3 className="h-heading text-xl font-semibold">Core Competencies:</h3>
            <ul className="mt-3 space-y-2">
              <li>• <b>Lifecycle Design:</b> programming that drives expansion &amp; retention from pre‑sale through renewal.</li>
              <li>• <b>System Automation:</b> workflows that accelerate revenue, cut wasted hours, and raise data quality.</li>
              <li>• <b>Data‑driven Storytelling:</b> turn signals into strategy that scales revenue.</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
