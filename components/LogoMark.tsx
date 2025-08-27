'use client'
import { useState } from 'react'

export default function LogoMark({ size = 36 }: { size?: number }) {
  const [src, setSrc] = useState('/public/favicon-96x96.png') // try SVG first (crisp)
  return (
    <img
      src={src}
      width={size}
      height={size}
      alt="Andrew Lonati logo"
      onError={() => setSrc('/public/favicon-96x96.png')} // fallback to PNG if SVG missing
      style={{ display: 'block' }}
    />
  )
}
