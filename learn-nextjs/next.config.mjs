/** @type {import('next').NextConfig} */
const config = {
  images: {
    domains: ['images.unsplash.com', 'localhost', 'avatars.githubusercontent.com'],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
}

export default config;