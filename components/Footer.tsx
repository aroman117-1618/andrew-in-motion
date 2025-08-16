refresh/drift-bg
// Footer.tsx – Site footer with logo, nav links and copyright
"use client";

import Image from "next/image";
import Link from "next/link";
import { Linkedin, Github, FileText } from 'lucide-react';

/**
 * Footer component displaying the logo, repeat navigation links
 * and copyright information. The backdrop blur and dark
 * translucency ensure legibility over the animated background.
 */

'use client';

import Image from 'next/image';
import Link from 'next/link';

const NAV_ITEMS = [
  { href: '#about', label: 'About' },
  { href: '#services', label: 'Services' },
  { href: '#impact', label: 'Impact' },
  { href: '#testimonials', label: 'Testimonials' },
  { href: '#contact', label: 'Contact' },
];

 main
export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative z-20 mt-16 px-6 py-12 text-white bg-green-950/80 backdrop-blur-md">
refresh/drift-bg
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
        {/* Left: logo and site name */}
        <div className="flex items-center space-x-2">
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src="/logo.png"
              alt="Andrew in Motion logo"
              width={24}
              height={24}
            />
            <span className="font-semibold">Andrew Lonati</span>
          </Link>
        </div>

        {/* Center: optional navigation links (omit if not desired) */}
        <ul className="hidden md:flex justify-center space-x-4 text-sm">

      <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center space-x-2">
          {/* adjust path if your logo file name differs */}
          <Image
            src="/logo.png"
            alt="Andrew in Motion logo"
            width={24}
            height={24}
          />
          <span className="font-semibold">Andrew Lonati</span>
        </div>
        <ul className="flex space-x-4">
 main
          {NAV_ITEMS.map(({ href, label }) => (
            <li key={href}>
              <Link href={href} className="hover:underline">
                {label}
              </Link>
            </li>
          ))}
        </ul>
refresh/drift-bg

        {/* Right: social and resource icons */}
        <div className="flex justify-end space-x-4">
          <a href="https://www.linkedin.com/in/andrewroman117/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <Linkedin className="w-5 h-5 hover:text-green-300" />
          </a>
          <a href="https://github.com/aroman117-1618" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
            <Github className="w-5 h-5 hover:text-green-300" />
          </a>
          <a href="/resume-andrew-lonati.pdf" target="_blank" rel="noopener noreferrer" aria-label="Resume">
            <FileText className="w-5 h-5 hover:text-green-300" />
          </a>
        </div>
      </div>
      <p className="text-center mt-6 text-xs">© {year} Andrew in Motion. All rights reserved.</p>
      </div>
      <p className="text-center mt-6 text-sm">
        © {year} Andrew in Motion. All rights reserved.
      </p>
 main
    </footer>
  );
}
