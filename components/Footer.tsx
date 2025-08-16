"use client";

import Image from "next/image";
import Link from "next/link";
import { Linkedin, Github, FileText } from "lucide-react";

const NAV_ITEMS = [
  { href: "#about", label: "About" },
  { href: "#services", label: "Services" },
  { href: "#impact", label: "Impact" },
  { href: "#testimonials", label: "Testimonials" },
  { href: "#contact", label: "Contact" },
];

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative z-20 mt-16 px-6 py-12 text-white bg-green-950/80 backdrop-blur-md">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center space-x-2">
          <Link href="/" className="flex items-center space-x-2">
            <Image src="/logo.png" alt="Andrew in Motion logo" width={24} height={24} />
            <span className="font-semibold">Andrew Lonati</span>
          </Link>
        </div>
        <ul className="flex space-x-4 text-sm">
          {NAV_ITEMS.map(({ href, label }) => (
            <li key={href}>
              <Link href={href} className="hover:underline focus:underline">
                {label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="flex space-x-4">
          <a href="https://www.linkedin.com/in/andrewroman117/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="hover:text-green-300">
            <Linkedin className="w-5 h-5" />
          </a>
          <a href="https://github.com/aroman117-1618" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="hover:text-green-300">
            <Github className="w-5 h-5" />
          </a>
          <a href="/resume-andrew-lonati.pdf" target="_blank" rel="noopener noreferrer" aria-label="Resume" className="hover:text-green-300">
            <FileText className="w-5 h-5" />
          </a>
        </div>
      </div>
      <p className="text-center mt-6 text-xs">© {year} Andrew in Motion. All rights reserved.</p>
    </footer>
  );
}
