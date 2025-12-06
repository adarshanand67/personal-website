import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";
const repoName = "personal-website";

const nextConfig: NextConfig = {
  output: "export",
  basePath: isProd ? `/${repoName}` : "",
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.myanimelist.net",
      },
    ],
  },
};

export default nextConfig;
