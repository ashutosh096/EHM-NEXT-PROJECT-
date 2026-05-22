/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  // Allow all image domains from Cloudinary and other sources
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**' },
      { protocol: 'http', hostname: '**' },
    ],
  },
  poweredByHeader: false,
};

module.exports = nextConfig;
