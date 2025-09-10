import Image from "next/image";
import profilePhoto from "@/public/profilePhoto.jpeg";

// ✅ content-only: no <section>, no outer "glass"
export function AboutFace() {
  return (
    <>
      <h2 className="section-title">About Me</h2>
      <div className="mt-6 grid gap-8 md:grid-cols-2 text-white/85">
        <div className="space-y-6">
          <p className="text-lg">
            Started in fine dining, where success meant collaboration, precision, and
            adaptability. I bring that ethos to tech—coaching GTM teams and engineering
            systems, across seed-state startups to public enterprises, that drive revenue,
            accelerate teams, and surface real customer signals.
          </p>

          <div>
            <h3 className="h-heading text-xl font-semibold">Core Competencies:</h3>
            <ul className="mt-3 space-y-2">
              <li>• <b>Lifecycle Design:</b> programming that drives expansion &amp; retention from pre-sale through renewal.</li>
              <li>• <b>System Automation:</b> workflows that accelerate revenue, cut wasted hours, and raise data quality.</li>
              <li>• <b>Data-driven Storytelling:</b> turn signals into strategy that scales revenue.</li>
            </ul>
          </div>
        </div>

        <div className="flex items-center justify-center md:justify-end">
          <div className="relative w-full max-w-[420px] aspect-[4/5]">
            <Image
              src="/profilePhoto.jpeg"
              alt="Andrew Roman Lonati — profile portrait"
              fill
              priority
              sizes="(min-width: 768px) 420px, 100vw"
              className="rounded-2xl object-cover shadow-xl ring-1 ring-white/10"
            />
          </div>
        </div>
      </div>
    </>
  );
}

// (kept for anywhere else you use About as a full-width section)
export default function About() {
  return (
    <section id="about" className="section">
      <div className="glass p-8 md:p-10">
        <AboutFace />
      </div>
    </section>
  );
}