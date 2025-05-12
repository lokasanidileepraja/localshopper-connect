
import { useState, Suspense, lazy, useMemo, useCallback } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { useIsMobile } from "@/hooks/use-mobile";

// Optimize lazy loading with proper dynamic imports and memoization
const ProductManagement = lazy(() => import("@/components/retailer/ProductManagement").then(module => ({ default: () => <module.ProductManagement /> })));
const InventoryTracking = lazy(() => import("@/components/retailer/InventoryTracking").then(module => ({ default: () => <module.InventoryTracking /> })));
const OrderManagement = lazy(() => import("@/components/retailer/OrderManagement").then(module => ({ default: () => <module.OrderManagement /> })));
const CustomerInteraction = lazy(() => import("@/components/retailer/CustomerInteraction").then(module => ({ default: () => <module.CustomerInteraction /> })));
const PromotionsManagement = lazy(() => import("@/components/retailer/PromotionsManagement").then(module => ({ default: () => <module.PromotionsManagement /> })));
const RetailerAnalytics = lazy(() => import("@/components/retailer/RetailerAnalytics").then(module => ({ default: () => <module.RetailerAnalytics /> })));
const DeliveryOptions = lazy(() => import("@/components/retailer/DeliveryOptions").then(module => ({ default: () => <module.DeliveryOptions /> })));
const PaymentManagement = lazy(() => import("@/components/retailer/PaymentManagement").then(module => ({ default: () => <module.PaymentManagement /> })));
const UserAccessControl = lazy(() => import("@/components/retailer/UserAccessControl").then(module => ({ default: () => <module.UserAccessControl /> })));
const RetailerSupport = lazy(() => import("@/components/retailer/RetailerSupport").then(module => ({ default: () => <module.RetailerSupport /> })));
const RetailerDashboard = lazy(() => import("@/components/retailer/RetailerDashboard").then(module => ({ default: () => <module.RetailerDashboard /> })));
const WhatsAppUpdates = lazy(() => import("@/components/retailer/WhatsAppUpdates").then(module => ({ default: () => <module.WhatsAppUpdates /> })));

const RetailerProfile = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const isMobile = useIsMobile();

  // Memoize tab change handler to prevent unnecessary re-renders
  const handleTabChange = useCallback((value: string) => {
    setActiveTab(value);
  }, []);

  // Only load the currently active tab with optimized rendering
  const renderTabContent = useCallback((tabName: string, Component: React.ComponentType<any>) => {
    if (activeTab !== tabName) return null;
    
    return (
      <Suspense fallback={<div className="py-12 flex justify-center"><LoadingSpinner /></div>}>
        <Component />
      </Suspense>
    );
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

        {/* Only render the necessary content based on active tab */}
        <TabsContent value="dashboard">
          {renderTabContent("dashboard", RetailerDashboard)}
        </TabsContent>

        <TabsContent value="whatsapp">
          {renderTabContent("whatsapp", WhatsAppUpdates)}
        </TabsContent>
        
        <TabsContent value="products">
          {renderTabContent("products", ProductManagement)}
        </TabsContent>
        
        <TabsContent value="inventory">
          {renderTabContent("inventory", InventoryTracking)}
        </TabsContent>
        
        <TabsContent value="orders">
          {renderTabContent("orders", OrderManagement)}
        </TabsContent>
        
        <TabsContent value="customers">
          {renderTabContent("customers", CustomerInteraction)}
        </TabsContent>
        
        <TabsContent value="promotions">
          {renderTabContent("promotions", PromotionsManagement)}
        </TabsContent>
        
        <TabsContent value="analytics">
          {renderTabContent("analytics", RetailerAnalytics)}
        </TabsContent>
        
        <TabsContent value="delivery">
          {renderTabContent("delivery", DeliveryOptions)}
        </TabsContent>
        
        <TabsContent value="payments">
          {renderTabContent("payments", PaymentManagement)}
        </TabsContent>
        
        <TabsContent value="users">
          {renderTabContent("users", UserAccessControl)}
        </TabsContent>
        
        <TabsContent value="support">
          {renderTabContent("support", RetailerSupport)}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default RetailerProfile;
