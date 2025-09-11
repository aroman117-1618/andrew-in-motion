'use client';

import CTA from './CTA';

export default function Contact() {
  return (
    <section id="contact" className="section text-center">
      <div
        className="
          mx-auto flex flex-col items-center gap-5
          rounded-2xl border
          px-6 md:px-10
          py-10 md:py-14
          bg-black/40 md:bg-black/20
          supports-[backdrop-filter]:backdrop-blur-[1.5px]
          md:supports-[backdrop-filter]:backdrop-blur-md
          border-white/15 md:border-white/10
          max-w-2xl
        "
      >
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
          Book a Working Session
        </h2>

        <p className="mt-2 max-w-xl text-base md:text-lg text-white/80 leading-relaxed">
          Stuck on <span className="text-[#3b9d8b] font-semibold">revenue</span> or <span className="text-[#3b9d8b] font-semibold">retention</span>? 
          In 45 minutes we’ll diagnose the issue, scope solutions, and set your next steps.
        </p>

        <div className="mt-6 w-full flex flex-col gap-3">
          {/* Primary CTA (Calendly, etc.) */}
          <CTA className="
    w-full justify-center
    bg-white text-black
    font-semibold
    transition
    hover:bg-[#3b9d8b] hover:text-white
    focus:outline-none focus:ring-2 focus:ring-[#3b9d8b]/60
  "/>

          {/* Optional secondary action */}
          <a
            href="mailto:hello@andrewinmotion.com"
            className="w-full px-6 py-3 rounded-full border border-white/25 bg-white/5 text-white font-semibold shadow-md backdrop-blur transition hover:bg-white/10 text-center"
          >
            Message Me Directly
          </a>
        </div>
      </div>
    </section>
  );
}
