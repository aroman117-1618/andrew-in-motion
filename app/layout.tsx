import type { Metadata } from 'next'
import './globals.css'
import NebulaBG from '@/components/NebulaBG'
import Header from '@/components/Header'
import { Inter, Plus_Jakarta_Sans } from 'next/font/google'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const plusJakarta = Plus_Jakarta_Sans({ subsets: ['latin'], variable: '--font-plusjakarta' })

export const metadata: Metadata = {
  title: "Andrew in Motion",
  description: "I help growth-stage teams design GTM systems that cut waste, boost velocity, and retain customers.",
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon.ico", sizes: "any" }
    ],
    apple: "/apple-touch-icon.png",
    other: [
      {
        rel: "mask-icon",
        url: "/safari-pinned-tab.svg",
        color: "#0b3d2e"
      }
    ]
  },
  manifest: "/site.webmanifest",
  themeColor: "#0b3d2e",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "AIM"
  }
};

<head>
  <link rel="preload" href="/solutions/gtm.webm" as="video" />
  <link rel="preload" href="/solutions/lifecycle.webm" as="video" />
  <link rel="preload" href="/solutions/revops.png" as="image" />
</head>

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${plusJakarta.variable}`}>
      <body className="bg-black text-white antialiased min-h-screen">
        <NebulaBG />
        <Header />
        <main className="relative">{children}</main>
      </body>
    </html>
  )
}
