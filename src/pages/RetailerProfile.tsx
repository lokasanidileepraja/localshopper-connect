import { useState, Suspense, lazy, useMemo, useCallback, memo } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { useIsMobile } from "@/hooks/use-mobile";
import { usePreventRefresh } from "@/hooks/usePreventRefresh";
import { useRenderOptimizer } from "@/hooks/useRenderOptimizer";
import { ErrorBoundary } from "@/components/common/ErrorBoundary";

// Optimize lazy loading with proper dynamic imports and memoization
const ProductManagement = lazy(() => import("@/components/retailer/ProductManagement").then(module => ({ default: memo(() => <module.ProductManagement />) })));
const InventoryTracking = lazy(() => import("@/components/retailer/InventoryTracking").then(module => ({ default: memo(() => <module.InventoryTracking />) })));
const OrderManagement = lazy(() => import("@/components/retailer/OrderManagement").then(module => ({ default: memo(() => <module.OrderManagement />) })));
const CustomerInteraction = lazy(() => import("@/components/retailer/CustomerInteraction").then(module => ({ default: memo(() => <module.CustomerInteraction />) })));
const PromotionsManagement = lazy(() => import("@/components/retailer/PromotionsManagement").then(module => ({ default: memo(() => <module.PromotionsManagement />) })));
const RetailerAnalytics = lazy(() => import("@/components/retailer/RetailerAnalytics").then(module => ({ default: memo(() => <module.RetailerAnalytics />) })));
const DeliveryOptions = lazy(() => import("@/components/retailer/DeliveryOptions").then(module => ({ default: memo(() => <module.DeliveryOptions />) })));
const PaymentManagement = lazy(() => import("@/components/retailer/PaymentManagement").then(module => ({ default: memo(() => <module.PaymentManagement />) })));
const UserAccessControl = lazy(() => import("@/components/retailer/UserAccessControl").then(module => ({ default: memo(() => <module.UserAccessControl />) })));
const RetailerSupport = lazy(() => import("@/components/retailer/RetailerSupport").then(module => ({ default: memo(() => <module.RetailerSupport />) })));
const RetailerDashboard = lazy(() => import("@/components/retailer/RetailerDashboard").then(module => ({ default: memo(() => <module.RetailerDashboard />) })));
const WhatsAppUpdates = lazy(() => import("@/components/retailer/WhatsAppUpdates").then(module => ({ default: memo(() => <module.WhatsAppUpdates />) })));

// Loading component
const TabContentLoader = memo(() => (
  <div className="py-12 flex justify-center">
    <LoadingSpinner />
  </div>
));

TabContentLoader.displayName = 'TabContentLoader';

