/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    serverActions: true,
  },
}

if (process.env.NEXT_PUBLIC_XCART_API_URL) {
  try {
    const url = new URL(process.env.NEXT_PUBLIC_XCART_API_URL)
    if (url.hostname) {
      nextConfig.images = {
        domains: [url.hostname],
      }
    }
  } catch (e) {}
}

const withPWA = require('@ducanh2912/next-pwa').default({
  disable: process.env.APP_ENV === 'dev',
  dest: 'public',
  register: true,
})

module.exports = withPWA({
  ...nextConfig,
})
