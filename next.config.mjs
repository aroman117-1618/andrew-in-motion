/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Add external sources only if you actually use them
    remotePatterns: [
      // { protocol: 'https', hostname: 'res.cloudinary.com' },
      // { protocol: 'https', hostname: 'images.ctfassets.net' }
    ]
  }
}
export default nextConfig
