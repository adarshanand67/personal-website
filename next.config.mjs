/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === "production";

// Security headers
const securityHeaders = [
    {
        key: "X-DNS-Prefetch-Control",
        value: "on",
    },
    {
        key: "Strict-Transport-Security",
        value: "max-age=63072000; includeSubDomains; preload",
    },
    {
        key: "X-Frame-Options",
        value: "SAMEORIGIN",
    },
    {
        key: "X-Content-Type-Options",
        value: "nosniff",
    },
    {
        key: "X-XSS-Protection",
        value: "1; mode=block",
    },
    {
        key: "Referrer-Policy",
        value: "origin-when-cross-origin",
    },
    {
        key: "Permissions-Policy",
        value: "camera=(), microphone=(), geolocation=()",
    },
];

const nextConfig = {
    reactStrictMode: true,
    compiler: {
        removeConsole: isProd ? { exclude: ["error", "warn"] } : false,
    },
    images: {
        unoptimized: true,
        remotePatterns: [
            {
                protocol: "https",
                hostname: "img.logo.dev",
            },
            {
                protocol: "https",
                hostname: "cdn.myanimelist.net",
            },
            {
                protocol: "https",
                hostname: "www.google.com",
            },
        ],
    },
    basePath: "",
    assetPrefix: "",

    typescript: {
        ignoreBuildErrors: false,
    },
    output: isProd ? "export" : undefined,

    // Security headers
    async headers() {
        return [
            {
                source: "/:path*",
                headers: securityHeaders,
            },
        ];
    },
};

// Bundle analyzer (enabled with ANALYZE=true env var)
const withBundleAnalyzer = (config) => {
    if (process.env.ANALYZE === "true") {
        const bundleAnalyzer = require("@next/bundle-analyzer")({
            enabled: true,
        });
        return bundleAnalyzer(config);
    }
    return config;
};

export default withBundleAnalyzer(nextConfig);
