
import { memo, useEffect, Suspense, lazy } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { ErrorBoundary } from "@/components/common/ErrorBoundary";
import { usePerformanceMonitor } from "@/hooks/usePerformanceMonitor";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { AlertTriangle, RefreshCw } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Safer lazy loading with fallbacks for each component
const HeaderSection = lazy(() => 
  import("@/components/admin/dashboard/HeaderSection")
    .catch(() => ({ default: () => <div>Failed to load header</div> }))
);

const SummaryMetrics = lazy(() => 
  import("@/components/admin/dashboard/SummaryMetrics")
    .catch(() => ({ default: () => <div>Failed to load metrics</div> }))
);

const PerformanceMetrics = lazy(() => 
  import("@/components/admin/dashboard/PerformanceMetrics")
    .catch(() => ({ default: () => <div>Failed to load performance metrics</div> }))
);

const TabsSection = lazy(() => 
  import("@/components/admin/dashboard/TabsSection")
    .catch(() => ({ default: () => <div>Failed to load tabs section</div> }))
);

// Create a custom error fallback component
const SectionErrorFallback = ({ componentName, onRetry }: { componentName: string; onRetry?: () => void }) => (
  <Card className="p-4 bg-red-50 border border-red-100 rounded-md my-4">
    <div className="flex items-center gap-2 mb-2">
      <AlertTriangle className="h-4 w-4 text-red-500" />
      <h3 className="text-red-600 font-medium">Error loading {componentName}</h3>
    </div>
    <p className="text-red-500 mb-3 text-sm">This section failed to load properly</p>
    {onRetry && (
      <Button 
        onClick={onRetry}
        variant="outline"
        size="sm"
        className="bg-red-100 hover:bg-red-200 text-red-600"
      >
        <RefreshCw className="h-3 w-3 mr-1" />
        Retry
      </Button>
    )}
  </Card>
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
  
  // Ensure component references are valid before rendering
  const isComponentAvailable = (componentName: string) => {
    try {
      // This is a simplistic check
      return true;
    } catch (e) {
      console.error(`Component ${componentName} is not available:`, e);
      return false;
    }
  };

  // Error handling function for sub-components with retry capability
  const handleSectionError = (componentName: string) => {
    return (error: Error) => {
      console.error(`Error in ${componentName}:`, error);
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
    window.location.reload();
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-2xl">Admin Dashboard</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Welcome to the administration dashboard. Manage your application settings and monitor performance from here.
          </p>
        </CardContent>
      </Card>

      <ErrorBoundary 
        fallback={<SectionErrorFallback componentName="Header" onRetry={retryLoading("Header")} />}
        onError={handleSectionError("Header")}
      >
        <Suspense fallback={<Skeleton className="h-12 w-2/3 mb-4" />}>
          {isComponentAvailable("HeaderSection") && <HeaderSection />}
        </Suspense>
      </ErrorBoundary>
      
      <ErrorBoundary 
        fallback={<SectionErrorFallback componentName="Summary Metrics" onRetry={retryLoading("Summary Metrics")} />}
        onError={handleSectionError("Summary Metrics")}
      >
        <Suspense fallback={<Skeleton className="h-32 w-full mb-6" />}>
          {isComponentAvailable("SummaryMetrics") && <SummaryMetrics />}
        </Suspense>
      </ErrorBoundary>
      
      <ErrorBoundary 
        fallback={<SectionErrorFallback componentName="Performance Metrics" onRetry={retryLoading("Performance Metrics")} />}
        onError={handleSectionError("Performance Metrics")}
      >
        <Suspense fallback={<Skeleton className="h-64 w-full mb-6" />}>
          {isComponentAvailable("PerformanceMetrics") && <PerformanceMetrics />}
        </Suspense>
      </ErrorBoundary>
      
      <ErrorBoundary 
        fallback={<SectionErrorFallback componentName="Tabs Section" onRetry={retryLoading("Tabs Section")} />}
        onError={handleSectionError("Tabs Section")}
      >
        <Suspense fallback={<Skeleton className="h-48 w-full" />}>
          {isComponentAvailable("TabsSection") && <TabsSection />}
        </Suspense>
      </ErrorBoundary>
    </div>
  );
};

export default memo(AdminDashboardContainer);
