import type { NextConfig } from "next";

const nextConfig: NextConfig = {output: 'export',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  basePath: '/digital-transport-dashboard', // GitHub repo name
  assetPrefix: '/digital-transport-dashboard', // GitHub repo name
};

export default nextConfig;
