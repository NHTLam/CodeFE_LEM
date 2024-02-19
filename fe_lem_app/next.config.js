/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["images.unsplash.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        port: "",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/',
        destination: '/landing-page',
      },
    ]
  },
  env: {
    BASE_URL: process.env.BASE_URL,
  },
};

module.exports = nextConfig;
