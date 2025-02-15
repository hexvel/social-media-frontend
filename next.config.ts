import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "sun9-19.userapi.com",
      },
      {
        protocol: "https",
        hostname: "cdn-images.dzcdn.net",
      },
    ],
  },
};

export default nextConfig;
