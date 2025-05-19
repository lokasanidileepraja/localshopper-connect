
import React, { memo, Suspense, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ErrorBoundary } from "@/components/common/ErrorBoundary";
import { usePerformanceMonitor } from "@/hooks/usePerformanceMonitor";
import { LoadingSpinner } from "@/components/LoadingSpinner";

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
    
    return () => {
      console.log("Retailer Dashboard page exited");
    };
  }, []);
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Retailer Dashboard</h1>
      
      <ErrorBoundary>
        <Suspense fallback={<Skeleton className="h-64 w-full" />}>
          <RetailerDashboardComponents.RetailerDashboard />
        </Suspense>
      </ErrorBoundary>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Sales Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <ErrorBoundary>
                <Suspense fallback={<Skeleton className="h-48 w-full" />}>
                  <RetailerDashboardComponents.RetailerSalesChart />
                </Suspense>
              </ErrorBoundary>
            </CardContent>
          </Card>
        </div>
        
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Inventory Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <ErrorBoundary>
                <Suspense fallback={<Skeleton className="h-48 w-full" />}>
                  <RetailerDashboardComponents.RetailerInventorySummary />
                </Suspense>
              </ErrorBoundary>
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
            <ErrorBoundary>
              <Suspense fallback={<Skeleton className="h-48 w-full" />}>
                <RetailerDashboardComponents.RetailerRecentReservations />
              </Suspense>
            </ErrorBoundary>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <ErrorBoundary>
              <Suspense fallback={<Skeleton className="h-48 w-full" />}>
                <RetailerDashboardComponents.RetailerOrderManagement />
              </Suspense>
            </ErrorBoundary>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default memo(RetailerDashboard);
