
import React, { memo, Suspense, useEffect, useCallback, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ErrorBoundary } from "@/components/common/ErrorBoundary";
import { usePerformanceMonitor } from "@/hooks/usePerformanceMonitor";
import { Helmet } from "react-helmet-async";

// Import optimized components
const RetailerDashboardComponents = React.lazy(() => 
  import("@/components/retailer/RetailerDashboardComponents")
);

const RetailerDashboard = () => {
  // Monitor component performance
  usePerformanceMonitor('RetailerDashboardPage');
  
  // Log page visit once on mount
  useEffect(() => {
    console.log("Retailer Dashboard page visited");
    
    // Prefetch related components
    const prefetchModules = async () => {
      try {
        await import("@/components/retailer/RetailerDashboardComponents");
      } catch (error) {
        console.error("Error prefetching retailer components:", error);
      }
    };
    
    // Use requestIdleCallback for better performance
    if (window.requestIdleCallback) {
      window.requestIdleCallback(prefetchModules);
    } else {
      setTimeout(prefetchModules, 1000);
    }
    
    return () => {
      console.log("Retailer Dashboard page exited");
    };
  }, []);
  
  // Memoized loading placeholder
  const loadingSkeleton = useMemo(() => (
    <Skeleton className="h-64 w-full" />
  ), []);
  
  // Component wrapper with error boundary
  const ComponentWithErrorBoundary = useCallback(({ children }) => (
    <ErrorBoundary>
      <Suspense fallback={loadingSkeleton}>
        {children}
      </Suspense>
    </ErrorBoundary>
  ), [loadingSkeleton]);
  
  return (
    <div className="container mx-auto px-4 py-8">
      <Helmet>
        <title>Retailer Dashboard | TechLocator</title>
        <meta name="description" content="Retailer management dashboard" />
      </Helmet>
      
      <h1 className="text-3xl font-bold mb-6">Retailer Dashboard</h1>
      
      <ComponentWithErrorBoundary>
        <React.Suspense fallback={loadingSkeleton}>
          <RetailerDashboardComponents.RetailerDashboard />
        </React.Suspense>
      </ComponentWithErrorBoundary>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Sales Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <ComponentWithErrorBoundary>
                <RetailerDashboardComponents.RetailerSalesChart />
              </ComponentWithErrorBoundary>
            </CardContent>
          </Card>
        </div>
        
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Inventory Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <ComponentWithErrorBoundary>
                <RetailerDashboardComponents.RetailerInventorySummary />
              </ComponentWithErrorBoundary>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Reservations</CardTitle>
          </CardHeader>
          <CardContent>
            <ComponentWithErrorBoundary>
              <RetailerDashboardComponents.RetailerRecentReservations />
            </ComponentWithErrorBoundary>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <ComponentWithErrorBoundary>
              <RetailerDashboardComponents.RetailerOrderManagement />
            </ComponentWithErrorBoundary>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default memo(RetailerDashboard);
