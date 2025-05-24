/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
  webpack: (config, { isServer }) => {
    // Disable cache globally to prevent cache-related errors
    config.cache = false;
    
    // Clear module cache for both server and client
    if (!isServer) {
      config.optimization = {
        ...config.optimization,
        runtimeChunk: false,
        minimize: true
      };
    }

    return config;
  },
};

module.exports = nextConfig;