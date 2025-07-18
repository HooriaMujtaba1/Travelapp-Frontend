/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost', 'web-production-a6d4a.up.railway.app'], // ✅ production image domain
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/:path*`, // ✅ using env variable
      },
    ];
  },
};

module.exports = nextConfig;
