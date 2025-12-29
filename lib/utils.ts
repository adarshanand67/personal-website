import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { basePath } from "@/lib/constants";

// ============================================================================
// Class Name Utilities
// ============================================================================

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function getAssetPath(path: string): string {
    if (path.startsWith(basePath)) {
        return path;
    }
    return `${basePath}${path}`;
}

// ============================================================================
// Color Utilities
// ============================================================================

const bookPatterns = [
    "bg-red-900",
    "bg-blue-900",
    "bg-green-900",
    "bg-amber-900",
    "bg-slate-800",
    "bg-purple-900",
    "bg-indigo-900",
    "bg-rose-900",
];

const bookGradients = [
    "from-red-900 to-red-950",
    "from-blue-900 to-blue-950",
    "from-green-900 to-green-950",
    "from-amber-900 to-amber-950",
    "from-slate-800 to-slate-900",
    "from-purple-900 to-purple-950",
    "from-indigo-900 to-indigo-950",
    "from-rose-900 to-rose-950",
];

export const getBookStyle = (title: string) => {
    let hash = 0;
    for (let i = 0; i < title.length; i++)
        hash = title.charCodeAt(i) + ((hash << 5) - hash);
    return bookPatterns[Math.abs(hash) % bookPatterns.length];
};

export const getBookGradient = (title: string) => {
    let hash = 0;
    for (let i = 0; i < title.length; i++)
        hash = title.charCodeAt(i) + ((hash << 5) - hash);
    return bookGradients[Math.abs(hash) % bookGradients.length];
};

// ============================================================================

// ============================================================================

export class AppError extends Error {
    constructor(
        message: string,
        public code?: string,
        public statusCode?: number,
    ) {
        super(message);
        this.name = "AppError";
    }
}

export async function safeAsync<T>(
    promise: Promise<T>,
): Promise<[T | null, Error | null]> {
    try {
        return [await promise, null];
    } catch (error) {
        return [null, error instanceof Error ? error : new Error(String(error))];
    }
}

export function safeSync<T>(fn: () => T): [T | null, Error | null] {
    try {
        return [fn(), null];
    } catch (error) {
        return [null, error instanceof Error ? error : new Error(String(error))];
    }
}

export function assertNotNull<T>(
    value: T | null | undefined,
    fieldName: string,
): T {
    if (value === null || value === undefined) {
        throw new AppError(
            `${fieldName} is required but was ${value}`,
            "NULL_VALUE",
        );
    }
    return value;
}

export function safeAccess<T>(accessor: () => T, fallback: T): T {
    try {
        return accessor() ?? fallback;
    } catch {
        return fallback;
    }
}

export function logError(error: Error, context?: Record<string, any>): void {
    if (process.env.NODE_ENV === "development") {
        console.error("Error:", error);
        if (context) console.error("Context:", context);
    } else {
        console.error(error.message);
    }
}

export function getErrorMessage(
    error: unknown,
    fallback = "An error occurred",
): string {
    if (error instanceof AppError) return error.message;
    if (error instanceof Error) return error.message;
    if (typeof error === "string") return error;
    return fallback;
}

export async function retryWithBackoff<T>(
    fn: () => Promise<T>,
    maxRetries = 3,
    delayMs = 1000,
): Promise<T> {
    let lastError: Error | null = null;
    for (let i = 0; i < maxRetries; i++) {
        const [result, error] = await safeAsync(fn());
        if (!error) return result as T;
        lastError = error;
        if (i < maxRetries - 1)
            await new Promise((resolve) =>
                setTimeout(resolve, delayMs * Math.pow(2, i)),
            );
    }
    throw lastError || new Error("Max retries exceeded");
}
