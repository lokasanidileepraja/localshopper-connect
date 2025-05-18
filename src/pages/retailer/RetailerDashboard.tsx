
import { memo, Suspense, lazy } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { usePreventRefresh } from "@/hooks/usePreventRefresh";
import { ErrorBoundary } from "@/components/common/ErrorBoundary";

// Lazy load components to improve initial load time
const RetailerDashboardComponent = lazy(() => 
  import("@/components/retailer/RetailerDashboard").then(mod => ({ 
    default: mod.RetailerDashboard 
  }))
);

const SalesChart = lazy(() => 
  import("@/components/retailer/SalesChart").then(mod => ({ 
    default: mod.SalesChart 
  }))
);

const InventorySummary = lazy(() => 
  import("@/components/retailer/InventorySummary").then(mod => ({ 
    default: mod.InventorySummary 
  }))
);

const RecentReservations = lazy(() => 
  import("@/components/retailer/RecentReservations").then(mod => ({ 
    default: mod.RecentReservations 
  }))
);

const OrderManagement = lazy(() => 
  import("@/components/retailer/OrderManagement").then(mod => ({ 
    default: mod.OrderManagement 
  }))
);

// Component for suspense fallback
const CardSkeleton = ({ height = "h-48" }: { height?: string }) => (
  <Skeleton className={`${height} w-full`} />
);

const RetailerDashboard = () => {
  // Apply the prevent refresh hook
  usePreventRefresh();
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Retailer Dashboard</h1>
      
      <ErrorBoundary>
        <Suspense fallback={<CardSkeleton height="h-64" />}>
          <RetailerDashboardComponent />
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
                <Suspense fallback={<CardSkeleton />}>
                  <SalesChart />
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
                <Suspense fallback={<CardSkeleton />}>
                  <InventorySummary />
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
              <Suspense fallback={<CardSkeleton />}>
                <RecentReservations />
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
              <Suspense fallback={<CardSkeleton />}>
                <OrderManagement />
              </Suspense>
            </ErrorBoundary>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default memo(RetailerDashboard);
