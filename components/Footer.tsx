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

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative z-20 mt-16 px-6 py-12 text-white bg-green-950/80 backdrop-blur-md">
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
          {NAV_ITEMS.map(({ href, label }) => (
            <li key={href}>
              <Link href={href} className="hover:underline">
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <p className="text-center mt-6 text-sm">
        © {year} Andrew in Motion. All rights reserved.
      </p>
    </footer>
  );
}
