/** Error handling utilities and helpers. */

/** Custom error class for application-specific errors. */
export class AppError extends Error {
    constructor(
        message: string,
        public code?: string,
        public statusCode?: number
    ) {
        super(message);
        this.name = "AppError";
    }
}

/** Safely executes an async function, returns [data, error] tuple. */
export async function safeAsync<T>(promise: Promise<T>): Promise<[T | null, Error | null]> {
    try {
        const data = await promise;
        return [data, null];
    } catch (error) {
        return [null, error instanceof Error ? error : new Error(String(error))];
    }
}

/** Safely executes a synchronous function, returns [data, error] tuple. */
export function safeSync<T>(fn: () => T): [T | null, Error | null] {
    try {
        const data = fn();
        return [data, null];
    } catch (error) {
        return [null, error instanceof Error ? error : new Error(String(error))];
    }
}

/** Validates that a value is not null or undefined. */
export function assertNotNull<T>(value: T | null | undefined, fieldName: string): T {
    if (value === null || value === undefined) {
        throw new AppError(`${fieldName} is required but was ${value}`, "NULL_VALUE");
    }
    return value;
}

/** Safely accesses a nested property with a fallback value. */
export function safeAccess<T>(accessor: () => T, fallback: T): T {
    try {
        return accessor() ?? fallback;
    } catch {
        return fallback;
    }
}

/** Logs an error with context information. */
export function logError(error: Error, context?: Record<string, any>): void {
    if (process.env.NODE_ENV === "development") {
        console.error("Error:", error);
        if (context) {
            console.error("Context:", context);
        }
    } else {
        console.error(error.message);
    }
}

/** Creates a user-friendly error message from an error object. */
export function getErrorMessage(error: unknown, fallback = "An error occurred"): string {
    if (error instanceof AppError) {
        return error.message;
    }
    if (error instanceof Error) {
        return error.message;
    }
    if (typeof error === "string") {
        return error;
    }
    return fallback;
}

/** Retry a function with exponential backoff. */
export async function retryWithBackoff<T>(
    fn: () => Promise<T>,
    maxRetries = 3,
    delayMs = 1000
): Promise<T> {
    let lastError: Error | null = null;

    for (let i = 0; i < maxRetries; i++) {
        const [result, error] = await safeAsync(fn());

        if (!error) {
            return result as T;
        }

        lastError = error;

        if (i < maxRetries - 1) {
            await new Promise((resolve) => setTimeout(resolve, delayMs * Math.pow(2, i)));
        }
    }

    throw lastError || new Error("Max retries exceeded");
}

