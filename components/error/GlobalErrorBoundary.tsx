"use client";

import React from "react";
import { logger } from "@/lib/logger";
import { ErrorFallback } from "./ErrorFallback";

/**
 * Props for GlobalErrorBoundary component.
 *

 */
interface GlobalErrorBoundaryProps {
    /** Child components to wrap with error boundary */
    children: React.ReactNode;
}

/**
 * State for GlobalErrorBoundary component.
 *

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
            return <ErrorFallback error={this.state.error} resetErrorBoundary={this.resetError} />;
        }

        return this.props.children;
    }
}
