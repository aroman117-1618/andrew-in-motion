"use client";

import Image from "next/image";
import Link from "next/link";

/**
 * Primary site navigation.
 *
 * Fixed to top with translucent backdrop over the animated background.
 */
const NAV_ITEMS = [
  { href: "#about", label: "About" },
  { href: "#services", label: "Services" },
  { href: "#impact", label: "Impact" },
  { href: "#testimonials", label: "Testimonials" },
  { href: "#contact", label: "Contact" },
];

export default function Nav() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-20 flex items-center justify-between px-6 py-4 backdrop-blur-md bg-green-950/70 text-white">
      <Link href="/" className="flex items-center space-x-2">
        <Image unoptimized src="/logo-32.png" alt="Andrew in Motion logo" width={32} height={32} priority />
        <span className="hidden md:inline font-semibold">Andrew Lonati</span>
      </Link>
      <ul className="hidden md:flex items-center space-x-6 text-sm">
        {NAV_ITEMS.map(({ href, label }) => (
          <li key={href}>
            <Link href={href} className="hover:underline focus:underline">
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
