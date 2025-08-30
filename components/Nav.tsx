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
    <nav className="fixed top-0 left-0 right-0 z-20 px-3 md:px-6 pt-[max(env(safe-area-inset-top),0.25rem)]">
      {/* Inner glass rail confines the blur so it doesn’t create a giant smeared band on iOS */}
      <div
        className="
          mx-auto max-w-6xl
          h-12 md:h-16
          rounded-2xl border
          flex items-center justify-between
          px-4 md:px-6
          bg-black/35 md:bg-black/15
          supports-[backdrop-filter]:backdrop-blur-[2px]
          md:supports-[backdrop-filter]:backdrop-blur-md
          border-white/15 md:border-white/10
          text-white
        "
      >
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
      </div>
    </nav>
  );
}