// components/Hero.tsx
import CTA from './CTA'

export default function Hero() {
  return (
    <section id="top" className="section text-center">
      <h1 className="h-heading text-5xl md:text-7xl font-semibold tracking-tight drop-shadow mt-3">
        Scalable Growth
      </h1>

      {/* ✅ compact glass “chip” on mobile; fuller glass on desktop */}
      <div
        className="
          mx-auto mt-4
          inline-flex flex-col md:flex-row items-center gap-2 md:gap-4
          rounded-2xl border
          px-3 md:px-6
          py-1.5 md:py-3
          bg-black/40 md:bg-black/20
          supports-[backdrop-filter]:backdrop-blur-[1.5px]
          md:supports-[backdrop-filter]:backdrop-blur-md
          border-white/15 md:border-white/10
        "
      >
        <p className="section-sub font-medium leading-relaxed text-brand-emerald italic text-pretty">
          Empowering growth-focused teams to move faster, retain more customers, and scale smarter with lifecycle design + automation.
        </p>

        <div className="flex items-center justify-center gap-3">
          <CTA />
          <a className="btn-ghost" href="/#services">See services</a>
        </div>
      </div>
    </section>
  )
}