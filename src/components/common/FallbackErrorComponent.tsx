
import { Button } from "@/components/ui/button";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { memo } from "react";

interface FallbackErrorComponentProps {
  error?: Error;
  resetError?: () => void;
  title?: string;
  description?: string;
  showHomeButton?: boolean;
  showReloadButton?: boolean;
  showResetButton?: boolean;
  className?: string;
}

export const FallbackErrorComponent = memo(({
  error,
  resetError,
  title = "Something went wrong",
  description,
  showHomeButton = true,
  showReloadButton = true,
  showResetButton = true,
  className = "",
}: FallbackErrorComponentProps) => {
  const navigate = useNavigate();
  
  const errorMessage = description || error?.message || "An unexpected error occurred";
  
  const handleReset = () => {
    if (resetError) {
      resetError();
    }
  };
  
  const handleReload = () => {
    window.location.reload();
  };
  
  const handleGoHome = () => {
    navigate("/");
  };
  
  return (
    <div className={`flex flex-col items-center justify-center p-6 rounded-lg border border-gray-100 bg-gray-50 ${className}`}>
      <AlertTriangle className="h-12 w-12 text-amber-500 mb-4" />
      
      <h2 className="text-xl font-semibold mb-2 text-center">{title}</h2>
      
      <p className="text-muted-foreground mb-6 text-center max-w-md">
        {errorMessage}
      </p>
      
      <div className="flex flex-wrap gap-3 justify-center">
        {showResetButton && resetError && (
          <Button 
            variant="outline" 
            onClick={handleReset}
            className="flex items-center gap-2"
          >
            <RefreshCw className="h-4 w-4" />
            Try again
          </Button>
        )}
        
        {showReloadButton && (
          <Button 
            onClick={handleReload}
            className="flex items-center gap-2"
          >
            <RefreshCw className="h-4 w-4" />
            Reload page
          </Button>
        )}
        
        {showHomeButton && (
          <Button 
            variant="secondary" 
            onClick={handleGoHome}
            className="flex items-center gap-2"
          >
            <Home className="h-4 w-4" />
            Go to Home
          </Button>
        )}
      </div>
      
      {error && process.env.NODE_ENV !== 'production' && (
        <div className="mt-6 p-4 bg-gray-100 rounded-md w-full max-w-lg overflow-auto text-xs">
          <div className="font-semibold mb-1">Error details:</div>
          <code className="text-rose-600 whitespace-pre-wrap">{error.stack || error.message}</code>
        </div>
      )}
    </div>
  );
});

FallbackErrorComponent.displayName = "FallbackErrorComponent";
