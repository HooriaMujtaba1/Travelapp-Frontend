/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configuring image domains to allow images from localhost
  images: {
    domains: ['localhost'], // Add any other domains you need for image optimization
  },

  // Rewrites for API requests to forward to the backend server
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:8000/api/:path*', // Forward to your local backend
      },
    ];
  },
};

module.exports = nextConfig;