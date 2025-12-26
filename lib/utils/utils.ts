/**
 * @fileoverview Utility functions for asset path handling.
 */

import { basePath } from "@/lib/constants";

/**
 * Converts a relative asset path to an absolute path with basePath prefix.
 *
 * @param {string} path - Relative or absolute asset path
 * @returns {string} Absolute path with basePath prefix
 *
 * @example
 * ```ts
 * getAssetPath("/logo.png") // Returns "/basePath/logo.png"
 * ```
 */
export function getAssetPath(path: string): string {
    if (path.startsWith(basePath)) {
        return path;
    }
    return `${basePath}${path}`;
}
