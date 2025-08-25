'use client'
import { useEffect, useRef } from 'react'

export default function NebulaBG() {
  const ref = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const v = ref.current
    const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    if (!v) return
    if (reduced) { v.remove(); return }

    const onVis = () => (document.hidden ? v.pause() : v.play().catch(() => {}))
    document.addEventListener('visibilitychange', onVis)
    return () => document.removeEventListener('visibilitychange', onVis)
  }, [])

  return (
    <>
      <video
        ref={ref}
        className="fixed inset-0 -z-10 h-full w-full object-cover opacity-70"
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        poster="/nebula_fallback.jpg"
      >
        {/* Use media attribute if you export a 720p too */}
        <source src="/nebula_1080.webm" type="video/webm" />
        <source src="/nebula_1080.mp4" type="video/mp4" />
      </video>
      {/* Readability scrim */}
      <div className="pointer-events-none fixed inset-0 -z-10 bg-gradient-to-b from-black/60 via-black/20 to-black/70" />
    </>
  )
}
