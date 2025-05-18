
import { useState, useCallback, useMemo, useEffect } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Suspense, lazy } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { usePerformanceMonitor } from "@/hooks/usePerformanceMonitor";
import { useToast } from "@/hooks/use-toast";
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
const LazyTabContent = ({ children, isVisible }: { children: React.ReactNode; isVisible: boolean }) => {
  if (!isVisible) return null;
  
  return (
    <Suspense fallback={<Skeleton className="h-64 w-full" />}>
      {children}
    </Suspense>
  );
};

// Lazy load tab content components with better error handling
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
const IntegrationHub = lazy(() => import("@/components/admin/IntegrationHub").then(mod => ({ 
  default: mod.IntegrationHub 
})));

const TabsSection = () => {
  // Monitor component performance
  usePerformanceMonitor('TabsSection');
  
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("overview");
  const [loadedTabs, setLoadedTabs] = useState<Record<string, boolean>>({ overview: true });
  
  const handleTabChange = useCallback((value: string) => {
    setActiveTab(value);
    setLoadedTabs(prev => ({ ...prev, [value]: true }));
    
    // Analytics tracking for tab changes
    console.log(`Tab changed to: ${value}`);
    
    // Clear any error toasts when changing tabs
    // This prevents old error messages from persisting across tab changes
    toast({
      title: `Viewing ${value.charAt(0).toUpperCase() + value.slice(1)}`,
      description: `Switched to ${value} tab`,
      variant: "default",
    });
  }, [toast]);
  
  // Avoid recreating tab triggers on each render with useMemo
  const tabTriggers = useMemo(() => (
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
  ), []);

  return (
    <Tabs value={activeTab} onValueChange={handleTabChange} className="space-y-4">
      {tabTriggers}
      
      <TabsContent value="overview" className="space-y-4">
        <OverviewTab />
      </TabsContent>
      
      <TabsContent value="analytics">
        <LazyTabContent isVisible={loadedTabs.analytics}>
          <AnalyticsDashboard />
        </LazyTabContent>
      </TabsContent>
      
      <TabsContent value="inventory">
        <LazyTabContent isVisible={loadedTabs.inventory}>
          <InventoryManagement />
        </LazyTabContent>
      </TabsContent>
      
      <TabsContent value="orders">
        <LazyTabContent isVisible={loadedTabs.orders}>
          <OrderManagement />
        </LazyTabContent>
      </TabsContent>
      
      <TabsContent value="users">
        <LazyTabContent isVisible={loadedTabs.users}>
          <UserManagement />
        </LazyTabContent>
      </TabsContent>
      
      <TabsContent value="reports">
        <LazyTabContent isVisible={loadedTabs.reports}>
          <ReportingDashboard />
        </LazyTabContent>
      </TabsContent>
      
      <TabsContent value="insights">
        <LazyTabContent isVisible={loadedTabs.insights}>
          <CustomerInsights />
        </LazyTabContent>
      </TabsContent>
      
      <TabsContent value="pricing">
        <LazyTabContent isVisible={loadedTabs.pricing}>
          <PricingTools />
        </LazyTabContent>
      </TabsContent>
      
      <TabsContent value="geo">
        <LazyTabContent isVisible={loadedTabs.geo}>
          <GeoTargeting />
        </LazyTabContent>
      </TabsContent>
      
      <TabsContent value="integrations">
        <LazyTabContent isVisible={loadedTabs.integrations}>
          <IntegrationHub />
        </LazyTabContent>
      </TabsContent>
    </Tabs>
  );
};

export default TabsSection;
