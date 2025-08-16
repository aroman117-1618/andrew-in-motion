import '../styles/globals.css';
import type { ReactNode } from 'react';
import Nav from '../components/Nav';
import DriftBackground from '../components/DriftBackground';
import Footer from '../components/Footer';

export const metadata = {
  title: 'Andrew in Motion',
  description: 'Operational advisory and automation services by Andrew Lonati',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-background text-foreground overflow-x-hidden">
        {/* Skip link for accessibility */}
        <a href="#main" className="sr-only focus:not-sr-only p-2">
          Skip to content
        </a>
        <Nav />
        {/* Background effect is absolutely positioned behind content */}
        <DriftBackground />
        <main id="main" className="relative z-10">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}