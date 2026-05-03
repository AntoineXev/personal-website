import { initOpenNextCloudflareForDev } from '@opennextjs/cloudflare'

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: { unoptimized: true },
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  async redirects() {
    return [
      { source: '/about', destination: '/', statusCode: 301 },
      { source: '/articles', destination: '/', statusCode: 301 },
      { source: '/articles/:path*', destination: '/', statusCode: 301 },
      { source: '/projects', destination: '/', statusCode: 301 },
      { source: '/projects/:path*', destination: '/', statusCode: 301 },
      { source: '/uses', destination: '/', statusCode: 301 },
      { source: '/thank-you', destination: '/', statusCode: 301 },
    ]
  },
}

initOpenNextCloudflareForDev()

export default nextConfig
