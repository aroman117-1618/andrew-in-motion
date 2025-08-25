'use client'
import { useEffect, useRef } from 'react'

export default function NebulaBG() {
  const ref = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const v = ref.current
    if (!v) return
    const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    if (reduced) { v.remove(); return }
    const onVis = () => (document.hidden ? v.pause() : v.play().catch(()=>{}))
    document.addEventListener('visibilitychange', onVis)
    return () => document.removeEventListener('visibilitychange', onVis)
  }, [])

  return (
    <>
      <video
        ref={ref}
        className="fixed inset-0 -z-10 h-full w-full object-cover"
        autoPlay loop muted playsInline preload="metadata"
        poster="/nebula_fallback.jpg"
      >
        <source src="/nebula_1080.webm" type="video/webm" />
        <source src="/nebula_1080.mp4" type="video/mp4" />
      </video>
      {/* Scrim + very soft vignette to match mockups */}
      <div className="pointer-events-none fixed inset-0 -z-10 bg-gradient-to-b from-black/65 via-black/25 to-black/70" />
    </>
  )
}
