'use client';

import Link from 'next/link';

export default function Hero() {
  return (
    <section id="top" className="section text-center">
      {/* Headline OUTSIDE the glass; single line on md+ */}
      <h1
        className="
          text-5xl md:text-7xl font-bold tracking-tight drop-shadow
          mx-auto max-w-none md:whitespace-nowrap
        "
      >
        Scalable Revenue Growth
      </h1>

      {/* Glass panel with sub-headline, tagline, and CTAs */}
      <div
        className="
          mx-auto mt-5
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
        {/* Sub-headline: slightly larger + higher contrast */}
        <h2 className="text-[1.25rem] md:text-[1.5rem] font-semibold text-white/95 leading-snug">
          Revenue &amp; Retention for SaaS Startups via Lifecycle Design &amp; Automation.
        </h2>

        {/* Tagline: clearer weight/contrast without overpowering */}
        <p className="mt-1 max-w-2xl text-base md:text-lg text-white/80 leading-relaxed">
          Get bespoke GTM systems that boost bookings, shorten deal cycles, and free your team from admin.
        </p>

        {/* CTAs */}
        <div className="flex justify-center gap-4 mt-6">
          {/* Primary CTA — light blue hover that complements your orb */}
          <Link
            href="#contact"
            className="
              px-6 py-3 rounded-full
              bg-white text-black
              font-semibold shadow-md
              transition
              hover:bg-cyan-200
              focus:outline-none focus:ring-2 focus:ring-sky-300/60
            "
            aria-label="Book a Session"
          >
            Book a Session
          </Link>

          {/* Secondary CTA — subtle gray variation on hover */}
          <Link
            href="#services"
            className="
              px-6 py-3 rounded-full
              border border-white/25
              bg-white/5 text-white
              font-semibold shadow-md backdrop-blur
              transition
              hover:bg-white/50
              focus:outline-none focus:ring-2 focus:ring-white/40
            "
            aria-label="See Services"
          >
            See Services
          </Link>
        </div>
      </div>
    </section>
  );
}
