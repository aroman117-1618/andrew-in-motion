import React from "react";
import "./index.css";
import { motion } from "framer-motion";
import { ArrowRight, Download, Mail, Github, Linkedin, FileText } from "lucide-react";

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
          [ 59,  98,  85], // pine       #3B6255
          [ 17,  41,  23], // deep pine  #112917
          [  8,  38,  31], // deep forest
          [  6,  74,  99], // teal navy
          [ 28, 139, 102], // emerald
          [155, 194,  60], // lime
          [207, 226, 142], // light lime
        ]}
      />

      {/* Site content sits above */}
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
        <div className="flex items-center gap-2">
          <a href="#contact">
            <Button className="bg-[#3B6255] hover:bg-[#112917] text-white">Get in touch</Button>
          </a>
        </div>
      </div>
    </div>
  );
}

function Hero() {
  return (
    <section id="top" className="relative overflow-hidden py-20 sm:py-28">
      {/* no GradientOrb here anymore; the brain is global */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 mx-auto max-w-3xl text-center"
      >
        <p className="mb-4 text-xs uppercase tracking-[0.25em] text-zinc-400">
          GTM Systems • Customer Success • Lifecycle Automation
        </p>
        <h1 className="mb-4 text-3xl font-semibold leading-tight sm:text-5xl">
          Scale your growth <span className="text-[#3B6255]">without scaling headcount</span>
        </h1>
        <p className="mx-auto mb-8 max-w-2xl text-zinc-300">
          GTM Leader with a proven track record designing revenue-aligned systems that eliminate manual work, improve data quality, and let GTM teams operate like a single, high‑performing unit.
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
        title="Storytelling with precision, systems at scale"
        subtitle="From the kitchen to the boardroom: a value-based, experience-first mindset married with analytical rigor to build customer listening systems and GTM programs that actually move revenue."
      />

      {/* Two cards, same treatment as Services */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="group relative overflow-hidden border-zinc-800 bg-zinc-900/60">
          <div className="pointer-events-none absolute -inset-1 -z-10 rounded-2xl bg-gradient-to-br from-[#3B6255]/15 via-transparent to-[#112917]/15 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100" />
          <CardContent>
            <h3 className="text-lg font-semibold">Operator Origin</h3>
            <p className="mt-2 text-zinc-300 leading-relaxed">
              I didn’t start in tech — I started in the kitchen. Service, precision, and hard work weren’t just job requirements; they were survival skills. Those same principles shaped my transition into the business world, first at Equinox, where I honed a sales-driven, value-based discovery and negotiation approach. I learned how to identify key personas, align them with market-fit investment areas, and anchor conversations in proof points that mattered.
As my career evolved, I married that commercial instinct with an analytical mindset — building customer listening systems that cut through noise, surface meaningful signals, and scale those insights across entire organizations.
            </p>
<div className="mt-4 backdrop-blur-sm bg-white/5 border border-white/10 rounded-xl p-6">
  <ul className="space-y-2 text-zinc-200">
    <li className="flex gap-2">
      <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#3B6255]" />
      Turning customer data into proactive growth strategies
    </li>
    <li className="flex gap-2">
      <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#3B6255]" />
      Building systems that turn customer signals into scalable action
    </li>
    <li className="flex gap-2">
      <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#3B6255]" />
      Translating value-based discovery and customer signals into real revenue
    </li>
  </ul>
</div>
          </CardContent>
        </Card>

        <Card className="group relative overflow-hidden border-zinc-800 bg-zinc-900/60">
          <div className="pointer-events-none absolute -inset-1 -z-10 rounded-2xl bg-gradient-to-br from-[#3B6255]/15 via-transparent to-[#112917]/15 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100" />
          <CardContent>
            <h3 className="text-lg font-semibold">Track Record</h3>
            <p className="mt-4 text-zinc-300">
              I’ve been responsible for every stage of the customer lifecycle — pre-sale through renewal, including cross-sell and upsell strategies (with a personal preference for usage-based pricing). My work consistently centers on engineering efficient systems that reduce friction, improve data quality, and help GTM teams operate as a cohesive, high-performing unit.
For me, it’s all about storytelling with precision — finding the signal among the noise and translating objectives into scalable, real-world results.
            </p>
<div className="backdrop-blur-sm bg-white/5 border border-white/10 rounded-xl p-6">
  <ul className="space-y-2 text-sm text-zinc-300">
    <li><span style={{ color: '#3B6255', fontWeight: '600' }}>Nift</span> — Early-stage growth & foundational GTM build-out.</li>
    <li><span style={{ color: '#3B6255', fontWeight: '600' }}>Robin</span> — Series A/B scaling, automation design, retention systems.</li>
    <li><span style={{ color: '#3B6255', fontWeight: '600' }}>Datadog</span> — At-scale & FedGov GTM lifecycle automation.</li>
    <li><span style={{ color: '#3B6255', fontWeight: '600' }}>Klaviyo</span> — RevOps automations; contract-to-cash; ROI reporting.</li>
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
        title="Focused, high‑leverage engagements"
        subtitle="Two offers that compound: automate the GTM surface area and centralize the CS signal."
      />
      <div className="grid gap-6 md:grid-cols-2">
        <ServiceCard
          title="AI‑Driven GTM Automation Consulting"
          tagline="Scale your growth without scaling your headcount."
          bullets={[
            "GTM workflow audit to identify time sinks",
            "AI‑powered processes: CRM automation, CS ticket routing, lead scoring, onboarding triggers",
            "End‑to‑end documentation & team training",
          ]}
          results={[
            "Save 10–20 hours/week per GTM rep",
            "Improve SLA compliance & customer satisfaction",
            "Real‑time, accurate GTM data without extra admin",
          ]}
        />
        <ServiceCard
          title="Productized Customer Insights Dashboard"
          tagline="Your CX health, revenue impact, and retention metrics — all in one place."
          bullets={[
            "Pre‑built, customizable dashboard (Tableau or Notion)",
            "Integrations: Salesforce, Gainsight, Slack, Intercom and more",
            "Guided onboarding + quick‑start video; live in 48 hours",
          ]}
          results={[
            "Single source of truth for health, churn risk, expansion",
            "Decision‑ready metrics in minutes, not hours",
            "Improved accountability & performance across CS",
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
        <div className="mt-4 grid gap-2 text-zinc-200">
          {bullets.map((b, i) => (
            <div key={i} className="flex items-start gap-2">
              <div className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[#3B6255]" />
              <p>{b}</p>
            </div>
          ))}
        </div>
        <div className="mt-5 rounded-xl border border-zinc-800 p-4">
          <p className="text-xs uppercase tracking-wider text-zinc-400">Expected Results</p>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-zinc-200">
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
        subtitle="Representative wins across GTM lifecycle automation, RevOps reporting, and occupancy‑based workflows."
      />
      <div className="grid gap-6 md:grid-cols-2">
        <ImpactCard
          title="GTM Lifecycle Automation"
          items={[
            "Partnered with Product & Engineering to architect a digital-first product adoption strategy. Wrote and tested SQL transformations in Snowflake to power ETL pipelines for usage telemetry — enabling lifecycle segmentation and campaign automation. Result: +34% NRR and +18-point NPS.",
            "Designed sentiment → action pipelines across 18+ product SKUs, equipping CSMs with tactical expansions (+45 net add-ons per quarter).",
            "Built end-to-end product feedback systems (Slack → Salesforce → Jira → Productboard → Intercom), integrating customer input directly into roadmap rituals and lifecycle programs — resulting in 42% churn reduction and $2M ARR retention impact.",
            "Drove lifecycle automation and API scripts through Git-based workflows, supporting best practices for testing, pull requests, and staging deployment.",
          ]}
        />
        <ImpactCard
          title="RevOps Reporting & Automations"
          items={[
            "Architected business process automations across CS, Finance, and BizOps — streamlining contract-to-cash, reducing billing disputes, and saving 200+ weekly hours via cross-system integrations.",
            "Developed custom ROI reporting for Managed Customers to drive upgrades & committed contracts — 8x increase in contracted customers, +18% NRR (+$1.62M ARR).",
          ]}
        />
        <ImpactCard
          title="Occupancy‑Based & Personal Automations"
          items={[
            "Built and tested custom integrations using SQL, Java, AWS, and Postman to support global enterprise deployments, including secure RFID & Occupancy-based resource access aligned to modern authentication protocols.",
            "Personal Workflow: “Let’s get started” morning briefing powered by Eve Occupancy Sensors + iOS Shortcuts + Pushcut Automation Server — triggers a background sequence (calendar, tasks, weather, commute, prioritized call sheet, and system checks) via secure webhooks, hands-free.",
          ]}
        />
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
        <ul className="mt-3 space-y-2 text-zinc-200">
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
            Book a short intro. We’ll identify 1–2 high‑leverage automations or a dashboard rollout you can deploy within 30–45 days.
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
