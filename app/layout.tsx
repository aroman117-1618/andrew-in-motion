import type { Metadata } from 'next'
import './globals.css'
import NebulaBG from '@/components/NebulaBG'
import Header from '@/components/Header'
import { Inter, Plus_Jakarta_Sans } from 'next/font/google'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const plusJakarta = Plus_Jakarta_Sans({ subsets: ['latin'], variable: '--font-plusjakarta' })

export const metadata = {
  title: 'Andrew In Motion',
  description:
    'I help growth‑stage teams design GTM systems that cut waste, boost velocity, and retain customers.',
  icons: {
    // Versioned querystrings force Safari/Chrome to refresh
    icon: [
      { url: '/icon.png?v=2' },       
      { url: '/favicon.ico?v=2' },     
    ],
    apple: '/apple-icon.png?v=2',
  },
  themeColor: '#0fa7a0',           
};

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
