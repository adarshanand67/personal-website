"use client";

import React from "react";
import { logger } from "@/lib/logger";

/**
 * Props for MusicPlayerErrorBoundary component.
 */
interface MusicPlayerErrorBoundaryProps {
    children: React.ReactNode;
}

/**
 * State for MusicPlayerErrorBoundary component.
 */
interface MusicPlayerErrorBoundaryState {
    hasError: boolean;
    error: Error | null;
}

/**
 * Error boundary specifically for the music player component.
 * Catches errors in audio playback and provides graceful fallback.
 *
 * @component
 * @class
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
