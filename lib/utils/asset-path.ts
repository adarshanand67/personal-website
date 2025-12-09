/**
 * Get the correct asset path with basePath prefix for production
 * @param path - The asset path (e.g., "/assets/logos/trellix.png")
 * @returns The full path with basePath in production, or original path in development
 */
export function getAssetPath(path: string): string {
    const isProd = process.env.NODE_ENV === "production";
    const basePath = isProd ? "/personal-website" : "";

    // If path already starts with basePath, return as-is
    if (path.startsWith(basePath)) {
        return path;
    }

    // Prepend basePath in production
    return `${basePath}${path}`;
}
