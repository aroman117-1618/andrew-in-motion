import React, { useEffect } from "react";
import "./index.css";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Mail,
  Github,
  Linkedin,
  FileText,
  Gift,
  Calendar,
  LineChart,
  Headset,
  Info,
  TrendingUp,
} from "lucide-react";

import { Card, CardContent } from "./components/ui/card";
import { Button } from "./components/ui/button";
import InteractiveDrift from "./components/InteractiveDrift.jsx";

/* ──────────────────────────────────────────────────────────────
   Favicon helper – swaps tab icon to your mark at runtime
   ────────────────────────────────────────────────────────────── */
const useFavicon = (svgHref = "/logo-mark.svg", png32 = "/logo-32.png") => {
  useEffect(() => {
    const upsert = (rel, href, attrs = {}) => {
      let link = document.querySelector(
        `head link[rel="${rel}"][data-ai=true]${attrs.sizes ? `[sizes="${attrs.sizes}"]` : ""}`
      );
      if (!link) {
        link = document.createElement("link");
        link.setAttribute("rel", rel);
        link.setAttribute("data-ai", "true");
        document.head.appendChild(link);
      }
      Object.entries(attrs).forEach(([k, v]) => link.setAttribute(k, v));
      link.setAttribute("href", href);
    };
    upsert("icon", svgHref, { type: "image/svg+xml" });
    upsert("icon", png32, { sizes: "32x32", type: "image/png" });
  }, [svgHref, png32]);
};

// External company links
const COMPANY_LINKS = {
  nift: "https://www.gonift.com",
  robin: "https://robinpowered.com",
  datadog: "https://www.datadoghq.com",
  klaviyo: "https://www.klaviyo.com",
};

