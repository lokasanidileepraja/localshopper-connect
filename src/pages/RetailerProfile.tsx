
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { ProductManagement } from "@/components/retailer/ProductManagement";
import { InventoryTracking } from "@/components/retailer/InventoryTracking";
import { OrderManagement } from "@/components/retailer/OrderManagement";
import { CustomerInteraction } from "@/components/retailer/CustomerInteraction";
import { PromotionsManagement } from "@/components/retailer/PromotionsManagement";
import { RetailerAnalytics } from "@/components/retailer/RetailerAnalytics";
import { DeliveryOptions } from "@/components/retailer/DeliveryOptions";
import { PaymentManagement } from "@/components/retailer/PaymentManagement";
import { UserAccessControl } from "@/components/retailer/UserAccessControl";
import { RetailerSupport } from "@/components/retailer/RetailerSupport";
import { RetailerDashboard } from "@/components/retailer/RetailerDashboard";
import { WhatsAppUpdates } from "@/components/retailer/WhatsAppUpdates";
import { useIsMobile } from "@/hooks/use-mobile";

const RetailerProfile = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const isMobile = useIsMobile();

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
          <RetailerDashboard />
        </TabsContent>

        <TabsContent value="whatsapp">
          <WhatsAppUpdates />
        </TabsContent>
        
        <TabsContent value="products">
          <ProductManagement />
        </TabsContent>
        
        <TabsContent value="inventory">
          <InventoryTracking />
        </TabsContent>
        
        <TabsContent value="orders">
          <OrderManagement />
        </TabsContent>
        
        <TabsContent value="customers">
          <CustomerInteraction />
        </TabsContent>
        
        <TabsContent value="promotions">
          <PromotionsManagement />
        </TabsContent>
        
        <TabsContent value="analytics">
          <RetailerAnalytics />
        </TabsContent>
        
        <TabsContent value="delivery">
          <DeliveryOptions />
        </TabsContent>
        
        <TabsContent value="payments">
          <PaymentManagement />
        </TabsContent>
        
        <TabsContent value="users">
          <UserAccessControl />
        </TabsContent>
        
        <TabsContent value="support">
          <RetailerSupport />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default RetailerProfile;
