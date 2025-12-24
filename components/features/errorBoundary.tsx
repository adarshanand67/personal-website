"use client";

import React from "react";

/**
 * Error boundary state interface.
 * @interface ErrorBoundaryState
 * @property {boolean} hasError - Whether an error has been caught
 * @property {Error} [error] - The caught error object
 */
interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

/**
 * Error boundary props interface.
 * @interface ErrorBoundaryProps
 * @property {React.ReactNode} children - Child components to wrap
 * @property {React.ComponentType} [fallback] - Optional custom fallback component
 */
interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ComponentType<{ error?: Error; resetError: () => void }>;
}

/**
 * Error Boundary Component - catches React errors in child component tree.
 * Displays fallback UI when errors occur and provides error reset functionality.
 * @class
 * @extends {React.Component<ErrorBoundaryProps, ErrorBoundaryState>}
 */
export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Error caught by boundary:", error, errorInfo);
  }

  resetError = () => {
    this.setState({ hasError: false, error: undefined });
  };

  render() {
    if (this.state.hasError) {
      const FallbackComponent = this.props.fallback || DefaultErrorFallback;
      return <FallbackComponent error={this.state.error} resetError={this.resetError} />;
    }

    return this.props.children;
  }
}

/**
 * Default error fallback component.
 * @param {Object} props - Component props
 * @param {Error} [props.error] - Error object
 * @param {Function} props.resetError - Function to reset error state
 */
function DefaultErrorFallback({ error, resetError }: { error?: Error; resetError: () => void }) {
  return (
    <div className="min-h-[200px] flex items-center justify-center p-8">
      <div className="text-center space-y-4">
        <div className="text-red-500 text-6xl">⚠️</div>
        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
          Something went wrong
        </h3>
        <p className="text-gray-600 dark:text-gray-400 max-w-md">
          {error?.message || "An unexpected error occurred. Please try again."}
        </p>
        <button
          onClick={resetError}
          className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}

/**
 * Hook for error handling in functional components.
 * @returns {Function} Error handler function
 */
export function useErrorHandler() {
  return (error: Error, errorInfo?: { componentStack?: string }) => {
    console.error("Error handled:", error, errorInfo);
    // You could send this to an error reporting service
  };
}
