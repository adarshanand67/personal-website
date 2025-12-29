/**
 * @fileoverview Consolidated error handling components.
 * Provides error boundaries and fallback UI for the application.
 */

"use client";

import React from "react";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";
import Link from "next/link";
import { logger } from "@/lib/logger";

// ============================================================================
// ErrorFallback Component
// ============================================================================

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

// ============================================================================
// GlobalErrorBoundary Component
// ============================================================================

interface GlobalErrorBoundaryProps {
    children: React.ReactNode;
}

interface GlobalErrorBoundaryState {
    hasError: boolean;
    error: Error | null;
}

/**
 * Global error boundary to catch and handle React errors.
 * Wraps the entire application to catch any unhandled errors.
 */
export class GlobalErrorBoundary extends React.Component<
    GlobalErrorBoundaryProps,
    GlobalErrorBoundaryState
> {
    constructor(props: GlobalErrorBoundaryProps) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error: Error): GlobalErrorBoundaryState {
        return { hasError: true, error };
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
        logger.error("React Error Boundary caught an error", error, {
            componentStack: errorInfo.componentStack,
            errorBoundary: "GlobalErrorBoundary",
        });
    }

    resetError = (): void => {
        this.setState({ hasError: false, error: null });
    };

    render() {
        if (this.state.hasError) {
            return <ErrorFallback error={this.state.error} resetErrorBoundary={this.resetError} />;
        }

        return this.props.children;
    }
}

// ============================================================================
// MusicPlayerErrorBoundary Component
// ============================================================================

interface MusicPlayerErrorBoundaryProps {
    children: React.ReactNode;
}

interface MusicPlayerErrorBoundaryState {
    hasError: boolean;
    error: Error | null;
}

/**
 * Error boundary specifically for the music player component.
 * Catches errors in audio playback and provides graceful fallback.
 */
export class MusicPlayerErrorBoundary extends React.Component<
    MusicPlayerErrorBoundaryProps,
    MusicPlayerErrorBoundaryState
> {
    constructor(props: MusicPlayerErrorBoundaryProps) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error: Error): MusicPlayerErrorBoundaryState {
        return { hasError: true, error };
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
        logger.error("Music Player Error", error, {
            componentStack: errorInfo.componentStack,
            errorBoundary: "MusicPlayerErrorBoundary",
        });
    }

    resetError = (): void => {
        this.setState({ hasError: false, error: null });
    };

    render() {
        if (this.state.hasError) {
            return (
                <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                    <h3 className="text-red-800 dark:text-red-200 font-semibold mb-2">
                        Music Player Error
                    </h3>
                    <p className="text-red-600 dark:text-red-300 text-sm mb-3">
                        Unable to load the music player. Please try refreshing the page.
                    </p>
                    <button
                        onClick={this.resetError}
                        className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white text-sm rounded transition-colors"
                    >
                        Retry
                    </button>
                </div>
            );
        }

        return this.props.children;
    }
}
