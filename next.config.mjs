/** @type {import('next').NextConfig} */
const nextConfig = {
  // App Router is default in Next 14; no experimental flags needed.
  reactStrictMode: true,

  // Add external image domains here if you load remote images.
  images: {
    domains: [],
  },

  // Do NOT set `output: "export"` for Netlify; the Next plugin expects a normal build.
};

export default nextConfig;
