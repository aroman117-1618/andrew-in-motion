// components/Hero.tsx
import CTA from './CTA'

export default function Hero() {
  return (
    <section id="top" className="section pt-28 md:pt-36">
      <p className="text-sm uppercase tracking-wider text-white/70">
        GTM Programming · CS Advisory - Lifecycle Systems Automation
      </p>
      <h1 className="h-heading text-5xl md:text-7xl font-semibold tracking-tight drop-shadow mt-3">
        I help growth focused teams scale revenue and retain customers through GTM coaching, lifecycle design, and systems automation.
      </h1>
      <div className="mt-8 flex items-center gap-4">
        <CTA />
        <a className="btn-ghost" href="/#services">See services</a>
      </div>
    </section>
  )
}
