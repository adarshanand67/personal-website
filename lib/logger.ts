export enum LogLevel {
  ERROR = "ERROR",
  WARN = "WARN",
  INFO = "INFO",
  DEBUG = "DEBUG",
}

export interface LogContext {
  [key: string]: unknown;
}

export const logger = {
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

  warn(message: string, context?: LogContext): void {
    const logEntry = {
      level: LogLevel.WARN,
      message,
      context,
      timestamp: new Date().toISOString(),
    };

    console.warn(`[${LogLevel.WARN}] ${message}`, logEntry);
  },

  info(message: string, data?: unknown): void {
    if (process.env.NODE_ENV === "development") {
      console.log(`[${LogLevel.INFO}] ${message}`, data);
    }
  },

  debug(message: string, data?: unknown): void {
    if (process.env.NODE_ENV === "development") {
      console.debug(`[${LogLevel.DEBUG}] ${message}`, data);
    }
  },
};
