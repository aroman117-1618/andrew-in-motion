// layout.tsx – Root layout for the Next.js App Router
import '../styles/globals.css';
import type { ReactNode } from 'react';
import Nav from '../components/Nav';
import DriftBackground from '../components/DriftBackground';
import Footer from '../components/Footer';

export const metadata = {
  title: 'Andrew in Motion',
  description: 'Operational advisory and automation services by Andrew Lonati',
};

/**
 * Root layout component. This wraps every page with the navigation bar,
 * animated background and footer. A skip link is provided for
 * accessibility. The main content is layered above the background.
 */
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="text-white bg-green-950">
        {/* Skip to main content for screen readers */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only absolute top-0 left-0 bg-green-900 text-white p-2 z-30"
        >
          Skip to content
        </a>

        <Nav />
        <DriftBackground />

        <main id="main-content" className="relative z-10">
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}
