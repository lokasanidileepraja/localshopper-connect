
import React, { memo, useEffect, Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { ErrorBoundary } from "@/components/common/ErrorBoundary";
import { usePerformanceMonitor } from "@/hooks/usePerformanceMonitor";
import { Card } from "@/components/ui/card";
import { Helmet } from "react-helmet-async";
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
  
  // Track page load for analytics
  useEffect(() => {
    console.log("Admin Dashboard page visited");
    
    // Prefetch other related admin components
    const prefetchComponents = async () => {
      // Prefetch other admin routes
      const prefetches = [
        import("@/components/admin/dashboard/HeaderSection"),
        import("@/components/admin/dashboard/SummaryMetrics"),
        import("@/components/admin/dashboard/PerformanceMetrics"),
        import("@/components/admin/dashboard/TabsSection")
      ];
      
      try {
        await Promise.all(prefetches);
      } catch (error) {
        console.error("Error prefetching admin components:", error);
      }
    };
    
    // Use requestIdleCallback for non-blocking prefetch
    if (window.requestIdleCallback) {
      window.requestIdleCallback(() => prefetchComponents());
    } else {
      setTimeout(prefetchComponents, 1000);
    }
    
    return () => {
      console.log("Admin Dashboard page exited");
    };
  }, []);
  
  // Loading fallback component with skeleton UI
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
      <Helmet>
        <title>Admin Dashboard | TechLocator</title>
        <meta name="description" content="Admin dashboard for TechLocator platform." />
      </Helmet>
      
      <ErrorBoundary>
        <Suspense fallback={loadingFallback}>
          <AdminDashboardContainer />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
};

export default memo(AdminDashboard);
