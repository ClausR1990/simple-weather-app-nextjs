/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'openweathermap.org',
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/addresses/:slug*',
        destination: 'https://maps.googleapis.com/:slug*',
      },
    ]
  },
}

module.exports = nextConfig
