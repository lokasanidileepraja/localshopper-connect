
import { memo, useEffect, Suspense, lazy } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { ErrorBoundary } from "@/components/common/ErrorBoundary";
import { usePerformanceMonitor } from "@/hooks/usePerformanceMonitor";
import { useToast } from "@/hooks/use-toast";

// Lazy load sub-components
const HeaderSection = lazy(() => import("@/components/admin/dashboard/HeaderSection"));
const SummaryMetrics = lazy(() => import("@/components/admin/dashboard/SummaryMetrics"));
const PerformanceMetrics = lazy(() => import("@/components/admin/dashboard/PerformanceMetrics"));
const TabsSection = lazy(() => import("@/components/admin/dashboard/TabsSection"));

// Create a custom error fallback component
const SectionErrorFallback = ({ componentName, onRetry }: { componentName: string; onRetry?: () => void }) => (
  <div className="p-4 bg-red-50 border border-red-100 rounded-md my-4">
    <h3 className="text-red-600 font-medium mb-2">Error loading {componentName}</h3>
    <p className="text-red-500 mb-3 text-sm">This section failed to load properly</p>
    {onRetry && (
      <button 
        onClick={onRetry}
        className="px-3 py-1 bg-red-100 hover:bg-red-200 text-red-600 rounded text-sm transition-colors"
      >
        Retry
      </button>
    )}
  </div>
);

/**
 * Contains the admin dashboard content
 * Wrapped with memo to prevent unnecessary re-renders
 */
const AdminDashboardContainer = () => {
  // Monitor component performance
  usePerformanceMonitor('AdminDashboardContainer');
  
  const { toast } = useToast();
  
  useEffect(() => {
    console.log('Admin dashboard mounted');
    
    // Show welcome toast
    toast({
      title: "Dashboard Loaded",
      description: "Welcome to the admin dashboard"
    });
    
    // Return cleanup function
    return () => {
      console.log('Admin dashboard unmounted, cleaning up resources');
    };
  }, [toast]);
  
  // Error handling function for sub-components with retry capability
  const handleSectionError = (componentName: string) => {
    return () => {
      console.error(`Error in ${componentName}`);
      toast({
        title: `Error in ${componentName}`,
        description: "This section failed to load properly",
        variant: "destructive"
      });
    };
  };

  // Retry loading handlers
  const retryLoading = (componentName: string) => () => {
    toast({
      title: `Retrying ${componentName}`,
      description: "Attempting to reload the component"
    });
    // Force a re-render by updating state in a parent component (not implemented here)
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <ErrorBoundary 
        fallback={<SectionErrorFallback componentName="Header" onRetry={retryLoading("Header")} />}
        onError={handleSectionError("Header")}
      >
        <Suspense fallback={<Skeleton className="h-12 w-2/3 mb-4" />}>
          <HeaderSection />
        </Suspense>
      </ErrorBoundary>
      
      <ErrorBoundary 
        fallback={<SectionErrorFallback componentName="Summary Metrics" onRetry={retryLoading("Summary Metrics")} />}
        onError={handleSectionError("Summary Metrics")}
      >
        <Suspense fallback={<Skeleton className="h-32 w-full mb-6" />}>
          <SummaryMetrics />
        </Suspense>
      </ErrorBoundary>
      
      <ErrorBoundary 
        fallback={<SectionErrorFallback componentName="Performance Metrics" onRetry={retryLoading("Performance Metrics")} />}
        onError={handleSectionError("Performance Metrics")}
      >
        <Suspense fallback={<Skeleton className="h-64 w-full mb-6" />}>
          <PerformanceMetrics />
        </Suspense>
      </ErrorBoundary>
      
      <ErrorBoundary 
        fallback={<SectionErrorFallback componentName="Tabs Section" onRetry={retryLoading("Tabs Section")} />}
        onError={handleSectionError("Tabs Section")}
      >
        <Suspense fallback={<Skeleton className="h-48 w-full" />}>
          <TabsSection />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
};

export default memo(AdminDashboardContainer);
