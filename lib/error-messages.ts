// Centralized error and log messages for consistency
export const ERROR_MESSAGES = {
    AUDIO: {
        PLAYBACK_FAILED: 'Audio playback failed',
        TRACK_LOAD_FAILED: 'Track failed to load, switching to next track',
    },
    API: {
        FETCH_FAILED: 'Failed to fetch data',
        BLOGS_FETCH_ERROR: 'Error fetching blogs',
    },
    TERMINAL: {
        COMMAND_NOT_FOUND: 'Command not found',
        INVALID_DIRECTORY: 'Invalid directory',
    },
} as const;

export const LOG_MESSAGES = {
    API: {
        FETCHING_BLOGS: '[API] Fetching blogs',
        BLOGS_FETCHED: '[API] Blogs fetched successfully',
    },
} as const;
