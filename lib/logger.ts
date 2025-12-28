/** Centralized error logging utility. */

/** Log levels for categorizing messages. */
export enum LogLevel {
    ERROR = "ERROR",
    WARN = "WARN",
    INFO = "INFO",
    DEBUG = "DEBUG",
}

/** Context object for additional error information. */
export interface LogContext {
    [key: string]: unknown;
}

/** Centralized logger instance. */
export const logger = {
    /** Log an error with optional context. */
    error(message: string, error?: Error, context?: LogContext): void {
        const logEntry = {
            level: LogLevel.ERROR,
            message,
            error: error
                ? {
                    message: error.message,
                    stack: error.stack,
                    name: error.name,
                }
                : undefined,
            context,
            timestamp: new Date().toISOString(),
        };

        console.error(`[${LogLevel.ERROR}] ${message}`, logEntry);
    },

    /** Log a warning message. */
    warn(message: string, context?: LogContext): void {
        const logEntry = {
            level: LogLevel.WARN,
            message,
            context,
            timestamp: new Date().toISOString(),
        };

        console.warn(`[${LogLevel.WARN}] ${message}`, logEntry);
    },

    /** Log an informational message (development only). */
    info(message: string, data?: unknown): void {
        if (process.env.NODE_ENV === "development") {
            console.log(`[${LogLevel.INFO}] ${message}`, data);
        }
    },

    /** Log a debug message (development only). */
    debug(message: string, data?: unknown): void {
        if (process.env.NODE_ENV === "development") {
            console.debug(`[${LogLevel.DEBUG}] ${message}`, data);
        }
    },
};

