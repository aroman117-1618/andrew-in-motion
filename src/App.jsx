import React from "react";
import { motion } from "framer-motion";
import {
  FaFileAlt,
  FaLinkedin,
  FaGithub,
  FaGift,
  FaCalendarAlt,
  FaChartLine,
  FaEnvelope,
  FaInfoCircle,
  FaUserHeadset,
} from "react-icons/fa";
import LogoImage from "./andrewinmotionLogoNoBG.png"; // Use transparent PNG version

export default function App() {
  return (
    <div className="min-h-screen bg-black text-white font-sans">
      {/* HEADER */}
      <header className="flex justify-between items-center p-6 text-lg">
        <div className="flex items-center gap-2 text-2xl font-bold">
          <motion.img
            src={LogoImage}
            alt="Logo"
            className="h-8 w-8"
            initial={{ rotate: 0, scale: 0.9 }}
            animate={{ rotate: 360, scale: 1 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          />
          ndrew Lonati
        </div>
        <nav className="flex gap-6">
          <a href="#about" className="hover:text-green-400 transition">
            About
          </a>
          <a href="#services" className="hover:text-green-400 transition">
            Services
          </a>
          <a href="#impact" className="hover:text-green-400 transition">
            Impact
          </a>
          <a href="#contact" className="hover:text-green-400 transition">
            Contact
          </a>
        </nav>
        <a
          href="#contact"
          className="bg-green-800 px-4 py-2 rounded-lg hover:bg-green-700 transition"
        >
          Get in touch
        </a>
      </header>

      {/* ABOUT SECTION */}
      <section id="about" className="p-12">
        <div className="relative flex items-center gap-4 mb-8">
          <FaInfoCircle
            className="absolute left-0 text-green-800 opacity-50"
            size={80}
          />
          <div className="relative">
            <h2 className="text-4xl font-bold">Collaboration, precision, and adaptability</h2>
            <p className="text-gray-400 mt-2">
              From the kitchen to the boardroom: hands-on service instincts + data-driven rigor to design systems that move revenue.
            </p>
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="glass p-6 rounded-2xl">
            <h3 className="font-semibold mb-4">Operator Origin</h3>
            <p>
              I didn’t start in tech — I started in the kitchen. Service, collaboration, precision, and adaptability weren’t just job requirements; they were survival skills...
            </p>
          </div>
          <div className="glass p-6 rounded-2xl">
            <h3 className="font-semibold mb-4">Track Record</h3>
            <div className="space-y-3">
              <a href="https://nift.com" className="flex items-center gap-2">
                <FaGift className="text-green-500" /> <span className="text-green-500 font-medium">Nift</span> — Early-stage growth & foundational GTM build-out.
              </a>
              <a href="https://robinpowered.com" className="flex items-center gap-2">
                <FaCalendarAlt className="text-green-500" /> <span className="text-green-500 font-medium">Robin</span> — Series A/B scaling, automation design, retention systems.
              </a>
              <a href="https://datadoghq.com" className="flex items-center gap-2">
                <FaChartLine className="text-green-500" /> <span className="text-green-500 font-medium">Datadog</span> — At-scale & FedGov GTM lifecycle automation.
              </a>
              <a href="https://klaviyo.com" className="flex items-center gap-2">
                <FaEnvelope className="text-green-500" /> <span className="text-green-500 font-medium">Klaviyo</span> — RevOps automations; contract-to-cash; ROI reporting.
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES SECTION */}
      <section id="services" className="p-12">
        <div className="relative flex items-center gap-4 mb-8">
          <FaUserHeadset
            className="absolute left-0 text-green-800 opacity-50"
            size={80}
          />
          <div className="relative">
            <h2 className="text-4xl font-bold">Two ways to engage, endless ways to deliver.</h2>
            <p className="text-gray-400 mt-2">
              Simple hourly pricing + tailored scopes to fit your growth stage.
            </p>
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="glass p-6 rounded-2xl">
            <h3 className="font-semibold mb-4">CS Advisor Retainer</h3>
            <ul className="list-disc list-inside space-y-2">
              <li>Strategic planning & execution support.</li>
              <li>Team coaching & playbook development.</li>
              <li>Renewal, expansion, and churn mitigation programs.</li>
            </ul>
          </div>
          <div className="glass p-6 rounded-2xl">
            <h3 className="font-semibold mb-4">GTM System Automation / Architecture</h3>
            <ul className="list-disc list-inside space-y-2">
              <li>End-to-end GTM workflow mapping.</li>
              <li>AI & automation: CRM, CS platforms, comms.</li>
              <li>Cross-system integrations for data integrity & reporting.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="p-6 flex justify-between items-center border-t border-gray-800 mt-12">
        <span className="text-sm text-gray-400">
          © 2025 Andrew Lonati. All rights reserved.
        </span>
        <div className="flex items-center gap-4">
          <motion.img
            src={LogoImage}
            alt="Footer Logo"
            className="h-6 w-6"
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.6 }}
          />
          <a href="/resume.pdf" target="_blank" rel="noopener noreferrer">
            <FaFileAlt className="text-gray-400 hover:text-white" size={20} />
          </a>
          <a href="https://linkedin.com/in/andrewlonati" target="_blank" rel="noopener noreferrer">
            <FaLinkedin className="text-gray-400 hover:text-white" size={20} />
          </a>
          <a href="https://github.com/andrewlonati" target="_blank" rel="noopener noreferrer">
            <FaGithub className="text-gray-400 hover:text-white" size={20} />
          </a>
        </div>
      </footer>
    </div>
  );
}
