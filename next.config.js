/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Keep config minimal to avoid Turbopack/workspace-root inference issues
  swcMinify: true,
};

module.exports = nextConfig;
