import React from "react";
import "./index.css";
import { motion } from "framer-motion";
import { ArrowRight, Mail, Github, Linkedin, FileText } from "lucide-react";

// local UI (pure Tailwind)
import { Card, CardContent } from "./components/ui/card";
import { Button } from "./components/ui/button";

// global background
import InteractiveDrift from "./components/InteractiveDrift.jsx";

export default function App() {
  return (
    <div className="relative min-h-screen bg-[#141414] text-zinc-100 selection:bg-[#3B6255] selection:text-white">
      <InteractiveDrift
        ribbons={12}
        thickness={2.0}
        speed={0.18}
        backgroundFade={0.06}
        palette={[
          [59, 98, 85],   // #3B6255
          [17, 41, 23],   // #112917
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

function SiteNav() {
  return (
    <div className="sticky top-0 z-20 border-b border-zinc-800/80 bg-[#141414]/80 backdrop-blur supports-[backdrop-filter]:bg-[#141414]/60">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <a href="#top" className="font-semibold tracking-tight">Andrew Lonati</a>
        <nav className="hidden gap-6 text-sm sm:flex">
          <a href="#about" className="text-zinc-300 hover:text-white">About</a>
          <a href="#services" className="text-zinc-300 hover:text-white">Services</a>
          <a href="#impact" className="text-zinc-300 hover:text-white">Impact</a>
          <a href="#contact" className="text-zinc-300 hover:text-white">Contact</a>
        </nav>
        <a href="#contact">
          <Button className="bg-[#3B6255] hover:bg-[#112917] text-white">Get in touch</Button>
        </a>
      </div>
    </div>
  );
}

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

function SectionHeader({ kicker, title, subtitle }) {
  return (
    <div className="mb-10">
      <p className="text-xs uppercase tracking-[0.25em] text-zinc-400">{kicker}</p>
      <h2 className="mt-2 text-2xl font-semibold sm:text-3xl">{title}</h2>
      {subtitle && <p className="mt-3 max-w-3xl text-zinc-300">{subtitle}</p>}
    </div>
  );
}

function About() {
  return (
    <section id="about" className="py-16 sm:py-24">
      <SectionHeader
        kicker="About"
        title="Collaboration, precision, and adaptability"
        subtitle="From the kitchen to the boardroom: hands‑on service instincts + data‑driven rigor to design systems that move revenue."
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

            {/* Sub-panel (glass) with aligned bullets */}
            <div className="mt-5 rounded-xl border border-zinc-800 p-4">
              <ul className="list-disc marker:text-[#3B6255] space-y-1 pl-5 text-base text-zinc-200">
                <li>Turning customer data into proactive growth strategies</li>
                <li>Building systems that turn customer signals into scalable action</li>
                <li>Translating insights into measurable revenue impact</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Track Record */}
        <Card className="group relative overflow-hidden border-zinc-800 bg-zinc-900/60">
          <div className="pointer-events-none absolute -inset-1 -z-10 rounded-2xl bg-gradient-to-br from-[#3B6255]/15 via-transparent to-[#112917]/15 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100" />
          <CardContent>
            <h3 className="text-lg font-semibold">Track Record</h3>
            <p className="mt-2 text-base text-zinc-300 leading-relaxed">
              Led the full customer lifecycle — pre‑sale through renewal — with a focus on scalable automation and cross‑functional alignment.
            </p>

            <div className="mt-5 rounded-xl border border-zinc-800 p-4">
              <ul className="space-y-1 text-base leading-relaxed text-zinc-200">
                <li><span className="text-[#3B6255] font-semibold">Nift</span> — Early‑stage growth & foundational GTM build‑out.</li>
                <li><span className="text-[#3B6255] font-semibold">Robin</span> — Series A/B scaling, automation design, retention systems.</li>
                <li><span className="text-[#3B6255] font-semibold">Datadog</span> — At‑scale & FedGov GTM lifecycle automation.</li>
                <li><span className="text-[#3B6255] font-semibold">Klaviyo</span> — RevOps automations; contract‑to‑cash; ROI reporting.</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

function Services() {
  return (
    <section id="services" className="py-16 sm:py-24">
      <SectionHeader
        kicker="Services"
        title="Two high‑impact offerings"
        subtitle="Simple hourly model, custom‑scoped projects."
      />
      <div className="grid gap-6 md:grid-cols-2">
        <ServiceCard
          title="CS Advisor Retainer"
          tagline="Embedded partnership to keep your CS strategy sharp (weekly sync + async access)."
          bullets={[
            "Customer journey mapping & retention strategy",
            "KPI definition, reporting design, and operational reviews",
            "Leadership coaching & cross‑functional alignment",
          ]}
          results={[
            "Clear, actionable CS strategy",
            "Improved retention & expansion",
            "Stronger alignment between CS, Sales, and Product",
          ]}
        />
        <ServiceCard
          title="GTM System Automation / Architecture"
          tagline="Design and automate GTM workflows to remove bottlenecks."
          bullets={[
            "Audit & blueprint of current GTM stack",
            "AI‑powered processes: CRM automation, CS ticket routing, lead scoring, onboarding triggers",
            "Cross‑system integrations + documentation & enablement",
          ]}
          results={[
            "10–20+ hours/week saved per GTM rep",
            "Accurate, real‑time data without manual upkeep",
            "Scalable systems ready for growth",
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

        {/* Aligned bullets via native markers */}
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

function Impact() {
  return (
    <section id="impact" className="py-16 sm:py-24">
      <SectionHeader
        kicker="Impact & Results"
        title="Proving value"
        subtitle="Representative wins across lifecycle automation, RevOps reporting, and operational architecture."
      />
      <div className="grid gap-6 md:grid-cols-2">
        {/* Left: Lifecycle Automation */}
        <ImpactCard
          title="GTM Lifecycle Automation"
          items={[
            "Architected digital‑first adoption strategy powered by usage telemetry (+34% NRR, +18‑point NPS).",
            "Designed sentiment → action pipelines across 18+ SKUs enabling +45 net add‑ons/quarter.",
            "Built integrated feedback loops (Slack → Salesforce → Jira → Productboard → Intercom) driving 42% churn reduction and $2M ARR retention.",
            "Drove lifecycle automation and API scripts via Git‑based workflows with testing/PRs/staging.",
          ]}
        />

        {/* Right: Merged RevOps + Occupancy */}
        <Card className="group relative overflow-hidden border-zinc-800 bg-zinc-900/60">
          <div className="pointer-events-none absolute -inset-1 -z-10 rounded-2xl bg-gradient-to-br from-[#3B6255]/15 via-transparent to-[#112917]/15 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100" />
          <CardContent>
            <div>
              <h3 className="text-lg font-semibold">RevOps Reporting & Automations</h3>
              <ul className="mt-3 list-disc space-y-2 pl-6 text-zinc-200 marker:text-[#3B6255]">
                <li>Automated contract‑to‑cash across CS/Finance/BizOps — saving 200+ weekly hours.</li>
                <li>Developed ROI reporting for Managed Customers — 8× increase in committed contracts; +18% NRR (+$1.62M ARR).</li>
              </ul>
            </div>

            <div className="my-6 h-px bg-zinc-800" />

            <div>
              <h3 className="text-lg font-semibold">Occupancy‑Based & Personal Automations</h3>
              <ul className="mt-3 list-disc space-y-2 pl-6 text-zinc-200 marker:text-[#3B6255]">
                <li>Enterprise‑scale RFID/occupancy‑based access integrations (SQL/Java/AWS/Postman) aligned to modern auth.</li>
                <li>“Let’s get started” morning briefing: Eve sensors + iOS Shortcuts + Pushcut Automation Server for hands‑free calendar/tasks/weather/commute/system checks.</li>
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

function CTA() {
  return (
    <section id="contact" className="py-16 sm:py-24">
      <div className="relative overflow-hidden rounded-2xl border border-zinc-800 bg-gradient-to-br from-[#112917] to-[#3B6255] p-8">
        <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
        <div className="relative">
          <h3 className="text-2xl font-semibold">Ready to remove bottlenecks and surface real signal?</h3>
          <p className="mt-2 max-w-2xl text-zinc-100/90">
            Book a short intro. We’ll identify 1–2 high‑leverage automations or dashboard rollouts you can deploy within 30–45 days.
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

function SiteFooter() {
  return (
    <footer className="mt-10 border-t border-zinc-800/80 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 sm:flex-row sm:px-6 lg:px-8">
        <p className="text-zinc-500">© {new Date().getFullYear()} Andrew Lonati. All rights reserved.</p>
        <div className="flex items-center gap-4">
          <a href="https://github.com/aroman117-1618" className="text-zinc-400 hover:text-white" aria-label="GitHub">
            <Github className="h-5 w-5" />
          </a>
          <a href="https://www.linkedin.com/in/andrewroman117/" className="text-zinc-400 hover:text-white" aria-label="LinkedIn">
            <Linkedin className="h-5 w-5" />
          </a>
          <a href="/resume-andrew-lonati.pdf" className="text-zinc-400 hover:text-white" aria-label="Resume" title="Resume (PDF)" target="_blank" rel="noopener noreferrer">
            <FileText className="h-5 w-5" />
          </a>
        </div>
      </div>
    </footer>
  );
}
