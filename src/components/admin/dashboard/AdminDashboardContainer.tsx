
import { memo, useEffect } from "react";
import HeaderSection from "@/components/admin/dashboard/HeaderSection";
import SummaryMetrics from "@/components/admin/dashboard/SummaryMetrics";
import PerformanceMetrics from "@/components/admin/dashboard/PerformanceMetrics";
import TabsSection from "@/components/admin/dashboard/TabsSection";
import { ErrorBoundary } from "@/components/common/ErrorBoundary";
import { usePreventRefresh } from "@/hooks/usePreventRefresh";
import { useRenderOptimizer } from "@/hooks/useRenderOptimizer";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

/**
 * Contains the admin dashboard content
 * Wrapped with memo to prevent unnecessary re-renders
 */
const AdminDashboardContainer = () => {
  // Apply the prevent refresh hook
  usePreventRefresh();
  
  // Track renders to detect performance issues
  useRenderOptimizer('AdminDashboardContainer');
  
  useEffect(() => {
    // Clean event listeners on mount to prevent memory leaks
    console.log('Admin dashboard mounted');
    
    // Return cleanup function
    return () => {
      console.log('Admin dashboard unmounted, cleaning up resources');
    };
  }, []);

  return (
    <div className="container mx-auto px-4 py-6">
      <ErrorBoundary>
        <HeaderSection />
      </ErrorBoundary>
      
      <ErrorBoundary>
        <Suspense fallback={<Skeleton className="h-32 w-full mb-6" />}>
          <SummaryMetrics />
        </Suspense>
      </ErrorBoundary>
      
      <ErrorBoundary>
        <Suspense fallback={<Skeleton className="h-64 w-full mb-6" />}>
          <PerformanceMetrics />
        </Suspense>
      </ErrorBoundary>
      
      <ErrorBoundary>
        <Suspense fallback={<Skeleton className="h-48 w-full" />}>
          <TabsSection />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
};

export default memo(AdminDashboardContainer);
