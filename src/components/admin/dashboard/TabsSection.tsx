
import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Suspense, lazy } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Activity,
  Database,
  ListOrdered,
  UserCog,
  ChartPie,
  UserSearch,
  DollarSign,
  MapPin,
  Link
} from "lucide-react";
import OverviewTab from "./OverviewTab";

// Create a lazy-loaded content wrapper for tab content
const LazyTabContent = ({ children }: { children: React.ReactNode }) => (
  <Suspense fallback={<Skeleton className="h-64 w-full" />}>
    {children}
  </Suspense>
);

// Lazy load tab content components
const AnalyticsDashboard = lazy(() => import("@/components/admin/AnalyticsDashboard").then(mod => ({ 
  default: mod.AnalyticsDashboard 
})));
const InventoryManagement = lazy(() => import("@/components/admin/InventoryManagement").then(mod => ({ 
  default: mod.InventoryManagement 
})));
const OrderManagement = lazy(() => import("@/components/admin/OrderManagement").then(mod => ({ 
  default: mod.OrderManagement 
})));
const UserManagement = lazy(() => import("@/components/admin/UserManagement").then(mod => ({ 
  default: mod.UserManagement 
})));
const ReportingDashboard = lazy(() => import("@/components/admin/ReportingDashboard").then(mod => ({ 
  default: mod.ReportingDashboard 
})));
const CustomerInsights = lazy(() => import("@/components/admin/CustomerInsights").then(mod => ({ 
  default: mod.CustomerInsights 
})));
const PricingTools = lazy(() => import("@/components/admin/PricingTools").then(mod => ({ 
  default: mod.PricingTools 
})));
const GeoTargeting = lazy(() => import("@/components/admin/GeoTargeting").then(mod => ({ 
  default: mod.GeoTargeting 
})));
const VendorManagement = lazy(() => import("@/components/admin/VendorManagement").then(mod => ({ 
  default: mod.VendorManagement 
})));
const IntegrationHub = lazy(() => import("@/components/admin/IntegrationHub").then(mod => ({ 
  default: mod.IntegrationHub 
})));

const TabsSection = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [loadedTabs, setLoadedTabs] = useState<Record<string, boolean>>({ overview: true });
  
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    setLoadedTabs(prev => ({ ...prev, [value]: true }));
  };

  return (
    <Tabs value={activeTab} onValueChange={handleTabChange} className="space-y-4">
      <TabsList className="grid grid-cols-2 md:grid-cols-5 lg:grid-cols-10 gap-2">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="analytics">
          <Activity className="h-4 w-4 mr-1" />
          Analytics
        </TabsTrigger>
        <TabsTrigger value="inventory">
          <Database className="h-4 w-4 mr-1" />
          Inventory
        </TabsTrigger>
        <TabsTrigger value="orders">
          <ListOrdered className="h-4 w-4 mr-1" />
          Orders
        </TabsTrigger>
        <TabsTrigger value="users">
          <UserCog className="h-4 w-4 mr-1" />
          Users
        </TabsTrigger>
        <TabsTrigger value="reports">
          <ChartPie className="h-4 w-4 mr-1" />
          Reports
        </TabsTrigger>
        <TabsTrigger value="insights">
          <UserSearch className="h-4 w-4 mr-1" />
          Insights
        </TabsTrigger>
        <TabsTrigger value="pricing">
          <DollarSign className="h-4 w-4 mr-1" />
          Pricing
        </TabsTrigger>
        <TabsTrigger value="geo">
          <MapPin className="h-4 w-4 mr-1" />
          Geo-Targeting
        </TabsTrigger>
        <TabsTrigger value="integrations">
          <Link className="h-4 w-4 mr-1" />
          Integrations
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="overview" className="space-y-4">
        <OverviewTab />
      </TabsContent>
      
      {loadedTabs.analytics && (
        <TabsContent value="analytics">
          <LazyTabContent>
            <AnalyticsDashboard />
          </LazyTabContent>
        </TabsContent>
      )}
      
      {loadedTabs.inventory && (
        <TabsContent value="inventory">
          <LazyTabContent>
            <InventoryManagement />
          </LazyTabContent>
        </TabsContent>
      )}
      
      {loadedTabs.orders && (
        <TabsContent value="orders">
          <LazyTabContent>
            <OrderManagement />
          </LazyTabContent>
        </TabsContent>
      )}
      
      {loadedTabs.users && (
        <TabsContent value="users">
          <LazyTabContent>
            <UserManagement />
          </LazyTabContent>
        </TabsContent>
      )}
      
      {loadedTabs.reports && (
        <TabsContent value="reports">
          <LazyTabContent>
            <ReportingDashboard />
          </LazyTabContent>
        </TabsContent>
      )}
      
      {loadedTabs.insights && (
        <TabsContent value="insights">
          <LazyTabContent>
            <CustomerInsights />
          </LazyTabContent>
        </TabsContent>
      )}
      
      {loadedTabs.pricing && (
        <TabsContent value="pricing">
          <LazyTabContent>
            <PricingTools />
          </LazyTabContent>
        </TabsContent>
      )}
      
      {loadedTabs.geo && (
        <TabsContent value="geo">
          <LazyTabContent>
            <GeoTargeting />
          </LazyTabContent>
        </TabsContent>
      )}
      
      {loadedTabs.integrations && (
        <TabsContent value="integrations">
          <LazyTabContent>
            <IntegrationHub />
          </LazyTabContent>
        </TabsContent>
      )}
    </Tabs>
  );
};

export default TabsSection;
