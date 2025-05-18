
import { Suspense, lazy, memo } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { usePreventRefresh } from "@/hooks/usePreventRefresh";
import { ErrorBoundary } from "@/components/common/ErrorBoundary";

// Lazy load the component for better performance
const OrderManagementComponent = lazy(() => 
  import("@/components/retailer/OrderManagement").then(mod => ({ 
    default: mod.OrderManagement 
  }))
);

const RetailerOrders = () => {
  // Apply the prevent refresh hook
  usePreventRefresh();
  
  return (
    <ErrorBoundary>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Order Management</h1>
        <Suspense fallback={<Skeleton className="h-[600px] w-full" />}>
          <OrderManagementComponent />
        </Suspense>
      </div>
    </ErrorBoundary>
  );
};

export default memo(RetailerOrders);
