
import React, { memo, Suspense } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ErrorBoundary } from "@/components/common/ErrorBoundary";

// Lazy loaded components
const WhatsAppStockUpdate = React.lazy(() => 
  import("@/components/retailer/WhatsAppStockUpdate").then(mod => ({
    default: mod.WhatsAppStockUpdate || mod.default || mod
  }))
);

const DeliveryOptions = React.lazy(() => 
  import("@/components/retailer/DeliveryOptions").then(mod => ({
    default: mod.DeliveryOptions || mod.default || mod
  }))
);

const PaymentManagement = React.lazy(() => 
  import("@/components/retailer/PaymentManagement").then(mod => ({
    default: mod.PaymentManagement || mod.default || mod
  }))
);

const UserAccessControl = React.lazy(() => 
  import("@/components/retailer/UserAccessControl").then(mod => ({
    default: mod.UserAccessControl || mod.default || mod
  }))
);

const RetailerSettings = () => {
  // Mock store ID for the retailer
  const mockStoreId = "store123";

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Store Settings</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
            </CardHeader>
            <CardContent>
              <ErrorBoundary>
                <Suspense fallback={<Skeleton className="h-32 w-full" />}>
                  <WhatsAppStockUpdate storeId={mockStoreId} />
                </Suspense>
              </ErrorBoundary>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Payment Methods</CardTitle>
            </CardHeader>
            <CardContent>
              <ErrorBoundary>
                <Suspense fallback={<Skeleton className="h-32 w-full" />}>
                  <PaymentManagement />
                </Suspense>
              </ErrorBoundary>
            </CardContent>
          </Card>
        </div>
        
        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Delivery Options</CardTitle>
            </CardHeader>
            <CardContent>
              <ErrorBoundary>
                <Suspense fallback={<Skeleton className="h-32 w-full" />}>
                  <DeliveryOptions />
                </Suspense>
              </ErrorBoundary>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Team Members</CardTitle>
            </CardHeader>
            <CardContent>
              <ErrorBoundary>
                <Suspense fallback={<Skeleton className="h-32 w-full" />}>
                  <UserAccessControl />
                </Suspense>
              </ErrorBoundary>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default memo(RetailerSettings);
