import '../styles/globals.css';
import type { ReactNode } from 'react';
import Nav from '../components/Nav';
import DriftBackground from '../components/DriftBackground';
import Footer from '../components/Footer';

export const metadata = {
  title: 'Andrew in Motion',
  description: 'Operational advisory and automation services by Andrew Lonati',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="text-white">
        {/* Skip link for screen readers/keyboard users */}
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
