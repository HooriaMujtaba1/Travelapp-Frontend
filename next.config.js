/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost', 'web-production-a6d4a.up.railway.app'],  // Added your production backend domain for images
  },

  // Rewrites for API requests to forward to the backend server
  async rewrites() {
    return [
      {
        source: '/api/:path*',  // For every request to /api/
        destination: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/:path*`, // Use the backend URL from environment variables
      },
    ];
  },
};

module.exports = nextConfig;
