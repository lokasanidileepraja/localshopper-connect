
import { useState, Suspense, lazy } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { useIsMobile } from "@/hooks/use-mobile";

// Lazy load components to improve initial loading time
const ProductManagement = lazy(() => import("@/components/retailer/ProductManagement"));
const InventoryTracking = lazy(() => import("@/components/retailer/InventoryTracking"));
const OrderManagement = lazy(() => import("@/components/retailer/OrderManagement"));
const CustomerInteraction = lazy(() => import("@/components/retailer/CustomerInteraction"));
const PromotionsManagement = lazy(() => import("@/components/retailer/PromotionsManagement"));
const RetailerAnalytics = lazy(() => import("@/components/retailer/RetailerAnalytics"));
const DeliveryOptions = lazy(() => import("@/components/retailer/DeliveryOptions"));
const PaymentManagement = lazy(() => import("@/components/retailer/PaymentManagement"));
const UserAccessControl = lazy(() => import("@/components/retailer/UserAccessControl"));
const RetailerSupport = lazy(() => import("@/components/retailer/RetailerSupport"));
const RetailerDashboard = lazy(() => import("@/components/retailer/RetailerDashboard"));
const WhatsAppUpdates = lazy(() => import("@/components/retailer/WhatsAppUpdates"));

const RetailerProfile = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const isMobile = useIsMobile();

  // Only load the currently active tab
  const renderTabContent = (tabName: string, Component: React.ComponentType<any>) => {
    if (activeTab !== tabName) return null;
    
    return (
      <Suspense fallback={<div className="py-12 flex justify-center"><LoadingSpinner /></div>}>
        <Component />
      </Suspense>
    );
  };

  return (
    <div className="container mx-auto px-4 py-4 md:py-8 bg-background">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-2">
        <h1 className="text-xl md:text-2xl font-bold">Retailer Dashboard</h1>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <Card className="border-0 shadow-sm">
          <CardContent className="p-1">
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
          </CardContent>
        </Card>

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
