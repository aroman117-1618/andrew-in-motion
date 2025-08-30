import path from 'path';

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },

  images: {
    unoptimized: true,
    // keep this only if you actually load remote images
    remotePatterns: [
      // { protocol: 'https', hostname: 'res.cloudinary.com' },
      // { protocol: 'https', hostname: 'images.ctfassets.net' },
    ],
  },

  webpack: (config) => {
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      '@': path.resolve(process.cwd(), '.'),
    };
    return config;
  },
};

export default nextConfig;
