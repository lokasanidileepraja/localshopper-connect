
import { Button } from "@/components/ui/button";
import { AlertTriangle, Home, RefreshCw, ArrowLeft, Settings, Shield } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useEffect } from "react";

interface AdminFallbackPageProps {
  error?: Error;
  resetError?: () => void;
}

export const AdminFallbackPage = ({ error, resetError }: AdminFallbackPageProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  useEffect(() => {
    toast({
      title: "Admin Dashboard Error",
      description: "There was a problem loading the admin dashboard",
      variant: "destructive"
    });
  }, [toast]);

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <div className="flex items-center gap-2 mb-2">
            <div className="bg-red-100 p-2 rounded-full">
              <Shield className="h-6 w-6 text-red-600" />
            </div>
            <CardTitle>Admin Dashboard Error</CardTitle>
          </div>
        </CardHeader>
        
        <CardContent>
          <div className="flex flex-col items-center mb-6">
            <AlertTriangle className="h-16 w-16 text-amber-500 mb-4" />
            <h2 className="text-xl font-bold mb-2 text-center">Unable to Load Admin Dashboard</h2>
            <p className="text-muted-foreground text-center">
              We're having trouble loading the admin dashboard. This could be due to a temporary issue with your connection or our servers.
            </p>
            {error && (
              <div className="mt-4 p-3 bg-gray-50 border border-gray-200 rounded-md w-full">
                <p className="font-semibold text-sm text-gray-700 mb-1">Error details:</p>
                <code className="text-xs text-red-600 whitespace-normal break-all">
                  {error.message || "Unknown error"}
                </code>
              </div>
            )}
          </div>
          
          <div className="space-y-4">
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <Settings className="h-5 w-5 text-yellow-400" />
                </div>
                <div className="ml-3">
                  <p className="text-sm text-yellow-700">
                    <strong>Troubleshooting tips:</strong>
                  </p>
                  <ul className="mt-1 list-disc list-inside text-xs text-yellow-700">
                    <li>Check your internet connection</li>
                    <li>Clear your browser cache and cookies</li>
                    <li>Try using a different browser</li>
                    <li>Contact support if the problem persists</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
        
        <CardFooter className="flex flex-wrap gap-3">
          <Button onClick={() => navigate(-1)} variant="outline" size="sm" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Go Back
          </Button>
          
          {resetError && (
            <Button onClick={resetError} variant="outline" size="sm" className="gap-2">
              <RefreshCw className="h-4 w-4" />
              Retry Loading
            </Button>
          )}
          
          <Button onClick={() => window.location.reload()} size="sm" className="gap-2">
            <RefreshCw className="h-4 w-4" />
            Reload Page
          </Button>
          
          <Button onClick={() => navigate("/")} variant="secondary" size="sm" className="gap-2">
            <Home className="h-4 w-4" />
            Return Home
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};
