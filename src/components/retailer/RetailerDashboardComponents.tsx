
import { memo, Suspense, lazy } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ErrorBoundary } from "@/components/common/ErrorBoundary";

// Lazy load components to improve performance
const WhatsAppStockUpdate = lazy(() => import("./WhatsAppStockUpdate").then(mod => ({ default: mod.WhatsAppStockUpdate })));
const QuickActions = lazy(() => import("./QuickActions").then(mod => ({ default: mod.QuickActions })));
const SalesChart = lazy(() => import("./SalesChart").then(mod => ({ default: mod.SalesChart })));
const RecentReservations = lazy(() => import("./RecentReservations").then(mod => ({ default: mod.RecentReservations })));
const InventorySummary = lazy(() => import("./InventorySummary").then(mod => ({ default: mod.InventorySummary })));

const CardSkeleton = ({ height = "h-48" }: { height?: string }) => (
  <Skeleton className={`${height} w-full`} />
);

export const RetailerDashboardComponents = memo(() => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <div className="col-span-2">
        <Card>
          <CardHeader>
            <CardTitle>Sales Chart</CardTitle>
          </CardHeader>
          <CardContent>
            <ErrorBoundary>
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

// Export individual components
export { WhatsAppStockUpdate } from "./WhatsAppStockUpdate";
export { QuickActions } from "./QuickActions";
export { SalesChart } from "./SalesChart";
export { RecentReservations } from "./RecentReservations";
export { InventorySummary } from "./InventorySummary";
