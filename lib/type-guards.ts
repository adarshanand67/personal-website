import { EntertainmentType, WatchStatus } from "@/types";

/**
 * Type guard to check if a string is a valid EntertainmentType enum value
 * @param type - The string to validate
import { AnimeType, WatchStatus } from "@/types/definitions";

/**
 * Type guard to check if a string is a valid AnimeType enum value
 * @param type - The string to check
 * @returns True if the string is a valid AnimeType, false otherwise
 * @example
 * isValidAnimeType("Anime") // true
 * isValidAnimeType("invalid") // false
 */
export function isValidAnimeType(type: string): type is AnimeType {
    return Object.values(AnimeType).includes(type as AnimeType);
}

/**
 * Type guard to check if a string is a valid WatchStatus enum value
 * @param status - The string to validate
 * @returns True if the string is a valid WatchStatus, false otherwise
 * @example
 * isValidWatchStatus("Completed") // true
 * isValidWatchStatus("invalid") // false
 */
export function isValidWatchStatus(status: string): status is WatchStatus {
    return Object.values(WatchStatus).includes(status as WatchStatus);
}

/**
 * Safely parses a string to AnimeType enum with fallback
 * @param type - The string to parse
 * @returns Valid AnimeType, defaults to Anime if invalid
 * @example
 * parseAnimeType("Movie") // AnimeType.Movie
 * parseAnimeType("Web_Series") // AnimeType.WebSeries
 * parseAnimeType("invalid") // AnimeType.Anime (fallback)
 */
export function parseAnimeType(type: string): AnimeType {
    if (!type) return AnimeType.Anime;

    // Handle specific mapping if needed, e.g. "Web Series" space handling
    if (type === "Web_Series" || type === "Web Series") {
        return AnimeType.WebSeries;
    }

    return isValidAnimeType(type) ? type : AnimeType.Anime;
}

/**
 * Safely parses a string to WatchStatus enum with fallback
 * @param status - The string to parse
 * @returns Valid WatchStatus, defaults to Planning if invalid
 * @example
 * parseWatchStatus("Completed") // WatchStatus.Completed
 * parseWatchStatus("invalid") // WatchStatus.Planning (fallback)
 */
export function parseWatchStatus(status: string): WatchStatus {
    return isValidWatchStatus(status) ? status : WatchStatus.Planning;
}
