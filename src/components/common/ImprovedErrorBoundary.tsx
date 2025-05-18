
import React, { Component, ErrorInfo, ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Props {
  children: ReactNode;
  name?: string;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
  resetKeys?: any[];
  onRetry?: () => void;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
  errorCount: number;
}

export class ImprovedErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null,
    errorCount: 0
  };

  public static defaultProps = {
    name: "component",
  };

  public static getDerivedStateFromError(error: Error): Partial<State> {
    // Update state so the next render will show the fallback UI.
    return { 
      hasError: true, 
      error
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Update error count
    this.setState(prevState => ({
      errorCount: prevState.errorCount + 1,
      errorInfo
    }));

    // Call the onError callback if provided
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }
    
    // Log the error with component info
    console.error(`Error in ${this.props.name || 'component'}:`, error);
    console.error("Component stack:", errorInfo.componentStack);
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
      errorInfo: null
    });
    
    // Call user-provided onRetry handler if available
    if (this.props.onRetry) {
      this.props.onRetry();
    }
  };

  render() {
    if (this.state.hasError) {
      // Custom fallback UI
      return (
        this.props.fallback || (
          <ErrorFallback 
            error={this.state.error} 
            errorInfo={this.state.errorInfo}
            componentName={this.props.name || 'component'}
            errorCount={this.state.errorCount}
            resetErrorBoundary={this.resetErrorBoundary}
          />
        )
      );
    }

    return this.props.children;
  }
}

interface ErrorFallbackProps {
  error: Error | null;
  errorInfo: ErrorInfo | null;
  componentName: string;
  errorCount: number;
  resetErrorBoundary: () => void;
}

// Separate component for the error UI
const ErrorFallback: React.FC<ErrorFallbackProps> = ({ 
  error, 
  errorInfo, 
  componentName,
  errorCount,
  resetErrorBoundary 
}) => {
  // Use navigate to allow going back to home
  const navigate = useNavigate();
  
  const handleGoHome = () => {
    resetErrorBoundary();
    navigate('/');
  };
  
  // Show a more severe message for repeated errors
  const isSevereError = errorCount > 2;
  
  return (
    <div className={`flex flex-col items-center justify-center min-h-[300px] p-4 rounded-lg ${
      isSevereError ? 'bg-red-50' : 'bg-gray-50'
    }`}>
      <div className={`inline-flex h-16 w-16 items-center justify-center rounded-full ${
        isSevereError ? 'bg-red-100' : 'bg-yellow-100'
      } mb-4`}>
        <AlertTriangle className={`h-8 w-8 ${
          isSevereError ? 'text-red-500' : 'text-yellow-500'
        }`} />
      </div>
      <h1 className="text-xl font-bold mb-2">
        {isSevereError 
          ? `Persistent Error in ${componentName}` 
          : `Something went wrong in ${componentName}`}
      </h1>
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
          variant={isSevereError ? "destructive" : "default"}
        >
          <RefreshCw className="h-4 w-4" />
          {isSevereError ? 'Try Again (Not Recommended)' : 'Try Again'}
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
      {isSevereError && (
        <p className="mt-4 text-xs text-red-600 max-w-md text-center">
          This error has occurred multiple times. You might want to refresh the page or try again later.
        </p>
      )}
    </div>
  );
};
