import CTA from './CTA'

export default function Hero() {
  return (
    <section id="top" className="section text-center">
      <div
        className="
          mx-auto mt-4
          flex flex-col items-center gap-4
          rounded-2xl border
          px-4 md:px-8
          py-6 md:py-10
          bg-black/40 md:bg-black/20
          supports-[backdrop-filter]:backdrop-blur-[1.5px]
          md:supports-[backdrop-filter]:backdrop-blur-md
          border-white/15 md:border-white/10
          max-w-3xl
        "
      >
        <h1 className="h-heading text-5xl md:text-7xl font-semibold tracking-tight drop-shadow">
          Scalable Growth
        </h1>

        <p className="section-sub font-medium leading-relaxed text-brand-emerald italic text-pretty">
          Empowering growth-focused teams to move faster, retain more customers, and scale smarter with lifecycle design + automation.
        </p>

        <div className="flex justify-center gap-3 mt-4">
          <CTA />
          <a className="btn-ghost" href="/#services">
            See services
          </a>
        </div>
      </div>
    </section>
  )
}
