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
import { ErrorBoundary } from "@/components/common/ErrorBoundary";

// Create a better loading component
const TabContentLoading = ({ height = "h-64" }: { height?: string }) => (
  <div className="w-full animate-pulse">
    <Skeleton className={`${height} w-full mb-4 rounded-md`} />
    <div className="space-y-2">
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-4 w-1/2" />
    </div>
  </div>
);

// Create a component for error states
const TabContentError = ({ onRetry }: { onRetry: () => void }) => (
  <div className="p-6 text-center bg-gray-50 rounded-lg border border-gray-100">
    <div className="text-red-500 mb-4">
      <svg className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
      <h3 className="text-lg font-medium mt-2">Failed to load content</h3>
    </div>
    <p className="text-gray-500 mb-4">There was a problem loading this tab's content.</p>
    <button
      onClick={onRetry}
      className="px-4 py-2 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 transition-colors"
    >
      Try Again
    </button>
  </div>
);

// Create a lazy-loaded content wrapper for tab content
const LazyTabContent = ({ children, isVisible, tabId }: { children: React.ReactNode; isVisible: boolean; tabId: string }) => {
  const { toast } = useToast();
  
  if (!isVisible) return null;
  
  const handleError = (error: Error) => {
    console.error(`Error loading tab ${tabId}:`, error);
    toast({
      title: `Failed to load ${tabId}`,
      description: error.message,
      variant: "destructive",
    });
  };
  
  return (
    <ErrorBoundary
      fallback={<TabContentError onRetry={() => window.location.reload()} />}
      onError={handleError}
    >
      <Suspense fallback={<TabContentLoading />}>
        {children}
      </Suspense>
    </ErrorBoundary>
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
  
  // Track which tabs have errored
  const [erroredTabs, setErroredTabs] = useState<Record<string, boolean>>({});
  
  // Keep track of tab change history for analytics
  const [tabHistory, setTabHistory] = useState<string[]>(['overview']);
  
  const handleTabChange = useCallback((value: string) => {
    setActiveTab(value);
    setLoadedTabs(prev => ({ ...prev, [value]: true }));
    
    // Add to tab history
    setTabHistory(prev => [...prev, value]);
    
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
  
  // Log tab history for analytics on unmount
  useEffect(() => {
    return () => {
      if (tabHistory.length > 1) {
        console.log('Tab navigation history:', tabHistory);
      }
    };
  }, [tabHistory]);
  
  // Handle tab error
  const handleTabError = useCallback((tabId: string) => {
    setErroredTabs(prev => ({ ...prev, [tabId]: true }));
  }, []);
  
  // Retry loading a tab
  const retryTabLoad = useCallback((tabId: string) => {
    setErroredTabs(prev => ({ ...prev, [tabId]: false }));
    toast({
      title: `Retrying ${tabId}`,
      description: "Attempting to reload tab content",
    });
    // Force re-render of the tab content
    setLoadedTabs(prev => ({ ...prev, [tabId]: false }));
    setTimeout(() => {
      setLoadedTabs(prev => ({ ...prev, [tabId]: true }));
    }, 100);
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
        <LazyTabContent isVisible={loadedTabs.analytics} tabId="analytics">
          {erroredTabs.analytics ? (
            <TabContentError onRetry={() => retryTabLoad('analytics')} />
          ) : (
            <AnalyticsDashboard />
          )}
        </LazyTabContent>
      </TabsContent>
      
      <TabsContent value="inventory">
        <LazyTabContent isVisible={loadedTabs.inventory} tabId="inventory">
          {erroredTabs.inventory ? (
            <TabContentError onRetry={() => retryTabLoad('inventory')} />
          ) : (
            <InventoryManagement />
          )}
        </LazyTabContent>
      </TabsContent>
      
      <TabsContent value="orders">
        <LazyTabContent isVisible={loadedTabs.orders} tabId="orders">
          {erroredTabs.orders ? (
            <TabContentError onRetry={() => retryTabLoad('orders')} />
          ) : (
            <OrderManagement />
          )}
        </LazyTabContent>
      </TabsContent>
      
      <TabsContent value="users">
        <LazyTabContent isVisible={loadedTabs.users} tabId="users">
          {erroredTabs.users ? (
            <TabContentError onRetry={() => retryTabLoad('users')} />
          ) : (
            <UserManagement />
          )}
        </LazyTabContent>
      </TabsContent>
      
      <TabsContent value="reports">
        <LazyTabContent isVisible={loadedTabs.reports} tabId="reports">
          {erroredTabs.reports ? (
            <TabContentError onRetry={() => retryTabLoad('reports')} />
          ) : (
            <ReportingDashboard />
          )}
        </LazyTabContent>
      </TabsContent>
      
      <TabsContent value="insights">
        <LazyTabContent isVisible={loadedTabs.insights} tabId="insights">
          {erroredTabs.insights ? (
            <TabContentError onRetry={() => retryTabLoad('insights')} />
          ) : (
            <CustomerInsights />
          )}
        </LazyTabContent>
      </TabsContent>
      
      <TabsContent value="pricing">
        <LazyTabContent isVisible={loadedTabs.pricing} tabId="pricing">
          {erroredTabs.pricing ? (
            <TabContentError onRetry={() => retryTabLoad('pricing')} />
          ) : (
            <PricingTools />
          )}
        </LazyTabContent>
      </TabsContent>
      
      <TabsContent value="geo">
        <LazyTabContent isVisible={loadedTabs.geo} tabId="geo">
          {erroredTabs.geo ? (
            <TabContentError onRetry={() => retryTabLoad('geo')} />
          ) : (
            <GeoTargeting />
          )}
        </LazyTabContent>
      </TabsContent>
      
      <TabsContent value="integrations">
        <LazyTabContent isVisible={loadedTabs.integrations} tabId="integrations">
          {erroredTabs.integrations ? (
            <TabContentError onRetry={() => retryTabLoad('integrations')} />
          ) : (
            <IntegrationHub />
          )}
        </LazyTabContent>
      </TabsContent>
    </Tabs>
  );
};

export default TabsSection;
