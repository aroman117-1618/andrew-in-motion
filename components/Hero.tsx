import CTA from './CTA'

export default function Hero() {
  return (
    <section id="top" className="section pt-28 md:pt-36">
      <div className="max-w-3xl">
        <h1 className="h-heading text-5xl md:text-7xl font-semibold tracking-tight drop-shadow">
          Scale revenue and retention <span className="text-teal-300">without adding headcount</span>.
        </h1>
        <p className="mt-6 text-lg md:text-xl text-white/80">
          I design customer lifecycle systems and GTM automation that cut waste, increase velocity,
          and keep customers around.
        </p>
        <div className="mt-8 flex items-center gap-4">
          <CTA />
          <a className="btn-ghost" href="/#services">See how it works</a>
        </div>
      </div>
    </section>
  )
}
