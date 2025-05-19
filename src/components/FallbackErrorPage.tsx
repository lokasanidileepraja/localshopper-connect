
import { Button } from "@/components/ui/button";
import { AlertTriangle, Home, RefreshCw, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface FallbackErrorPageProps {
  error?: Error;
  resetError?: () => void;
  message?: string;
}

export const FallbackErrorPage = ({
  error,
  resetError,
  message = "We couldn't load the page you requested"
}: FallbackErrorPageProps) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] p-8">
      <div className="bg-red-100 p-4 rounded-full mb-6">
        <AlertTriangle className="h-12 w-12 text-red-600" />
      </div>
      
      <h1 className="text-2xl font-bold mb-2 text-center">Something went wrong</h1>
      
      <p className="text-muted-foreground mb-6 text-center max-w-md">
        {message}
        {error?.message && (
          <span className="block mt-2 text-sm font-mono bg-gray-100 p-2 rounded">
            {error.message}
          </span>
        )}
      </p>
      
      <div className="flex flex-wrap gap-4 justify-center">
        <Button onClick={() => navigate(-1)} variant="outline" className="gap-2">
          <ArrowLeft className="h-4 w-4" />
          Go Back
        </Button>
        
        <Button onClick={() => window.location.reload()} className="gap-2">
          <RefreshCw className="h-4 w-4" />
          Reload Page
        </Button>
        
        <Button onClick={() => navigate("/")} variant="secondary" className="gap-2">
          <Home className="h-4 w-4" />
          Return Home
        </Button>
      </div>
    </div>
  );
};
