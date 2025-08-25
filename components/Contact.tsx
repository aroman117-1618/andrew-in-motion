import CTA from './CTA'

export default function Contact() {
  return (
    <section id="contact" className="section">
      <div className="card p-6 md:p-10">
        <h2 className="h-heading text-3xl md:text-4xl font-semibold tracking-tight">Book a working session</h2>
        <p className="mt-3 text-white/80">
          Tell me what’s stuck. I’ll reply with a quick diagnostic or jump straight into a 30‑minute working session.
        </p>
        <div className="mt-6"><CTA className="w-full justify-center" /></div>
      </div>
    </section>
  )
}
