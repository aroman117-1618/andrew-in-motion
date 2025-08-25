'use client'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import CTA from './CTA'

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
      <div className="section py-4 md:py-5 flex items-center justify-between">
        <Link href="/#top" className="font-semibold h-heading tracking-tight">andrew lovati</Link>
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
