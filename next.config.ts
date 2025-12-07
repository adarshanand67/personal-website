import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";
const repoName = "personal-website";

const nextConfig: NextConfig = {
  output: "export",
  basePath: isProd ? `/${repoName}` : undefined,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.myanimelist.net",
      },
      {
        protocol: "https",
        hostname: "upload.wikimedia.org",
      },
      {
        protocol: "https",
        hostname: "m.media-amazon.com",
      },
    ],
  },
};

export default nextConfig;
