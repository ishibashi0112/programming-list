/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "firebasestorage.googleapis.com",
      "www.pasonatech.co.jp",
      "cdn.sstatic.net",
    ],
  },
};

module.exports = nextConfig;
