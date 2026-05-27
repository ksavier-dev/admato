/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',       // generuje statyczne pliki HTML/CSS/JS
  trailingSlash: true,    // kompatybilność z Apache
  images: {
    unoptimized: true,    // wymagane przy static export (brak Node.js serwera)
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'plus.unsplash.com',
      },
    ],
  },
}

export default nextConfig
