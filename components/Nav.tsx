// Nav.tsx – Updated navigation component with logo and responsive links
"use client";

import Image from "next/image";
import Link from "next/link";

// Define the navigation items once for reuse in header and footer
const NAV_ITEMS = [
  { href: "#about", label: "About" },
  { href: "#services", label: "Services" },
  { href: "#impact", label: "Impact" },
  { href: "#testimonials", label: "Testimonials" },
  { href: "#contact", label: "Contact" },
];

/**
 * Primary site navigation. This component displays the site logo,
 * company name and navigation links. The header uses a blurred,
 * semi‑transparent background to improve contrast against the
 * animated canvas behind it. On small screens, the nav labels are
 * hidden to preserve space; you can extend this with a hamburger
 * menu if needed.
 */
export default function Nav() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-20 flex items-center justify-between px-6 py-4 backdrop-blur-md bg-green-950/70 text-white">
      {/* Logo and site name */}
      <Link href="/" className="flex items-center space-x-2">
        <Image
          src="/logo.png"
          alt="Andrew in Motion logo"
          width={32}
          height={32}
          priority
        />
        <span className="hidden md:inline font-semibold">Andrew Lonati</span>
      </Link>
      {/* Nav links for medium+ screens */}
      <ul className="hidden md:flex items-center space-x-6 text-sm">
        {NAV_ITEMS.map(({ href, label }) => (
          <li key={href}>
            <Link href={href} className="hover:underline">
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
