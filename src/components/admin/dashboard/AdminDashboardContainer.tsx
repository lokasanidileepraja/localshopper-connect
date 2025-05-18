
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
  
  // Error handling function for sub-components
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

  return (
    <div className="container mx-auto px-4 py-6">
      <ErrorBoundary onError={handleSectionError("Header")}>
        <Suspense fallback={<Skeleton className="h-12 w-2/3 mb-4" />}>
          <HeaderSection />
        </Suspense>
      </ErrorBoundary>
      
      <ErrorBoundary onError={handleSectionError("Summary Metrics")}>
        <Suspense fallback={<Skeleton className="h-32 w-full mb-6" />}>
          <SummaryMetrics />
        </Suspense>
      </ErrorBoundary>
      
      <ErrorBoundary onError={handleSectionError("Performance Metrics")}>
        <Suspense fallback={<Skeleton className="h-64 w-full mb-6" />}>
          <PerformanceMetrics />
        </Suspense>
      </ErrorBoundary>
      
      <ErrorBoundary onError={handleSectionError("Tabs Section")}>
        <Suspense fallback={<Skeleton className="h-48 w-full" />}>
          <TabsSection />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
};

export default memo(AdminDashboardContainer);
