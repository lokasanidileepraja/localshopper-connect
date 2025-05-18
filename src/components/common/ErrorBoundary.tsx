
import React, { Component, ErrorInfo, ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
  resetKeys?: any[];
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

  public static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error, errorInfo: null };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Call the onError callback if provided
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }
    
    // Log the error
    console.error("Error caught by ErrorBoundary:", error, errorInfo);
    
    this.setState({
      error,
      errorInfo,
    });
  }

  // Reset error boundary if any of the reset keys change
  componentDidUpdate(prevProps: Props) {
    if (this.state.hasError && this.props.resetKeys) {
      // Check if any reset keys have changed
      const hasChanged = this.props.resetKeys.some((key, index) => {
        return prevProps.resetKeys?.[index] !== key;
      });
      
      if (hasChanged) {
        this.resetErrorBoundary();
      }
    }
  }

  resetErrorBoundary = () => {
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
          <ErrorFallback 
            error={this.state.error} 
            errorInfo={this.state.errorInfo}
            resetErrorBoundary={this.resetErrorBoundary}
          />
        )
      );
    }

    return this.props.children;
  }
}

// Create a separate component for the error UI
const ErrorFallback = ({ 
  error, 
  errorInfo, 
  resetErrorBoundary 
}: { 
  error: Error | null;
  errorInfo: ErrorInfo | null;
  resetErrorBoundary: () => void;
}) => {
  // Use navigate to allow going back to home
  const navigate = useNavigate();
  
  const handleGoHome = () => {
    resetErrorBoundary();
    navigate('/');
  };
  
  return (
    <div className="flex flex-col items-center justify-center min-h-[300px] p-4 bg-gray-50 rounded-lg">
      <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-red-100 mb-4">
        <AlertTriangle className="h-8 w-8 text-red-500" />
      </div>
      <h1 className="text-xl font-bold mb-2">Something went wrong</h1>
      <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md mb-4 text-left overflow-auto max-h-40 w-full max-w-lg">
        <p className="font-mono text-sm">
          {error?.toString() || "An unknown error occurred"}
        </p>
        {errorInfo && (
          <details className="mt-2">
            <summary className="text-xs font-medium text-gray-500 cursor-pointer">
              Component Stack Details
            </summary>
            <pre className="mt-2 text-xs overflow-auto whitespace-pre-wrap">
              {errorInfo.componentStack}
            </pre>
          </details>
        )}
      </div>
      <div className="flex flex-col sm:flex-row gap-2">
        <Button 
          onClick={resetErrorBoundary}
          className="gap-2"
          variant="default"
        >
          <RefreshCw className="h-4 w-4" />
          Try Again
        </Button>
        <Button 
          onClick={handleGoHome}
          className="gap-2"
          variant="outline"
        >
          <Home className="h-4 w-4" />
          Go Home
        </Button>
      </div>
    </div>
  );
};
