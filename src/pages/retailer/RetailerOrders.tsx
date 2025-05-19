
import React, { Suspense, memo, useEffect, useCallback } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { usePerformanceMonitor } from "@/hooks/usePerformanceMonitor";
import { ErrorBoundary } from "@/components/common/ErrorBoundary";
import { useToast } from "@/hooks/use-toast";
import { Helmet } from "react-helmet-async";
import { prefetchComponent } from "@/utils/prefetchUtils";

// Import OrderManagement component
import OrderManagement from "@/components/retailer/OrderManagement";

const RetailerOrders = () => {
  // Monitor component performance
  usePerformanceMonitor('RetailerOrdersPage');
  
  const { toast } = useToast();
  
  // Memoized loading fallback
  const loadingFallback = useCallback(() => (
    <div className="space-y-4">
      <Skeleton className="h-12 w-full" />
      <Skeleton className="h-[500px] w-full" />
    </div>
  ), []);
  
  // Log page visit for analytics - only on mount
  useEffect(() => {
    console.log("Retailer Orders page visited");
    
    // Prefetch related components for better UX
    prefetchComponent(() => import("@/components/retailer/OrderManagement"));
    
    return () => {
      console.log("Retailer Orders page exited");
    };
  }, []);
  
  return (
    <>
      <Helmet>
        <title>Order Management | Retailer Dashboard</title>
        <meta name="description" content="Manage customer orders and track fulfillment" />
      </Helmet>
      
      <ErrorBoundary>
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-6">Order Management</h1>
          <Suspense fallback={loadingFallback()}>
            <OrderManagement />
          </Suspense>
        </div>
      </ErrorBoundary>
    </>
  );
};

export default RetailerOrders;
