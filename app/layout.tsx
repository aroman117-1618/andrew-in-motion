import type { Metadata } from 'next'
import './globals.css'
import NebulaBG from '@/components/NebulaBG'
import Header from '@/components/Header'
import { Inter, Plus_Jakarta_Sans } from 'next/font/google'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const plusJakarta = Plus_Jakarta_Sans({ subsets: ['latin'], variable: '--font-plusjakarta' })

export const metadata: Metadata = {
  title: 'Andrew In Motion',
  description: 'Scale revenue and retention without adding headcount.',
  manifest: '/manifest.webmanifest',
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
