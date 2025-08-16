"use client";

import Image from 'next/image';
import { motion } from 'framer-motion';
import Link from 'next/link';

const NAV_ITEMS = [
  { href: '#about', label: 'About' },
  { href: '#services', label: 'Services' },
  { href: '#impact', label: 'Impact' },
  { href: '#testimonials', label: 'Testimonials' },
  { href: '#contact', label: 'Contact' }
];

export default function Nav() {
  return (
    <nav className="fixed top-0 inset-x-0 z-20 backdrop-blur-md bg-background/70 border-b border-primary/20 shadow-sm">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center space-x-2 select-none">
          <motion.div
            initial={{ rotate: 0, scale: 1, opacity: 0.95 }}
            whileHover={{ rotate: -5, scale: 1.1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className="h-8 w-8"
          >
            <Image src="/logo-32.png" alt="Andrew in Motion logo" width={32} height={32} priority />
          </motion.div>
          <span className="font-semibold tracking-tight text-lg hidden sm:inline">ndrew&nbsp;Lonati</span>
        </Link>
        <div className="hidden md:flex items-center space-x-6">
          {NAV_ITEMS.map(({ href, label }) => (
            <motion.a
              key={href}
              href={href}
              className="text-sm uppercase font-medium tracking-wide hover:text-accent focus:text-accent"
              whileHover={{ scale: 1.05 }}
            >
              {label}
            </motion.a>
          ))}
        </div>
        <div className="md:hidden">
          {/* simple mobile nav: anchors not collapsed; rely on native behaviour */}
          {NAV_ITEMS.map(({ href, label }) => (
            <a key={href} href={href} className="mr-4 text-sm font-medium">
              {label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}