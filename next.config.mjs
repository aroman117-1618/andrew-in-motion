import path from 'path'

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
    images: { unoptimized: true }
  },
  webpack: (config) => {
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      '@': path.resolve(process.cwd(), '.'),
    }
    return config
  },
  images: {
    // Add external sources only if you actually use them
    remotePatterns: [
      // { protocol: 'https', hostname: 'res.cloudinary.com' },
      // { protocol: 'https', hostname: 'images.ctfassets.net' }
    ],
  },
}

export default nextConfig
