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
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-dvh">
        {/* add this */}
        <DriftBackground />
        <a href="#content" className="sr-only focus:not-sr-only">Skip to content</a>
        <main id="content">{children}</main>
      </body>
    </html>
  );
}