const RetailerProfile = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [loadedTabs, setLoadedTabs] = useState<Record<string, boolean>>({ dashboard: true });
  const isMobile = useIsMobile();
  
  // Apply optimization hooks
  usePreventRefresh();
  useRenderOptimizer('RetailerProfile');

  // Memoize tab change handler to prevent unnecessary re-renders
  const handleTabChange = useCallback((value: string) => {
    // Only update if the tab actually changed
    if (value !== activeTab) {
      setActiveTab(value);
      setLoadedTabs(prev => ({ ...prev, [value]: true }));
    }
  }, [activeTab]);

  // Memoize TabsList to prevent re-renders
  const tabsList = useMemo(() => (
    <TabsList className="w-full overflow-x-auto flex justify-start bg-transparent h-auto p-1">
      <TabsTrigger value="dashboard" className="rounded-md px-3 py-2 text-sm">Dashboard</TabsTrigger>
      <TabsTrigger value="whatsapp" className="rounded-md px-3 py-2 text-sm">WhatsApp</TabsTrigger>
      <TabsTrigger value="products" className="rounded-md px-3 py-2 text-sm">Products</TabsTrigger>
      <TabsTrigger value="inventory" className="rounded-md px-3 py-2 text-sm">Inventory</TabsTrigger>
      <TabsTrigger value="orders" className="rounded-md px-3 py-2 text-sm">Orders</TabsTrigger>
      <TabsTrigger value="customers" className="rounded-md px-3 py-2 text-sm">Customers</TabsTrigger>
      <TabsTrigger value="promotions" className="rounded-md px-3 py-2 text-sm">Promotions</TabsTrigger>
      <TabsTrigger value="analytics" className="rounded-md px-3 py-2 text-sm">Analytics</TabsTrigger>
      <TabsTrigger value="delivery" className="rounded-md px-3 py-2 text-sm">Delivery</TabsTrigger>
      <TabsTrigger value="payments" className="rounded-md px-3 py-2 text-sm">Payments</TabsTrigger>
      <TabsTrigger value="users" className="rounded-md px-3 py-2 text-sm">Team</TabsTrigger>
      <TabsTrigger value="support" className="rounded-md px-3 py-2 text-sm">Support</TabsTrigger>
    </TabsList>
  ), []);

  return (
    <ErrorBoundary>
      <div className="container mx-auto px-4 py-4 md:py-8 bg-background">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-2">
          <h1 className="text-xl md:text-2xl font-bold">Retailer Dashboard</h1>
        </div>
        
        <Tabs value={activeTab} onValueChange={handleTabChange} className="space-y-4">
          <Card className="border-0 shadow-sm">
            <CardContent className="p-1">
              {tabsList}
            </CardContent>
          </Card>

          {/* Only render the content for the active tab */}
          <TabsContent value="dashboard">
            <ErrorBoundary>
              {loadedTabs.dashboard && (
                <Suspense fallback={<TabContentLoader />}>
                  <RetailerDashboard />
                </Suspense>
              )}
            </ErrorBoundary>
          </TabsContent>

          <TabsContent value="whatsapp">
            <ErrorBoundary>
              {loadedTabs.whatsapp && (
                <Suspense fallback={<TabContentLoader />}>
                  <WhatsAppUpdates />
                </Suspense>
              )}
            </ErrorBoundary>
          </TabsContent>
          
          <TabsContent value="products">
            <ErrorBoundary>
              {loadedTabs.products && (
                <Suspense fallback={<TabContentLoader />}>
                  <ProductManagement />
                </Suspense>
              )}
            </ErrorBoundary>
          </TabsContent>
          
          <TabsContent value="inventory">
            <ErrorBoundary>
              {loadedTabs.inventory && (
                <Suspense fallback={<TabContentLoader />}>
                  <InventoryTracking />
                </Suspense>
              )}
            </ErrorBoundary>
          </TabsContent>
          
          <TabsContent value="orders">
            <ErrorBoundary>
              {loadedTabs.orders && (
                <Suspense fallback={<TabContentLoader />}>
                  <OrderManagement />
                </Suspense>
              )}
            </ErrorBoundary>
          </TabsContent>
          
          <TabsContent value="customers">
            <ErrorBoundary>
              {loadedTabs.customers && (
                <Suspense fallback={<TabContentLoader />}>
                  <CustomerInteraction />
                </Suspense>
              )}
            </ErrorBoundary>
          </TabsContent>
          
          <TabsContent value="promotions">
            <ErrorBoundary>
              {loadedTabs.promotions && (
                <Suspense fallback={<TabContentLoader />}>
                  <PromotionsManagement />
                </Suspense>
              )}
            </ErrorBoundary>
          </TabsContent>
          
          <TabsContent value="analytics">
            <ErrorBoundary>
              {loadedTabs.analytics && (
                <Suspense fallback={<TabContentLoader />}>
                  <RetailerAnalytics />
                </Suspense>
              )}
            </ErrorBoundary>
          </TabsContent>
          
          <TabsContent value="delivery">
            <ErrorBoundary>
              {loadedTabs.delivery && (
                <Suspense fallback={<TabContentLoader />}>
                  <DeliveryOptions />
                </Suspense>
              )}
            </ErrorBoundary>
          </TabsContent>
          
          <TabsContent value="payments">
            <ErrorBoundary>
              {loadedTabs.payments && (
                <Suspense fallback={<TabContentLoader />}>
                  <PaymentManagement />
                </Suspense>
              )}
            </ErrorBoundary>
          </TabsContent>
          
          <TabsContent value="users">
            <ErrorBoundary>
              {loadedTabs.users && (
                <Suspense fallback={<TabContentLoader />}>
                  <UserAccessControl />
                </Suspense>
              )}
            </ErrorBoundary>
          </TabsContent>
          
          <TabsContent value="support">
            <ErrorBoundary>
              {loadedTabs.support && (
                <Suspense fallback={<TabContentLoader />}>
                  <RetailerSupport />
                </Suspense>
              )}
            </ErrorBoundary>
          </TabsContent>
        </Tabs>
      </div>
    </ErrorBoundary>
  );
};

export default memo(RetailerProfile);
