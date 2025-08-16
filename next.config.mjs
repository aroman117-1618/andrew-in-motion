// next.config.mjs
// Simple, valid ESM Next.js config for Next 14

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [],     // add allowed external image domains here if you use next/image
  },
};

export default nextConfig;
