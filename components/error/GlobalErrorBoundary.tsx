"use client";

import React from "react";
import { logger } from "@/lib/logger";

/**
 * Props for ErrorFallback component.
 *
 * @interface ErrorFallbackProps
 */
interface ErrorFallbackProps {
    /** The error that was caught */
    error: Error | null;
    /** Optional callback to reset the error state */
    resetError?: () => void;
}

/**
 * Error fallback UI displayed when an error is caught.
 * Shows user-friendly error message with option to retry.
 *
 * @component
 * @param {ErrorFallbackProps} props - Component props
 *
 * @example
 * ```tsx
 * <ErrorFallback error={error} resetError={() => window.location.reload()} />
 * ```
 */
function ErrorFallback({ error, resetError }: ErrorFallbackProps) {
    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50 dark:bg-gray-900">
            <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 border border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-red-100 dark:bg-red-900/20 rounded-full">
                    <svg
                        className="w-8 h-8 text-red-600 dark:text-red-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                        />
                    </svg>
                </div>

                <h2 className="text-2xl font-bold text-center mb-2 text-gray-900 dark:text-white">
                    Something went wrong
                </h2>

                <p className="text-gray-600 dark:text-gray-400 text-center mb-6">
                    We encountered an unexpected error. Please try refreshing the page.
                </p>

                {process.env.NODE_ENV === "development" && error && (
                    <details className="mb-6 p-4 bg-gray-100 dark:bg-gray-900 rounded-lg">
                        <summary className="cursor-pointer font-mono text-sm text-red-600 dark:text-red-400 mb-2">
                            Error Details (Development Only)
                        </summary>
                        <pre className="text-xs overflow-auto text-gray-700 dark:text-gray-300">
                            {error.message}
                            {"\n\n"}
                            {error.stack}
                        </pre>
                    </details>
                )}

                <div className="flex gap-3">
                    <button
                        onClick={() => window.location.reload()}
                        className="flex-1 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium transition-colors"
                    >
                        Refresh Page
                    </button>
                    {resetError && (
                        <button
                            onClick={resetError}
                            className="flex-1 px-4 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-900 dark:text-white rounded-lg font-medium transition-colors"
                        >
                            Try Again
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}

/**
 * Props for GlobalErrorBoundary component.
 *
 * @interface GlobalErrorBoundaryProps
 */
interface GlobalErrorBoundaryProps {
    /** Child components to wrap with error boundary */
    children: React.ReactNode;
}

/**
 * State for GlobalErrorBoundary component.
 *
 * @interface GlobalErrorBoundaryState
 */
interface GlobalErrorBoundaryState {
    /** Whether an error has been caught */
    hasError: boolean;
    /** The error that was caught */
    error: Error | null;
}

/**
 * Global error boundary to catch and handle React errors.
 * Displays user-friendly error UI and logs errors for debugging.
 * Wraps the entire application to catch any unhandled errors.
 *
 * @component
 * @class
 *
 * @example
 * ```tsx
 * <GlobalErrorBoundary>
 *   <App />
 * </GlobalErrorBoundary>
 * ```
 */
export class GlobalErrorBoundary extends React.Component<
    GlobalErrorBoundaryProps,
    GlobalErrorBoundaryState
> {
    constructor(props: GlobalErrorBoundaryProps) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    /**
     * Update state when an error is caught.
     *
     * @param error - The error that was thrown
     * @returns New state with error information
     */
    static getDerivedStateFromError(error: Error): GlobalErrorBoundaryState {
        return { hasError: true, error };
    }

    /**
     * Log error details when component catches an error.
     *
     * @param error - The error that was thrown
     * @param errorInfo - React error information with component stack
     */
    componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
        logger.error("React Error Boundary caught an error", error, {
            componentStack: errorInfo.componentStack,
            errorBoundary: "GlobalErrorBoundary",
        });
    }

    /**
     * Reset error state to allow retry.
     */
    resetError = (): void => {
        this.setState({ hasError: false, error: null });
    };

    render() {
        if (this.state.hasError) {
            return <ErrorFallback error={this.state.error} resetError={this.resetError} />;
        }

        return this.props.children;
    }
}
