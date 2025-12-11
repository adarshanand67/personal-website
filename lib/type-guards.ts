import { EntertainmentType, WatchStatus } from "@/types";

/**
 * Type guard to check if a string is a valid EntertainmentType enum value
 * @param type - The string to validate
 * @returns True if the string is a valid EntertainmentType, false otherwise
 * @example
 * isValidEntertainmentType("Anime") // true
 * isValidEntertainmentType("invalid") // false
 */
export function isValidEntertainmentType(type: string): type is EntertainmentType {
    return Object.values(EntertainmentType).includes(type as EntertainmentType);
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
 * Safely parses a string to EntertainmentType enum with fallback
 * Handles legacy "Web_Series" format for backward compatibility
 * @param type - The string to parse
 * @returns Valid EntertainmentType, defaults to Anime if invalid
 * @example
 * parseEntertainmentType("Movie") // EntertainmentType.Movie
 * parseEntertainmentType("Web_Series") // EntertainmentType.WebSeries
 * parseEntertainmentType("invalid") // EntertainmentType.Anime (fallback)
 */
export function parseEntertainmentType(type: string): EntertainmentType {
    // Handle legacy "Web_Series" format
    if (type === "Web_Series" || type === "Web Series") {
        return EntertainmentType.WebSeries;
    }

    return isValidEntertainmentType(type) ? type : EntertainmentType.Anime;
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
