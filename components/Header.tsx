'use client'
import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import CTA from './CTA'
import LogoMark from './LogoMark'

const NAV = [
  { href: '/#about', label: 'About Me' },
  { href: '/#impact', label: 'Impact' },
  { href: '/#services', label: 'Services' },
  { href: '/#testimonials', label: 'Testimonials' },
  { href: '/#contact', label: 'Contact' },
]

export default function Header(){
  const [scrolled,setScrolled] = useState(false)
  useEffect(()=>{ const on=()=>setScrolled(window.scrollY>8); on(); window.addEventListener('scroll',on); return()=>window.removeEventListener('scroll',on)},[])
  return (
    <header className={`sticky top-0 z-50 ${scrolled?'header-blur':''}`}>
      <div className="section py-3 md:py-4 flex items-center justify-between">
        {/* Brand: {logo}ndrew Lonati */}
<Link href="/#top" className="flex items-center gap-2 group">
  <LogoMark size={36} />
  <span className="h-heading text-lg md:text-xl font-semibold tracking-tight brand-name">
    ndrew <span className="opacity-90">Lonati</span>
  </span>
</Link>

        <nav className="hidden md:flex items-center gap-6">
          {NAV.map(n=>(
            <Link key={n.href} href={n.href} className="text-sm text-white/75 hover:text-white">{n.label}</Link>
          ))}
        </nav>

        <div className="ml-4"><CTA /></div>
      </div>
    </header>
  )
}
