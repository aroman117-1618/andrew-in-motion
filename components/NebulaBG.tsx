'use client'
import { useEffect, useRef } from 'react'

export default function NebulaBG(){
  const ref = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const v = ref.current
    if (!v) return
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches){ v.remove(); return }
    const onVis = () => (document.hidden ? v.pause() : v.play().catch(()=>{}))
    document.addEventListener('visibilitychange', onVis)
    return () => document.removeEventListener('visibilitychange', onVis)
  }, [])

  return (
    <>
      {/* Base video */}
<video autoPlay loop muted playsInline preload="metadata" poster="/drift_poster.jpg" className="fixed inset-0 -z-20 h-full w-full object-cover">
  <source src="/driftBackground.webm" type="video/webm" />
  <source src="/driftBackground.mp4"  type="video/mp4" />
</video>

      {/* Brand overlays */}
      <div className="fixed inset-0 -z-10 mix-blend-multiply"
           style={{
             background: 'radial-gradient(1200px 1200px at 60% 40%, rgba(6,8,11,0.6), rgba(6,8,11,0.95))'
           }} />

      <div className="fixed inset-0 -z-10 pointer-events-none mix-blend-screen opacity-[0.55]"
           style={{
             background:
               'radial-gradient(1000px 800px at 30% 30%, rgba(25,199,183,0.35), transparent 60%),' +
               'radial-gradient(1100px 900px at 75% 65%, rgba(230,213,163,0.20), transparent 65%)'
           }} />

      {/* Readability scrim */}
      <div className="pointer-events-none fixed inset-0 -z-5 bg-gradient-to-b from-black/60 via-black/25 to-black/70" />
    </>
  )
}
