
import { memo, Suspense, lazy, ComponentType } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ErrorBoundary } from "@/components/common/ErrorBoundary";
import { usePerformanceMonitor } from "@/hooks/usePerformanceMonitor";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

// Simple error fallback component that matches the expected type pattern
const LoadingError = memo(({ message = "Failed to load component" }: { message?: string }) => (
  <div className="p-4 bg-red-50 border border-red-200 rounded-md">
    <div className="flex items-center gap-2">
      <AlertTriangle className="h-4 w-4 text-red-500" />
      <p className="text-red-700 font-medium">{message}</p>
    </div>
    <Button 
      variant="outline" 
      size="sm" 
      className="mt-2 bg-white" 
      onClick={() => window.location.reload()}
    >
      Try Again
    </Button>
  </div>
));

LoadingError.displayName = 'LoadingError';

// Type definition for component props with proper generics
interface BaseComponentProps {}

interface WhatsAppStockUpdateProps extends BaseComponentProps {
  storeId: string;
}

// Generic component type that can handle any props
type ComponentImport<T extends BaseComponentProps = BaseComponentProps> = ComponentType<T>;

// Consistent approach for lazy loading components with proper typing
const WhatsAppStockUpdate = lazy<ComponentType<WhatsAppStockUpdateProps>>(() => 
  import("./WhatsAppStockUpdate")
    .then(mod => ({ default: memo(mod.WhatsAppStockUpdate) as ComponentType<WhatsAppStockUpdateProps> }))
    .catch(() => {
      console.error("Failed to load WhatsAppStockUpdate");
      return { 
        // Cast LoadingError to match the expected WhatsAppStockUpdateProps interface
        default: (({ storeId }) => <LoadingError message={`Failed to load WhatsApp updates for store ${storeId}`} />) as ComponentType<WhatsAppStockUpdateProps>
      };
    })
);

const QuickActions = lazy(() => 
  import("./QuickActions")
    .then(mod => ({ default: memo(mod.QuickActions) as ComponentImport }))
    .catch(() => {
      console.error("Failed to load QuickActions");
      return { default: () => <LoadingError message="Failed to load Quick Actions" /> as ComponentImport };
    })
);

const SalesChart = lazy(() => 
  import("./SalesChart")
    .then(mod => ({ default: memo(mod.SalesChart) as ComponentImport }))
    .catch(() => {
      console.error("Failed to load SalesChart");
      return { default: () => <LoadingError message="Failed to load Sales Chart" /> as ComponentImport };
    })
);

const RecentReservations = lazy(() => 
  import("./RecentReservations")
    .then(mod => ({ default: memo(mod.RecentReservations) as ComponentImport }))
    .catch(() => {
      console.error("Failed to load RecentReservations");
      return { default: () => <LoadingError message="Failed to load Recent Reservations" /> as ComponentImport };
    })
);

const InventorySummary = lazy(() => 
  import("./InventorySummary")
    .then(mod => ({ default: memo(mod.InventorySummary) as ComponentImport }))
    .catch(() => {
      console.error("Failed to load InventorySummary");
      return { default: () => <LoadingError message="Failed to load Inventory Summary" /> as ComponentImport };
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
