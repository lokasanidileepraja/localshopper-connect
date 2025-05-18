
import { memo, Suspense, lazy } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ErrorBoundary } from "@/components/common/ErrorBoundary";
import { usePerformanceMonitor } from "@/hooks/usePerformanceMonitor";

// Simple error fallback component
const LoadingError = memo(() => <div>Failed to load component</div>);
LoadingError.displayName = 'LoadingError';

// Consistent approach for lazy loading components
const WhatsAppStockUpdate = lazy(() => 
  import("./WhatsAppStockUpdate")
    .then(mod => ({ default: memo(mod.WhatsAppStockUpdate) }))
    .catch(() => {
      console.error("Failed to load WhatsAppStockUpdate");
      return { default: LoadingError };
    })
);

const QuickActions = lazy(() => 
  import("./QuickActions")
    .then(mod => ({ default: memo(mod.QuickActions) }))
    .catch(() => {
      console.error("Failed to load QuickActions");
      return { default: LoadingError };
    })
);

const SalesChart = lazy(() => 
  import("./SalesChart")
    .then(mod => ({ default: memo(mod.SalesChart) }))
    .catch(() => {
      console.error("Failed to load SalesChart");
      return { default: LoadingError };
    })
);

const RecentReservations = lazy(() => 
  import("./RecentReservations")
    .then(mod => ({ default: memo(mod.RecentReservations) }))
    .catch(() => {
      console.error("Failed to load RecentReservations");
      return { default: LoadingError };
    })
);

const InventorySummary = lazy(() => 
  import("./InventorySummary")
    .then(mod => ({ default: memo(mod.InventorySummary) }))
    .catch(() => {
      console.error("Failed to load InventorySummary");
      return { default: LoadingError };
    })
);

// Memoized card skeleton component for reuse
const CardSkeleton = memo(({ height = "h-48" }: { height?: string }) => (
  <Skeleton className={`${height} w-full rounded`} />
));

CardSkeleton.displayName = 'CardSkeleton';

export const RetailerDashboardComponents = memo(() => {
  // Monitor performance
  usePerformanceMonitor('RetailerDashboardComponents');
  
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <div className="col-span-2">
        <Card>
          <CardHeader>
            <CardTitle>Sales Chart</CardTitle>
          </CardHeader>
          <CardContent>
            <ErrorBoundary fallback={
              <div className="h-72 flex items-center justify-center bg-gray-50 rounded">
                <p className="text-muted-foreground">Unable to load sales chart</p>
              </div>
            }>
              <Suspense fallback={<CardSkeleton height="h-72" />}>
                <SalesChart />
              </Suspense>
            </ErrorBoundary>
          </CardContent>
        </Card>
      </div>
      
      <div className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <ErrorBoundary>
              <Suspense fallback={<CardSkeleton height="h-32" />}>
                <QuickActions />
              </Suspense>
            </ErrorBoundary>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>WhatsApp Stock Updates</CardTitle>
          </CardHeader>
          <CardContent>
            <ErrorBoundary>
              <Suspense fallback={<CardSkeleton height="h-32" />}>
                <WhatsAppStockUpdate storeId="store123" />
              </Suspense>
            </ErrorBoundary>
          </CardContent>
        </Card>
      </div>
      
      <div className="col-span-2">
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
  );
});

RetailerDashboardComponents.displayName = 'RetailerDashboardComponents';

// Export components with consistent error handling
export { WhatsAppStockUpdate } from "./WhatsAppStockUpdate";
export { QuickActions } from "./QuickActions";
export { SalesChart } from "./SalesChart";
export { RecentReservations } from "./RecentReservations";
export { InventorySummary } from "./InventorySummary";
