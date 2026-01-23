import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // You can keep turbopack settings if you want
  turbopack: {
    root: __dirname, // this points to 'frontend'
  },
};

export default nextConfig;
