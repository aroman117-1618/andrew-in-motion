'use client'

import Link from 'next/link'

const APPT = process.env.NEXT_PUBLIC_APPT_URL || '/#contact'

export default function CTA({
  label = 'Book a session',
  className = '',
}: {
  label?: string
  className?: string
}) {
  return (
    <Link href={'https://calendar.app.google/X5QaScUxD18ovu9a9'} className={`btn-primary ${className}`} aria-label={label}>
      {label}
    </Link>
  )
}
