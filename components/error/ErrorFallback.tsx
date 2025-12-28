/**
 * @fileoverview Error fallback component for displaying user-friendly error messages.
 * Provides a consistent error UI across the application with retry functionality.
 */

"use client";

import { AlertTriangle, RefreshCw, Home } from "lucide-react";
import Link from "next/link";

/**
 * Props for ErrorFallback component.
 */
interface ErrorFallbackProps {
    error?: Error | null;
    resetErrorBoundary?: () => void;
    title?: string;
    message?: string;
    showHomeButton?: boolean;
}

/**
 * ErrorFallback Component - displays a user-friendly error message.
 * Used by error boundaries and error pages throughout the application.
 *

 * @example
 * ```tsx
 * <ErrorFallback
 *   error={error}
 *   resetErrorBoundary={reset}
 *   title="Something went wrong"
 * />
 * ```
 */
export function ErrorFallback({
    error,
    resetErrorBoundary,
    title = "Something went wrong",
    message,
    showHomeButton = true,
}: ErrorFallbackProps) {
    const errorMessage =
        message || error?.message || "An unexpected error occurred. Please try again.";

    return (
        <div className="min-h-[400px] flex items-center justify-center p-6">
            <div className="max-w-md w-full">
                <div className="glass-apple dark:bg-black/40 backdrop-blur-xl rounded-2xl p-8 border border-white/10 dark:border-white/5 shadow-2xl">
                    {/* Error Icon */}
                    <div className="flex justify-center mb-6">
                        <div className="w-16 h-16 rounded-full bg-red-500/10 dark:bg-red-500/20 flex items-center justify-center">
                            <AlertTriangle className="w-8 h-8 text-red-500 dark:text-red-400" />
                        </div>
                    </div>

                    {/* Error Title */}
                    <h2 className="text-2xl font-black text-center text-gray-900 dark:text-white mb-3 tracking-tight">
                        {title}
                    </h2>

                    {/* Error Message */}
                    <p className="text-sm text-center text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                        {errorMessage}
                    </p>

                    {/* Error Details (Development Only) */}
                    {process.env.NODE_ENV === "development" && error?.stack && (
                        <details className="mb-6">
                            <summary className="text-xs text-gray-500 dark:text-gray-500 cursor-pointer hover:text-gray-700 dark:hover:text-gray-300 transition-colors">
                                View Error Details
                            </summary>
                            <pre className="mt-2 text-xs bg-gray-100 dark:bg-gray-900 p-3 rounded-lg overflow-auto max-h-40 text-gray-700 dark:text-gray-300">
                                {error.stack}
                            </pre>
                        </details>
                    )}

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-3">
                        {resetErrorBoundary && (
                            <button
                                onClick={resetErrorBoundary}
                                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gray-900 dark:bg-white text-white dark:text-black rounded-xl font-bold text-sm hover:scale-105 transition-transform duration-200 shadow-lg"
                            >
                                <RefreshCw className="w-4 h-4" />
                                Try Again
                            </button>
                        )}
                        {showHomeButton && (
                            <Link
                                href="/"
                                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white rounded-xl font-bold text-sm hover:scale-105 transition-transform duration-200"
                            >
                                <Home className="w-4 h-4" />
                                Go Home
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
