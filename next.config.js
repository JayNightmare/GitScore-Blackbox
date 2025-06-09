/**
 * Next.js configuration for static export to GitHub Pages
 * Configures the app for static generation with trailing slashes and image optimization disabled
 */

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  assetPrefix: process.env.NODE_ENV === 'production' ? '/GitScore-Blackbox/' : '',
  basePath: process.env.NODE_ENV === 'production' ? '/GitScore-Blackbox' : '',
  env: {
    GITHUB_TOKEN: process.env.GITHUB_TOKEN,
    MONGODB_URI: process.env.MONGODB_URI,
  }
}

module.exports = nextConfig
