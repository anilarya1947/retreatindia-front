import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true, // dev only
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'anvayahealthcare.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
}

export default nextConfig