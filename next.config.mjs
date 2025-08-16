/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  experimental: {
    appDir: true,
    turbopack: true
  },
  images: {
    // No external domains by default; add here if needed
    domains: []
  }
};

export default nextConfig;