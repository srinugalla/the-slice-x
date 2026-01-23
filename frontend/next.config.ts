import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  swcMinify: true, // Faster builds with SWC
  experimental: {
    appDir: true, // Because you are using the /app directory
    turbo: true,  // Enable Turbopack
  },
  typescript: {
    ignoreBuildErrors: false, // Fail build on TS errors
  },
  images: {
    domains: ["your-image-domain.com", "via.placeholder.com"], // Add any external domains used for images
  },
  output: "standalone", // Makes the build self-contained for deployment
};

export default nextConfig;
