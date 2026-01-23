import { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    turbo: true,
  },
  turbopack: {
    root: "./",
  },
};

export default nextConfig;
