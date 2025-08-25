import path from 'path'

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Prevent Netlify/CI from failing the build on lint errors
    ignoreDuringBuilds: true,
  },
  webpack: (config) => {
    // Ensure @ alias resolves the same on Linux/macOS/Netlify
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
