'use client';

import React, { Component, ErrorInfo, ReactNode } from 'react';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

/**
 * Error Boundary component to catch JavaScript errors in component tree
 *
 * Features:
 * - Catches errors in component tree
 * - Displays fallback UI
 * - Logs error information
 * - Provides recovery option
 */
export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log error to console
    console.error('ErrorBoundary caught an error:', error, errorInfo);

    // Call custom error handler if provided
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }
  }

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
    });
  };

  render() {
    if (this.state.hasError) {
      // Use custom fallback if provided
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Default fallback UI
      return (
        <div className="flex min-h-screen items-center justify-center bg-[#050505] px-4">
          <div className="max-w-md rounded-lg border border-[#7000FF]/30 bg-[#050505]/80 p-8 text-center backdrop-blur-sm">
            <div className="mb-4 text-6xl">🌱</div>
            <h2 className="mb-4 text-2xl font-bold text-[#00FFCC]">Something went wrong</h2>
            <p className="mb-6 text-[#A0A0A0]">
              The neural garden encountered an unexpected error. Don't worry, the roots are still
              growing.
            </p>
            {this.state.error && (
              <details className="mb-6 text-left">
                <summary className="cursor-pointer text-sm text-[#7000FF] hover:text-[#7000FF]/80">
                  Error Details
                </summary>
                <pre className="mt-2 overflow-auto rounded bg-[#050505] p-4 text-xs text-[#A0A0A0]">
                  {this.state.error.toString()}
                </pre>
              </details>
            )}
            <button
              onClick={this.handleReset}
              className="rounded-lg bg-[#00FFCC]/10 px-6 py-3 text-[#00FFCC] transition-all hover:bg-[#00FFCC]/20 hover:shadow-[0_0_20px_rgba(0,255,204,0.3)]"
            >
              Try Again
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
