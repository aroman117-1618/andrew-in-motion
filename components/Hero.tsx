'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section id="top" className="section text-center">
      <motion.h1
        initial={{ opacity: 0, rotateY: -8 }}
        animate={{ opacity: 1, rotateY: 0 }}
        transition={{ duration: 0.45, ease: 'easeOut' }}
        className="text-5xl md:text-7xl font-bold tracking-tight drop-shadow mx-auto max-w-none md:whitespace-nowrap"
      >
        Scalable Revenue Growth
      </motion.h1>

      <motion.div
        initial="hidden"
        animate="show"
        variants={{
          hidden: { opacity: 1 },
          show: { transition: { staggerChildren: 0.12 } }
        }}
        className="mx-auto mt-6 flex flex-col items-center gap-5 rounded-2xl border px-4 md:px-8 py-10 md:py-14 bg-black/40 md:bg-black/20 supports-[backdrop-filter]:backdrop-blur-[1.5px] md:supports-[backdrop-filter]:backdrop-blur-md border-white/15 md:border-white/10 max-w-3xl"
      >
        <motion.h2
          variants={{ hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0 } }}
          transition={{ duration: 0.38, ease: 'easeOut' }}
          className="text-[1.25rem] md:text-[1.6rem] font-semibold text-white/95 leading-snug"
        >
          Revenue &amp; Retention for <span className="text-[#3b9d8b] font-bold">Early-Stage SaaS</span> Startups via <span className="text-[#3b9d8b] font-bold">Lifecycle Design</span> &amp; <span className="text-[#3b9d8b] font-bold">Automation</span>.
        </motion.h2>

        <motion.p
          variants={{ hidden: { opacity: 0, y: 22 }, show: { opacity: 1, y: 0 } }}
          transition={{ duration: 0.42, ease: 'easeOut' }}
          className="mt-1 max-w-2xl text-base md:text-lg text-white/80 leading-relaxed"
        >
          Get bespoke GTM systems that boost bookings, shorten <span className="text-[#3b9d8b] font-semibold">deal cycles</span>, and free your team from admin.
        </motion.p>

        <motion.div
          variants={{ hidden: { opacity: 0, scale: 0.96 }, show: { opacity: 1, scale: 1 } }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          className="flex justify-center gap-4 mt-6 flex-col sm:flex-row w-full sm:w-auto"
        >
          <Link
            href="#contact"
            className="px-6 py-3 rounded-full bg-white text-black font-semibold shadow-md transition hover:bg-sky-200 focus:outline-none focus:ring-2 focus:ring-sky-300/60 text-center"
          >
            Book a Session
          </Link>
          <Link
            href="#services"
            className="px-6 py-3 rounded-full border border-white/25 bg-white/5 text-white font-semibold shadow-md backdrop-blur transition hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/40 text-center"
          >
            See Services
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
