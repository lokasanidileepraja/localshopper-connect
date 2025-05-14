
import { Suspense, lazy, memo } from "react";
import { Skeleton } from "@/components/ui/skeleton";

// Lazy load the component for better performance
const OrderManagementComponent = lazy(() => 
  import("@/components/retailer/OrderManagement").then(mod => ({ 
    default: memo(mod.OrderManagement)
  }))
);

const RetailerOrders = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Order Management</h1>
      <Suspense fallback={<Skeleton className="h-[600px] w-full" />}>
        <OrderManagementComponent />
      </Suspense>
    </div>
  );
};

export default RetailerOrders;
