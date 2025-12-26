/**
 * Centralized error logging utility.
 * Provides consistent error logging and reporting across the application.
 *
 * @module logger
 *
 * @example
 * ```typescript
 * import { logger } from '@/lib/logger';
 *
 * try {
 *   await riskyOperation();
 * } catch (error) {
 *   logger.error('Operation failed', error as Error, { userId: '123' });
 * }
 * ```
 */

/**
 * Log levels for categorizing messages.
 */
export enum LogLevel {
    ERROR = "ERROR",
    WARN = "WARN",
    INFO = "INFO",
    DEBUG = "DEBUG",
}

/**
 * Context object for additional error information.
 */
export interface LogContext {
    [key: string]: unknown;
}

/**
 * Centralized logger instance.
 */
export const logger = {
    /**
     * Log an error with optional context.
     *
     * @param message - Human-readable error description
     * @param error - Error object (optional)
     * @param context - Additional context data (optional)
     *
     * @example
     * ```typescript
     * logger.error('Failed to fetch user data', error, { userId: '123' });
     * ```
     */
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

        // TODO: Send to error tracking service (e.g., Sentry, LogRocket)
        // if (process.env.NODE_ENV === 'production') {
        //   sendToErrorService(logEntry);
        // }
    },

    /**
     * Log a warning message.
     *
     * @param message - Warning description
     * @param context - Additional context data (optional)
     *
     * @example
     * ```typescript
     * logger.warn('Deprecated API usage detected', { api: 'oldMethod' });
     * ```
     */
    warn(message: string, context?: LogContext): void {
        const logEntry = {
            level: LogLevel.WARN,
            message,
            context,
            timestamp: new Date().toISOString(),
        };

        console.warn(`[${LogLevel.WARN}] ${message}`, logEntry);
    },

    /**
     * Log an informational message (development only).
     *
     * @param message - Info message
     * @param data - Additional data to log (optional)
     *
     * @example
     * ```typescript
     * logger.info('User logged in', { userId: '123' });
     * ```
     */
    info(message: string, data?: unknown): void {
        if (process.env.NODE_ENV === "development") {
            console.log(`[${LogLevel.INFO}] ${message}`, data);
        }
    },

    /**
     * Log a debug message (development only).
     *
     * @param message - Debug message
     * @param data - Debug data (optional)
     *
     * @example
     * ```typescript
     * logger.debug('State updated', { newState });
     * ```
     */
    debug(message: string, data?: unknown): void {
        if (process.env.NODE_ENV === "development") {
            console.debug(`[${LogLevel.DEBUG}] ${message}`, data);
        }
    },
};
