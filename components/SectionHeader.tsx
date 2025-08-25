'use client'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import CTA from './CTA'

const NAV = [
  { href: '/#services', label: 'Services' },
  { href: '/#impact', label: 'Impact' },
  { href: '/#testimonials', label: 'Testimonials' },
  { href: '/#competencies', label: 'Competencies' },
  { href: '/#about', label: 'About' },
  { href: '/#contact', label: 'Contact' },
]

export default function Header() {
  const [active, setActive] = useState<string>('')
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const ids = ['services', 'impact', 'testimonials', 'competencies', 'about', 'contact']
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) setActive(`#${e.target.id}`) }),
      { rootMargin: '-40% 0px -60% 0px', threshold: [0, 0.2, 0.6] }
    )
    ids.forEach(id => { const el = document.getElementById(id); if (el) obs.observe(el) })
    return () => obs.disconnect()
  }, [])

  return (
    <header className={`sticky top-0 z-50 ${scrolled ? 'header-blur' : ''}`}>
      <div className="section py-4 md:py-5 flex items-center justify-between">
        <Link href="/#top" className="font-semibold h-heading tracking-tight">Andrew In Motion</Link>
        <nav className="hidden md:flex items-center gap-6">
          {NAV.map(n => (
            <Link key={n.href} href={n.href}
              className={`text-sm hover:text-white ${active === n.href ? 'text-white' : 'text-white/70'}`}>
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="ml-4">
          <CTA />
        </div>
      </div>
    </header>
  )
}
