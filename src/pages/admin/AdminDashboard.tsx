
import { memo, Suspense, lazy, useCallback } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { ErrorBoundary } from "@/components/common/ErrorBoundary";
import { usePerformanceMonitor } from "@/hooks/usePerformanceMonitor";
import { useToast } from "@/hooks/use-toast";

// Lazy load the dashboard container component
const AdminDashboardContainer = lazy(() => 
  import("@/components/admin/dashboard/AdminDashboardContainer")
);

/**
 * Admin Dashboard page with error boundaries and loading states
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
    <ErrorBoundary 
      onError={handleError}
      fallback={
        <div className="p-8 text-center">
          <p className="text-red-500">Something went wrong loading the dashboard</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
          >
            Reload Page
          </button>
        </div>
      }
    >
      <Suspense fallback={loadingFallback}>
        <AdminDashboardContainer />
      </Suspense>
    </ErrorBoundary>
  );
};

export default memo(AdminDashboard);
