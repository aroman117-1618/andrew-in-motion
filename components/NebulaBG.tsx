'use client'
import { useEffect, useRef, useState } from 'react'

export default function NebulaBG(){
  const ref = useRef<HTMLVideoElement>(null)
  const [blocked, setBlocked] = useState(false)

  useEffect(() => {
    const v = ref.current
    if (!v) return

    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches){
      v.remove()
      return
    }

    // iOS hints
    v.setAttribute('playsinline','')
    ;(v as any).webkitPlaysInline = true

    const tryPlay = async () => {
      try {
        await v.play()
        setBlocked(false)
      } catch {
        setBlocked(true)
      }
    }

    // initial attempt
    tryPlay()

    // resume on tab visibility change
    const onVis = () => (document.hidden ? v.pause() : tryPlay())
    document.addEventListener('visibilitychange', onVis)

    // also retry when intersecting (helps when decode stalls)
    const io = new IntersectionObserver((entries) => {
      if (entries.some(e => e.isIntersecting)) tryPlay()
    }, { threshold: 0.15 })
    io.observe(v)

    return () => {
      document.removeEventListener('visibilitychange', onVis)
      io.disconnect()
    }
  }, [])

  const onUserPlay = async () => {
    const v = ref.current
    if (!v) return
    try {
      await v.play()
      setBlocked(false)
    } catch {
      setBlocked(true)
    }
  }

  return (
    <>
      {/* Base video (keeps your existing assets) */}
      <video
        ref={ref}
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        poster="/drift_poster.jpg"
        className="fixed inset-0 -z-20 h-full w-full object-cover"
      >
        <source src="/driftBackground.webm" type="video/webm" />
        <source src="/driftBackground.mp4"  type="video/mp4" />
      </video>

      {/* Tap-to-play overlay if autoplay is blocked (LPM, policy, etc.) */}
      {blocked && (
        <button
          onClick={onUserPlay}
          aria-label="Play background"
          className="fixed left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-black/55 px-5 py-3 text-white backdrop-blur"
        >
          Play
        </button>
      )}

      {/* Brand overlays (unchanged) */}
      <div className="fixed inset-0 -z-10 mix-blend-multiply"
           style={{ background:'radial-gradient(1200px 1200px at 60% 40%, rgba(6,8,11,0.6), rgba(6,8,11,0.95))' }} />
      <div className="fixed inset-0 -z-10 pointer-events-none mix-blend-screen opacity-[0.55]"
           style={{
             background:
               'radial-gradient(1000px 800px at 30% 30%, rgba(25,199,183,0.35), transparent 60%),' +
               'radial-gradient(1100px 900px at 75% 65%, rgba(230,213,163,0.20), transparent 65%)'
           }} />
      <div className="pointer-events-none fixed inset-0 -z-5 bg-gradient-to-b from-black/60 via-black/25 to-black/70" />
    </>
  )
}