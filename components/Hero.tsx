import Link from 'next/link';

export default function Hero() {
  return (
    <section id="top" className="section text-center">
      <div
        className="
          mx-auto mt-4
          flex flex-col items-center gap-5
          rounded-2xl border
          px-4 md:px-8
          py-8 md:py-12
          bg-black/40 md:bg-black/20
          supports-[backdrop-filter]:backdrop-blur-[1.5px]
          md:supports-[backdrop-filter]:backdrop-blur-md
          border-white/15 md:border-white/10
          max-w-3xl
        "
      >
        {/* Headline */}
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight drop-shadow">
          Scalable Revenue Growth
        </h1>

        {/* Sub-headline */}
        <h2 className="mt-3 text-xl md:text-2xl font-medium text-white/90">
          Revenue &amp; Retention for SaaS Startups via Lifecycle Design &amp; Automation.
        </h2>

        {/* Tagline */}
        <p className="mt-5 max-w-2xl text-base md:text-lg text-white/70 leading-relaxed">
          Get bespoke GTM systems that boost bookings, shorten deal cycles, and free your team from admin.
        </p>

        {/* CTAs */}
        <div className="flex justify-center gap-4 mt-6">
          <Link
            href="#contact"
            className="px-6 py-3 rounded-full bg-white text-black font-semibold shadow-md hover:bg-white/90 transition"
          >
            Book a Session
          </Link>
          <Link
            href="#services"
            className="px-6 py-3 rounded-full border border-white/30 bg-black/40 text-white font-semibold shadow-md backdrop-blur hover:bg-black/60 transition"
          >
            See Services
          </Link>
        </div>
      </div>
    </section>
  );
}
