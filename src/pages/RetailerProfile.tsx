
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

const RetailerProfile = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Retailer Dashboard</h1>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="w-full overflow-x-auto flex justify-start p-1 mb-2">
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="products">Products</TabsTrigger>
          <TabsTrigger value="inventory">Inventory</TabsTrigger>
          <TabsTrigger value="orders">Orders</TabsTrigger>
          <TabsTrigger value="customers">Customers</TabsTrigger>
          <TabsTrigger value="promotions">Promotions</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="delivery">Delivery</TabsTrigger>
          <TabsTrigger value="payments">Payments</TabsTrigger>
          <TabsTrigger value="users">Team</TabsTrigger>
          <TabsTrigger value="support">Support</TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard">
          <RetailerDashboard />
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
