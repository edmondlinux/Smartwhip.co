import type { NextConfig } from 'next';
import path from 'path';

const nextConfig: NextConfig = {
  experimental: {
    ppr: true,
    clientSegmentCache: true,
    serverActions: {
      allowedOrigins: ['*']
    },
  },
  turbopack: {
    root: path.resolve(__dirname),
  },
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.smartwhip.co' }],
        destination: 'https://smartwhip.co/:path*',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
