
import { memo, Suspense, lazy, useCallback } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { ErrorBoundary } from "@/components/common/ErrorBoundary";
import { usePerformanceMonitor } from "@/hooks/usePerformanceMonitor";
import { useToast } from "@/hooks/use-toast";
import { Card } from "@/components/ui/card";
import { AlertTriangle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

// Lazy load the dashboard container component with error handling
const AdminDashboardContainer = lazy(() => 
  import("@/components/admin/dashboard/AdminDashboardContainer")
    .then(module => module)
    .catch(error => {
      console.error("Failed to load AdminDashboardContainer:", error);
      // Return a placeholder component when loading fails
      return {
        default: () => (
          <Card className="p-6 text-center">
            <AlertTriangle className="h-12 w-12 text-amber-500 mx-auto mb-4" />
            <h2 className="text-xl font-bold mb-2">Dashboard Component Failed to Load</h2>
            <p className="text-muted-foreground mb-4">There was a problem loading the dashboard components.</p>
            <Button onClick={() => window.location.reload()} className="mx-auto">
              <RefreshCw className="h-4 w-4 mr-2" />
              Reload Page
            </Button>
          </Card>
        )
      };
    })
);

/**
 * Admin Dashboard page with enhanced error boundaries and loading states
 */
const AdminDashboard = () => {
  // Monitor component performance
  usePerformanceMonitor('AdminDashboardPage');
  
  const { toast } = useToast();
  
  // Handle error with a stable callback
  const handleError = useCallback((error: Error) => {
    console.error("Dashboard error:", error);
    toast({
      title: "Dashboard Error",
      description: "There was a problem loading the dashboard",
      variant: "destructive"
    });
  }, [toast]);

  // Loading fallback component
  const loadingFallback = (
    <div className="container mx-auto p-8">
      <Skeleton className="h-12 w-1/3 mb-8" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Skeleton className="h-24" />
        <Skeleton className="h-24" />
        <Skeleton className="h-24" />
      </div>
      <Skeleton className="h-[400px] w-full" />
    </div>
  );

  return (
    <div className="container mx-auto">
      <ErrorBoundary 
        onError={handleError}
        fallback={(error, resetError) => (
          <div className="p-8 text-center">
            <AlertTriangle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h2 className="text-xl font-bold mb-2">Dashboard Error</h2>
            <p className="text-muted-foreground mb-4">
              {error?.message || "Something went wrong loading the dashboard"}
            </p>
            <div className="flex gap-2 justify-center">
              <Button 
                onClick={resetError}
                variant="outline"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Try Again
              </Button>
              <Button 
                onClick={() => window.location.reload()} 
              >
                Reload Page
              </Button>
            </div>
          </div>
        )}
      >
        <Suspense fallback={loadingFallback}>
          <AdminDashboardContainer />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
};

export default memo(AdminDashboard);
