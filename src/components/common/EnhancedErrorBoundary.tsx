
import { Component, ErrorInfo, ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { AlertTriangle, RefreshCw, Home, Bug } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
  resetKeys?: any[];
  boundary: string;
  router?: any;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

/**
 * Enhanced error boundary component with detailed error reporting
 * and improved recovery options
 */
export class EnhancedErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error, errorInfo: null };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Call the onError callback if provided
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }
    
    // Log the error with boundary information for better debugging
    console.error(`Error in ${this.props.boundary} boundary:`, error);
    console.error("Component stack:", errorInfo.componentStack);
    
    // Track error in analytics
    console.log(`Error tracked in ${this.props.boundary}: ${error.message}`);
    
    this.setState({
      error,
      errorInfo,
    });
  }

  // Reset error boundary if any of the reset keys change
  componentDidUpdate(prevProps: Props) {
    if (this.state.hasError && this.props.resetKeys) {
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
            boundary={this.props.boundary}
          />
        )
      );
    }

    return this.props.children;
  }
}

// Separate component for the error UI
const ErrorFallback = ({ 
  error, 
  errorInfo, 
  resetErrorBoundary,
  boundary
}: { 
  error: Error | null;
  errorInfo: ErrorInfo | null;
  resetErrorBoundary: () => void;
  boundary: string;
}) => {
  // Use navigate to allow going back to home
  const navigate = useNavigate();
  
  const handleGoHome = () => {
    resetErrorBoundary();
    navigate('/');
  };
  
  const handleReportError = () => {
    // In a real app, this would send the error to a reporting service
    console.log("Error reported:", {
      error: error?.toString(),
      stack: error?.stack,
      componentStack: errorInfo?.componentStack,
      boundary
    });
    
    alert("Error has been reported to our team.");
  };
  
  return (
    <div className="flex flex-col items-center justify-center min-h-[300px] p-6 bg-gray-50 rounded-lg">
      <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-red-100 mb-4">
        <AlertTriangle className="h-8 w-8 text-red-500" />
      </div>
      <h1 className="text-xl font-bold mb-2">Something went wrong in {boundary}</h1>
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
        <Button
          onClick={handleReportError}
          className="gap-2"
          variant="secondary"
        >
          <Bug className="h-4 w-4" />
          Report Bug
        </Button>
      </div>
    </div>
  );
};
