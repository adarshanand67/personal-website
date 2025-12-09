import { BASE_PATH } from "@/lib/constants";

/**
 * Get the correct asset path with basePath prefix for production
 * @param path - The asset path (e.g., "/assets/logos/trellix.png")
 * @returns The full path with basePath in production, or original path in development
 */
export function getAssetPath(path: string): string {
    // If path already starts with basePath, return as-is
    if (path.startsWith(BASE_PATH)) {
        return path;
    }

    // Prepend basePath
    return `${BASE_PATH}${path}`;
}
