
import React, { Component, ErrorInfo, ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { AlertTriangle, RefreshCw } from "lucide-react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null,
  };

  static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error, errorInfo: null };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log the error to an error reporting service
    console.error("Error caught by ErrorBoundary:", error, errorInfo);
    this.setState({
      error,
      errorInfo,
    });
  }

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
  };

  render() {
    if (this.state.hasError) {
      // Custom fallback UI
      return (
        this.props.fallback || (
          <div className="min-h-screen flex items-center justify-center bg-background p-4">
            <div className="max-w-md w-full text-center">
              <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-red-100 mb-6">
                <AlertTriangle className="h-10 w-10 text-red-500" />
              </div>
              <h1 className="text-2xl font-bold mb-4">Something went wrong</h1>
              <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md mb-6 text-left overflow-auto max-h-48">
                <p className="font-mono text-sm">
                  {this.state.error?.toString() || "An unknown error occurred"}
                </p>
              </div>
              <Button 
                onClick={this.handleReset}
                className="gap-2"
                size="lg"
              >
                <RefreshCw className="h-4 w-4" />
                Try Again
              </Button>
            </div>
          </div>
        )
      );
    }

    return this.props.children;
  }
}
