/** @type {import('next').NextConfig} */

const nextConfig = {
  experimental: {
    appDir: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  reactStrictMode: false,
  // async headers() {
  //   return [
  //     {
  //       // matching all API routes
  //       source: '/(.*)',
  //       headers: [
  //         { key: 'Access-Control-Allow-Credentials', value: 'true' },
  //         { key: 'Access-Control-Allow-Origin', value: '*' },
  //         { key: 'Access-Control-Allow-Methods', value: 'GET,OPTIONS,PATCH,DELETE,POST,PUT' },
  //         {
  //           key: 'Access-Control-Allow-Headers',
  //           value:
  //             'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
  //         },
  //       ],
  //     },
  //   ];
  // },
  async rewrites() {
    return [
      { source: '/api/:path*', destination: '/api/:path*' },
      {
        source: '/api/:path*',
        destination:
          'https://port-0-garden-of-writer-server-71t02clq3bpxzf.sel4.cloudtype.app/:path*', // 실제 백엔드 API URL
      },
    ];
  },
};

module.exports = nextConfig;
