/**
 * Environment variable configuration with runtime validation
 * Add new env vars here with their validation schema
 */

interface EnvConfig {
    // Public environment variables (accessible in browser)
    NEXT_PUBLIC_SITE_URL?: string;
    NEXT_PUBLIC_AUDIO_CDN?: string;

    // Server-only environment variables
    NODE_ENV: 'development' | 'production' | 'test';
}

/**
 * Validates and returns environment variables
 * Throws error if required variables are missing
 */
function getEnvConfig(): EnvConfig {
    const nodeEnv = process.env.NODE_ENV || 'development';

    if (!['development', 'production', 'test'].includes(nodeEnv)) {
        throw new Error(`Invalid NODE_ENV: ${nodeEnv}`);
    }

    return {
        NODE_ENV: nodeEnv as EnvConfig['NODE_ENV'],
        NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
        NEXT_PUBLIC_AUDIO_CDN: process.env.NEXT_PUBLIC_AUDIO_CDN,
    };
}

/**
 * Validated environment configuration
 * Use this instead of process.env directly
 */
export const env = getEnvConfig();

/**
 * Helper to check if running in production
 */
export const isProd = env.NODE_ENV === 'production';

/**
 * Helper to check if running in development
 */
export const isDev = env.NODE_ENV === 'development';
