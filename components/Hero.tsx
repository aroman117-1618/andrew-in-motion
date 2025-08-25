// components/Hero.tsx
import CTA from './CTA'

export default function Hero() {
  return (
    <section id="top" className="section text-center">
      <h1 className="h-heading text-5xl md:text-7xl font-semibold tracking-tight drop-shadow mt-3">
        GTM Programming · CS Advisory - Lifecycle Systems Automation
      </h1>
      <div className="mt-8 flex items-center justify-center gap-4">
        <CTA />
        <a className="btn-ghost" href="/#services">See services</a>
      </div>
    </section>
  )
}
