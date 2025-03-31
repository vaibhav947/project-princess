/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: '/project-princess',
  assetPrefix: '/project-princess/',
  output: 'export',
  images: {
    unoptimized: true
  }
}

module.exports = nextConfig 