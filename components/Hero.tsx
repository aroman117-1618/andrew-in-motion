// components/Hero.tsx
import CTA from './CTA'

export default function Hero() {
  return (
    <section id="top" className="section text-center">
      <h1 className="h-heading text-5xl md:text-7xl font-semibold tracking-tight drop-shadow mt-3">
        Scalable Growth
      </h1>
      <p className="section-sub font-medium leading-relaxed text-brand-emerald italic">
          Empowering growth-focused teams to move faster, retain more customers, and scale smarter with lifecycle design + automation.
        </p>
      <div className="mt-8 flex items-center justify-center gap-4">
        <CTA />
        <a className="btn-ghost" href="/#services">See services</a>
      </div>
    </section>
  )
}
