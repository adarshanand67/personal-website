/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';

const nextConfig = {
    images: {
        unoptimized: true,
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'img.logo.dev',
            },
        ],
        // Root deployment - no base path needed
        basePath: '',
        assetPrefix: '',
        output: isProd ? 'export' : undefined,
        async headers() {
            return [
                {
                    source: '/:path*',
                    headers: [
                        {
                            key: 'X-DNS-Prefetch-Control',
                            value: 'on'
                        },
                        {
                            key: 'Strict-Transport-Security',
                            value: 'max-age=63072000; includeSubDomains; preload'
                        },
                        {
                            key: 'X-Frame-Options',
                            value: 'SAMEORIGIN'
                        },
                        {
                            key: 'X-Content-Type-Options',
                            value: 'nosniff'
                        },
                        {
                            key: 'X-XSS-Protection',
                            value: '1; mode=block'
                        },
                        {
                            key: 'Referrer-Policy',
                            value: 'origin-when-cross-origin'
                        },
                        {
                            key: 'Permissions-Policy',
                            value: 'camera=(), microphone=(), geolocation=()'
                        }
                    ],
                },
            ];
        },
    };

    export default nextConfig;
