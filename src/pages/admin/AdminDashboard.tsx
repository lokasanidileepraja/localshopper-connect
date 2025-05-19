
import React, { memo, Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { ErrorBoundary } from "@/components/common/ErrorBoundary";
import { usePerformanceMonitor } from "@/hooks/usePerformanceMonitor";
import { Card } from "@/components/ui/card";
import { LoadingSpinner } from "@/components/LoadingSpinner";

// Lazy load the main dashboard container
const AdminDashboardContainer = React.lazy(() => 
  import("@/components/admin/dashboard/AdminDashboardContainer")
);

/**
 * Admin Dashboard page with enhanced error boundaries and loading states
 */
const AdminDashboard = () => {
  // Monitor component performance
  usePerformanceMonitor('AdminDashboardPage');
  
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
      <ErrorBoundary>
        <Suspense fallback={loadingFallback}>
          <AdminDashboardContainer />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
};

export default memo(AdminDashboard);
