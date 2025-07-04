import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    optimizePackageImports: ["@chakra-ui/react"],
    serverActions: {
      allowedOrigins: ["morpheus.asia", "*.morpheus.asia"],
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "morpheus-asia.sgp1.digitaloceanspaces.com",
        pathname: "**",
      },
    ],
  },
};

export default nextConfig;