export default function App() {
  useFavicon("/logo-mark.svg", "/logo-32.png");

  return (
    <div className="relative min-h-screen bg-[#141414] text-zinc-100 selection:bg-[#3B6255] selection:text-white">
      <InteractiveDrift
        ribbons={12}
        thickness={2.0}
        speed={0.18}
        backgroundFade={0.06}
        palette={[
          [59, 98, 85], // #3B6255
          [17, 41, 23], // #112917
          [8, 38, 31],
          [6, 74, 99],
          [28, 139, 102],
          [155, 194, 60],
          [207, 226, 142],
        ]}
      />
      <div className="relative z-10">
        <SiteNav />
        <main className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Hero />
          <About />
          <Services />
          <Impact />
          <CTA />
        </main>
        <SiteFooter />
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────
   NAV — {logo}ndrew Lonati with tighter spacing
   ────────────────────────────────────────────────────────────── */
function SiteNav() {
  return (
    <div className="sticky top-0 z-20 border-b border-zinc-800/80 bg-[#141414]/80 backdrop-blur supports-[backdrop-filter]:bg-[#141414]/60">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <a href="#top" className="flex items-center font-semibold tracking-tight group">
          {/* Tighter spacing: remove big gap, nudge text slightly left */}
          <motion.img
            src="/logo-mark.svg"
            onError={(e) => { e.currentTarget.src = "/logo-32.png"; }}
            alt="Andrew in Motion logo"
            className="h-9 w-9 select-none"
            initial={{ rotate: 0, scale: 1, opacity: 0.95 }}
            whileHover={{ rotate: -5, scale: 1.08, opacity: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
          />
          <span className="ml-1 -ml-0.5 text-white text-lg sm:text-xl leading-none">
            ndrew Lonati
          </span>
        </a>

        <nav className="hidden gap-8 text-base sm:flex">
          <a href="#about" className="text-zinc-300 hover:text-white">About</a>
          <a href="#services" className="text-zinc-300 hover:text-white">Services</a>
          <a href="#impact" className="text-zinc-300 hover:text-white">Impact</a>
          <a href="#contact" className="text-zinc-300 hover:text-white">Contact</a>
        </nav>

        <a href="#contact" className="hidden sm:block">
          <button className="rounded-xl px-4 py-2 text-base bg-[#3B6255] hover:bg-[#112917] text-white">
            Get in touch
          </button>
        </a>

        <a href="#contact" className="sm:hidden">
          <button className="rounded-lg px-3 py-2 text-sm bg-[#3B6255] hover:bg-[#112917] text-white">
            Contact
          </button>
        </a>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────
   HERO
   ────────────────────────────────────────────────────────────── */
function Hero() {
  return (
    <section id="top" className="relative overflow-hidden py-20 sm:py-28">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 mx-auto max-w-3xl text-center"
      >
        <p className="mb-4 text-xs uppercase tracking-[0.25em] text-zinc-400">
          CS Advisory • GTM Automation • Lifecycle Systems
        </p>
        <h1 className="mb-4 text-3xl font-semibold leading-tight sm:text-5xl">
          Scale your growth <span className="text-[#3B6255]">without scaling headcount</span>
        </h1>
        <p className="mx-auto mb-8 max-w-2xl text-zinc-300">
          Partnering with leaders to remove bottlenecks, create customer‑centric systems, and turn signal into sustainable growth.
        </p>
        <div className="flex items-center justify-center gap-3">
          <a href="#services">
            <Button className="bg-[#3B6255] hover:bg-[#112917] text-white">
              Explore Services <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </a>
          <a href="#about">
            <Button className="border-zinc-700 text-zinc-200 hover:bg-zinc-800">
              Learn More
            </Button>
          </a>
        </div>
      </motion.div>
    </section>
  );
}

/* ──────────────────────────────────────────────────────────────
   SHARED SECTION HEADER
   ────────────────────────────────────────────────────────────── */
function SectionHeader({ kicker, title, subtitle, Icon }) {
  return (
    <div className="relative mb-10">
      {Icon ? (
        <>
          <div className="pointer-events-none absolute -top-16 -left-16 h-56 w-56 sm:h-64 sm:w-64 rounded-full bg-[#3B6255]/20 blur-3xl" />
          <Icon
            className="pointer-events-none absolute -top-14 -left-14 h-44 w-44 sm:h-52 sm:w-52 text-[#3B6255]/30"
            aria-hidden
          />
        </>
      ) : null}
      <p className="text-xs uppercase tracking-[0.25em] text-zinc-400">{kicker}</p>
      <h2 className="mt-2 text-2xl font-semibold sm:text-3xl text-white drop-shadow-md">{title}</h2>
      {subtitle && <p className="mt-3 max-w-3xl text-zinc-300">{subtitle}</p>}
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────
   ABOUT
   ────────────────────────────────────────────────────────────── */
function About() {
  return (
    <section id="about" className="py-16 sm:py-24">
      <SectionHeader
        kicker="About"
        title="Collaboration, precision, and adaptability"
        subtitle="From the kitchen to the boardroom: hands‑on service instincts + data‑driven rigor to design systems that move revenue."
        Icon={Info}
      />

      <div className="grid gap-6 md:grid-cols-2">
        {/* Operator Origin */}
        <Card className="group relative overflow-hidden border-zinc-800 bg-zinc-900/60">
          <div className="pointer-events-none absolute -inset-1 -z-10 rounded-2xl bg-gradient-to-br from-[#3B6255]/15 via-transparent to-[#112917]/15 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100" />
          <CardContent>
            <h3 className="text-lg font-semibold">Operator Origin</h3>
            <p className="mt-2 text-base text-zinc-300 leading-relaxed">
              I started in kitchens, where survival meant collaboration, precision, and adaptability. Those values shaped my approach in tech — first in value‑based discovery and negotiation, then in building systems that surface real customer signal and scale insights across teams.
            </p>

            <div className="mt-5 rounded-xl border border-zinc-800 p-4">
              <ul className="list-disc marker:text-[#3B6255] space-y-1 pl-5 text-base text-zinc-200">
                <li>Turning customer data into proactive growth strategies</li>
                <li>Building systems that turn customer signals into scalable action</li>
                <li>Translating insights into measurable revenue impact</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Track Record — aligned rows with icons + links */}
        <Card className="group relative overflow-hidden border-zinc-800 bg-zinc-900/60">
          <div className="pointer-events-none absolute -inset-1 -z-10 rounded-2xl bg-gradient-to-br from-[#3B6255]/15 via-transparent to-[#112917]/15 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100" />
          <CardContent>
            <h3 className="text-lg font-semibold">Track Record</h3>
            <p className="mt-2 text-base text-zinc-300 leading-relaxed">
              Led the full customer lifecycle — pre‑sale through renewal — with a focus on scalable automation and cross‑functional alignment.
            </p>

            <div className="mt-5 rounded-xl border border-zinc-800 p-4">
              <ul className="space-y-2 text-base leading-relaxed text-zinc-200">
                <li className="grid grid-cols-[auto,1fr] items-start gap-x-3">
                  <a
                    href={COMPANY_LINKS.nift}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="col-start-1 row-start-1 flex items-center gap-2 hover:text-white"
                  >
                    <Gift className="h-4 w-4 text-[#3B6255]" />
                    <span className="text-[#3B6255] font-semibold underline-offset-4 hover:underline">Nift</span>
                  </a>
                  <span className="col-start-2 row-start-1">— Early‑stage growth & foundational GTM build‑out.</span>
                </li>

                <li className="grid grid-cols-[auto,1fr] items-start gap-x-3">
                  <a
                    href={COMPANY_LINKS.robin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="col-start-1 row-start-1 flex items-center gap-2 hover:text-white"
                  >
                    <Calendar className="h-4 w-4 text-[#3B6255]" />
                    <span className="text-[#3B6255] font-semibold underline-offset-4 hover:underline">Robin</span>
                  </a>
                  <span className="col-start-2 row-start-1">— Series A/B scaling, automation design, retention systems.</span>
                </li>

                <li className="grid grid-cols-[auto,1fr] items-start gap-x-3">
                  <a
                    href={COMPANY_LINKS.datadog}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="col-start-1 row-start-1 flex items-center gap-2 hover:text-white"
                  >
                    <LineChart className="h-4 w-4 text-[#3B6255]" />
                    <span className="text-[#3B6255] font-semibold underline-offset-4 hover:underline">Datadog</span>
                  </a>
                  <span className="col-start-2 row-start-1">— At‑scale & FedGov GTM lifecycle automation.</span>
                </li>

                <li className="grid grid-cols-[auto,1fr] items-start gap-x-3">
                  <a
                    href={COMPANY_LINKS.klaviyo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="col-start-1 row-start-1 flex items-center gap-2 hover:text-white"
                  >
                    <Mail className="h-4 w-4 text-[#3B6255]" />
                    <span className="text-[#3B6255] font-semibold underline-offset-4 hover:underline">Klaviyo</span>
                  </a>
                  <span className="col-start-2 row-start-1">— RevOps automations; contract‑to‑cash; ROI reporting.</span>
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────────────────────
   SERVICES
   ────────────────────────────────────────────────────────────── */
function Services() {
  return (
    <section id="services" className="py-16 sm:py-24">
      <SectionHeader
        kicker="Services"
        title="Two ways to engage, endless ways to deliver."
        subtitle="Simple hourly pricing + tailored scopes to fit your growth stage."
        Icon={Headset}
      />
      <div className="grid gap-6 md:grid-cols-2">
        <ServiceCard
          title="CS Advisor Retainer"
          tagline="Ongoing, high‑leverage leadership without the full‑time headcount."
          bullets={[
            "Strategic planning & execution support.",
            "Team coaching & playbook development.",
            "Renewal, expansion, and churn mitigation programs.",
          ]}
          results={[
            "Immediate lift in retention & NRR.",
            "More confident, higher‑performing CS teams.",
            "Predictable, scalable customer lifecycle operations.",
          ]}
        />
        <ServiceCard
          title="GTM System Automation / Architecture"
          tagline="Design, implement, and optimize the systems your team relies on."
          bullets={[
            "End‑to‑end GTM workflow mapping.",
            "AI & automation: CRM, CS platforms, comms.",
            "Cross‑system integrations for data integrity & reporting.",
          ]}
          results={[
            "10–20 hours saved per GTM rep per week.",
            "SLA compliance + customer satisfaction gains.",
            "Real‑time data for faster decision‑making.",
          ]}
        />
      </div>
    </section>
  );
}

function ServiceCard({ title, tagline, bullets, results }) {
  return (
    <Card className="group relative overflow-hidden border-zinc-800 bg-zinc-900/60">
      <div className="pointer-events-none absolute -inset-1 -z-10 rounded-2xl bg-gradient-to-br from-[#3B6255]/20 via-transparent to-[#112917]/20 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100" />
      <CardContent>
        <h3 className="text-xl font-semibold">{title}</h3>
        <p className="mt-1 text-zinc-400">{tagline}</p>
        <ul className="mt-4 list-disc space-y-2 pl-6 text-zinc-200 marker:text-[#3B6255]">
          {bullets.map((b, i) => (
            <li key={i}>{b}</li>
          ))}
        </ul>
        <div className="mt-5 rounded-xl border border-zinc-800 p-4">
          <p className="text-xs uppercase tracking-wider text-zinc-400">Expected Results</p>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-zinc-200 marker:text-[#3B6255]">
            {results.map((r, i) => (
              <li key={i}>{r}</li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}

/* ──────────────────────────────────────────────────────────────
   IMPACT
   ────────────────────────────────────────────────────────────── */
function Impact() {
  return (
    <section id="impact" className="py-16 sm:py-24">
      <SectionHeader
        kicker="Impact"
        title="Proof in performance."
        subtitle="Selected outcomes from past projects."
        Icon={TrendingUp}
      />
      <div className="grid gap-6 md:grid-cols-2">
        <ImpactCard
          title="GTM Lifecycle Automation"
          items={[
            "+34% NRR, +18‑point NPS from lifecycle segmentation & adoption campaigns.",
            "+45 add‑ons/quarter via sentiment→action pipelines.",
            "42% churn reduction, $2M ARR retention impact from integrated feedback loops.",
          ]}
        />

        {/* Merged panel for balance */}
        <Card className="group relative overflow-hidden border-zinc-800 bg-zinc-900/60">
          <div className="pointer-events-none absolute -inset-1 -z-10 rounded-2xl bg-gradient-to-br from-[#3B6255]/15 via-transparent to-[#112917]/15 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100" />
          <CardContent>
            <div>
              <h3 className="text-lg font-semibold">RevOps & CS Automations</h3>
              <ul className="mt-3 list-disc space-y-2 pl-6 text-zinc-200 marker:text-[#3B6255]">
                <li>200+ weekly hours saved via contract‑to‑cash automations.</li>
                <li>8x increase in committed customers; +18% NRR (+$1.62M ARR).</li>
              </ul>
            </div>

            <div className="my-6 h-px bg-zinc-800" />

            <div>
              <h3 className="text-lg font-semibold">Occupancy‑Based & Personal Automations</h3>
              <ul className="mt-3 list-disc space-y-2 pl-6 text-zinc-200 marker:text-[#3B6255]">
                <li>Enterprise‑scale secure RFID access integrations.</li>
                <li>Hands‑free daily briefing sequence via IoT & automation server.</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

function ImpactCard({ title, items }) {
  return (
    <Card className="group relative overflow-hidden border-zinc-800 bg-zinc-900/60">
      <div className="pointer-events-none absolute -inset-1 -z-10 rounded-2xl bg-gradient-to-br from-[#3B6255]/15 via-transparent to-[#112917]/15 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100" />
      <CardContent>
        <h3 className="text-lg font-semibold">{title}</h3>
        <ul className="mt-3 list-disc space-y-2 pl-6 text-zinc-200 marker:text-[#3B6255]">
          {items.map((it, i) => (
            <li key={i} className="leading-relaxed">{it}</li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}

/* ──────────────────────────────────────────────────────────────
   CTA
   ────────────────────────────────────────────────────────────── */
function CTA() {
  return (
    <section id="contact" className="py-16 sm:py-24">
      <div className="relative overflow-hidden rounded-2xl border border-zinc-800 bg-gradient-to-br from-[#112917] to-[#3B6255] p-8">
        <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
        <div className="relative">
          <h3 className="text-2xl font-semibold">Ready to remove bottlenecks and surface real signal?</h3>
          <p className="mt-2 max-w-2xl text-zinc-100/90">
            Book a short intro call. We’ll pinpoint 1–2 high‑leverage automations or CS plays you can deploy within 30–45 days.
          </p>
          <div className="mt-5 flex flex-wrap items-center gap-3">
            <a href="mailto:Andrew.roman117@gmail.com">
              <Button className="bg-black/50 text-white hover:bg-black/70">
                <Mail className="mr-2 h-4 w-4" /> Email Me
              </Button>
            </a>
            <a href="https://calendar.app.google/ovfeAVX2EFt9RCUL6" target="_blank" rel="noopener noreferrer">
              <Button className="border-white/30 text-white hover:bg-white/10">
                Book a Call <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────────────────────
   FOOTER — logo placed before the three icons (as requested)
   ────────────────────────────────────────────────────────────── */
function SiteFooter() {
  return (
    <footer className="mt-10 border-t border-zinc-800/80 py-10">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <p className="text-zinc-500">© {new Date().getFullYear()} Andrew Lonati. All rights reserved.</p>

        <div className="flex items-center gap-4">
          {/* Logo FIRST in the icon row */}
          <a href="#top" aria-label="Brand logo">
            <motion.img
              src="/logo-mark.svg"
              onError={(e) => { e.currentTarget.src = "/logo-32.png"; }}
              alt="Andrew in Motion logo"
              className="h-6 w-6"
              whileHover={{ rotate: -5, scale: 1.06 }}
              transition={{ type: "spring", stiffness: 300, damping: 16 }}
            />
          </a>

          <a
            href="/resume-andrew-lonati.pdf"
            className="text-zinc-400 hover:text-white"
            aria-label="Resume"
            title="Resume (PDF)"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FileText className="h-5 w-5" />
          </a>
          <a href="https://www.linkedin.com/in/andrewroman117/" className="text-zinc-400 hover:text-white" aria-label="LinkedIn">
            <Linkedin className="h-5 w-5" />
          </a>
          <a href="https://github.com/aroman117-1618" className="text-zinc-400 hover:text-white" aria-label="GitHub">
            <Github className="h-5 w-5" />
          </a>
        </div>
      </div>
    </footer>
  );
}
