
import { Suspense, lazy, memo, useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { usePerformanceMonitor } from "@/hooks/usePerformanceMonitor";
import { ErrorBoundary } from "@/components/common/ErrorBoundary";
import { useToast } from "@/hooks/use-toast";

// Lazy load the component for better performance
const OrderManagementComponent = lazy(() => 
  import("@/components/retailer/OrderManagement").then(mod => ({ 
    default: mod.OrderManagement 
  }))
);

const RetailerOrders = () => {
  // Monitor component performance
  usePerformanceMonitor('RetailerOrdersPage');
  
  const { toast } = useToast();
  
  // Log page visit for analytics
  useEffect(() => {
    console.log("Retailer Orders page visited");
    
    return () => {
      // Clean up any resources or events when component unmounts
      console.log("Retailer Orders page exited");
    };
  }, []);
  
  return (
    <ErrorBoundary>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Order Management</h1>
        <Suspense fallback={
          <div className="space-y-4">
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-[500px] w-full" />
          </div>
        }>
          <OrderManagementComponent />
        </Suspense>
      </div>
    </ErrorBoundary>
  );
};

export default memo(RetailerOrders);
