'use client'
import { useState } from 'react'

export default function LogoMark({ size = 36 }: { size?: number }) {
  const [src, setSrc] = useState('/apple-touch-icon.png')
  return (
    <img
      src={src}
      width={size}
      height={size}
      alt="Andrew Lonati logo"
      onError={() => setSrc('/favicon-32-32.png')} // fallback to PNG if SVG missing
      style={{ display: 'block' }}
    />
  )
}
