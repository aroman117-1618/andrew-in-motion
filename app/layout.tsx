import type { Metadata } from 'next'
import './globals.css'
import NebulaBG from '@/components/NebulaBG'
import Header from '@/components/Header'
import { Inter, Plus_Jakarta_Sans } from 'next/font/google'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const plusJakarta = Plus_Jakarta_Sans({ subsets: ['latin'], variable: '--font-plusjakarta' })

export const metadata: Metadata = {
  title: 'Andrew In Motion',
  description:
    'I help growth-stage teams design GTM systems that cut waste, boost velocity, and retain customers.',
  icons: {
    icon: [
      { url: '/favicon-32x32.png?v=2', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png?v=2', sizes: '16x16', type: 'image/png' },
      { url: '/favicon.svg?v=2', type: 'image/svg+xml' },
      { url: '/favicon.ico?v=2' }
    ],
    apple: [
      { url: '/apple-touch-icon.png?v=2', sizes: '180x180', type: 'image/png' }
    ],
  },
  manifest: '/site.webmanifest',
  themeColor: '#0fa7a0',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'AIM'
  },
}

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
