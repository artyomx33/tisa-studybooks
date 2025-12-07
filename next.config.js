/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizePackageImports: ['motion'],
  },
  turbopack: {},
};

export default nextConfig;
