
import { useState, useCallback, Suspense, lazy, memo } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BarChart, 
  PieChart, 
  Bell, 
  Users, 
  Store, 
  ShoppingBag,
  Flag,
  Activity,
  TrendingUp,
  Database,
  ListOrdered,
  UserCog,
  ChartPie,
  UserSearch,
  DollarSign,
  MapPin,
  Truck,
  Link
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";

// Lazy load tab content components
const AnalyticsDashboard = lazy(() => import("@/components/admin/AnalyticsDashboard").then(mod => ({ 
  default: memo(mod.AnalyticsDashboard) 
})));
const InventoryManagement = lazy(() => import("@/components/admin/InventoryManagement").then(mod => ({ 
  default: memo(mod.InventoryManagement) 
})));
const OrderManagement = lazy(() => import("@/components/admin/OrderManagement").then(mod => ({ 
  default: memo(mod.OrderManagement) 
})));
const UserManagement = lazy(() => import("@/components/admin/UserManagement").then(mod => ({ 
  default: memo(mod.UserManagement) 
})));
const ReportingDashboard = lazy(() => import("@/components/admin/ReportingDashboard").then(mod => ({ 
  default: memo(mod.ReportingDashboard) 
})));
const CustomerInsights = lazy(() => import("@/components/admin/CustomerInsights").then(mod => ({ 
  default: memo(mod.CustomerInsights) 
})));
const PricingTools = lazy(() => import("@/components/admin/PricingTools").then(mod => ({ 
  default: memo(mod.PricingTools) 
})));
const GeoTargeting = lazy(() => import("@/components/admin/GeoTargeting").then(mod => ({ 
  default: memo(mod.GeoTargeting) 
})));
const VendorManagement = lazy(() => import("@/components/admin/VendorManagement").then(mod => ({ 
  default: memo(mod.VendorManagement) 
})));
const IntegrationHub = lazy(() => import("@/components/admin/IntegrationHub").then(mod => ({ 
  default: memo(mod.IntegrationHub) 
})));

// Create a lazy-loaded content wrapper for tab content
const LazyTabContent = memo(({ children }: { children: React.ReactNode }) => (
  <Suspense fallback={<Skeleton className="h-64 w-full" />}>
    {children}
  </Suspense>
));

// Memoized summary card component
const MetricCard = memo(({ title, value, icon, trend }: { 
  title: string; 
  value: string; 
  icon: React.ReactNode;
  trend: string;
}) => (
  <Card>
    <CardHeader className="pb-2">
      <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="flex items-center">
        {icon}
        <span className="text-2xl font-bold">{value}</span>
      </div>
      <p className="text-xs text-muted-foreground mt-2">
        <span className="text-green-500">{trend}</span> from last month
      </p>
    </CardContent>
  </Card>
));

const ActivityItem = memo(({ icon, iconBg, title, description, time }: {
  icon: React.ReactNode;
  iconBg: string;
  title: string;
  description: string;
  time: string;
}) => (
  <div className="flex items-center p-2 bg-muted/50 rounded-md">
    <div className={`mr-4 ${iconBg} p-2 rounded-full`}>
      {icon}
    </div>
    <div className="flex-1">
      <p className="text-sm font-medium">{title}</p>
      <p className="text-xs text-muted-foreground">{description}</p>
    </div>
    <div className="text-xs text-muted-foreground">{time}</div>
  </div>
));

const AdminDashboard = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("overview");
  const [loadedTabs, setLoadedTabs] = useState<Record<string, boolean>>({ overview: true });
  
  const handleAlertClick = useCallback(() => {
    toast({
      title: "System Alerts",
      description: "You have 3 unread system alerts that require attention.",
    });
  }, [toast]);

  const handleTabChange = useCallback((value: string) => {
    setActiveTab(value);
    setLoadedTabs(prev => ({ ...prev, [value]: true }));
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground">Comprehensive platform management and analytics</p>
        </div>
        <div className="flex gap-2 mt-4 md:mt-0">
          <Button variant="outline" onClick={() => toast({
            title: "Refresh Data",
            description: "Dashboard data has been refreshed.",
          })}>
            <Activity className="mr-2 h-4 w-4" />
            Refresh Data
          </Button>
          <Button onClick={handleAlertClick}>
            <Bell className="mr-2 h-4 w-4" />
            Alerts
            <Badge className="ml-2 bg-red-500" variant="secondary">3</Badge>
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <MetricCard 
          title="Total Users" 
          value="14,583" 
          icon={<Users className="h-5 w-5 text-primary mr-2" />}
          trend="↑ 12%" 
        />
        
        <MetricCard 
          title="Active Stores" 
          value="842" 
          icon={<Store className="h-5 w-5 text-primary mr-2" />}
          trend="↑ 7%" 
        />
        
        <MetricCard 
          title="Total Products" 
          value="23,947" 
          icon={<ShoppingBag className="h-5 w-5 text-primary mr-2" />}
          trend="↑ 18%" 
        />
        
        <MetricCard 
          title="Revenue" 
          value="₹4.2M" 
          icon={<DollarSign className="h-5 w-5 text-primary mr-2" />}
          trend="↑ 22%" 
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Critical Metrics</CardTitle>
            <CardDescription>Real-time platform health</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm">System Uptime</span>
                <Badge className="bg-green-500">99.98%</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Database Performance</span>
                <Badge className="bg-green-500">Optimal</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">API Response Time</span>
                <Badge className="bg-yellow-500">142ms</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Failed Transactions</span>
                <Badge variant="destructive">3 Today</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Active Support Cases</span>
                <Badge variant="outline">12</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Real-time Activity</CardTitle>
            <CardDescription>Live platform interactions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <ActivityItem 
                icon={<Users className="h-4 w-4 text-green-600" />}
                iconBg="bg-green-100"
                title="User Registration"
                description="New user from Mumbai, India"
                time="2 mins ago"
              />
              
              <ActivityItem 
                icon={<ShoppingBag className="h-4 w-4 text-blue-600" />}
                iconBg="bg-blue-100"
                title="Product Added"
                description="New product: "Samsung Galaxy S25""
                time="5 mins ago"
              />
              
              <ActivityItem 
                icon={<DollarSign className="h-4 w-4 text-purple-600" />}
                iconBg="bg-purple-100"
                title="Order Processed"
                description="Order #12489 - ₹5,999 - Pune"
                time="12 mins ago"
              />
              
              <ActivityItem 
                icon={<Flag className="h-4 w-4 text-yellow-600" />}
                iconBg="bg-yellow-100"
                title="Report Generated"
                description="Weekly sales report - Q2 2023"
                time="25 mins ago"
              />
            </div>
          </CardContent>
        </Card>
      </div>
      
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
          <Card>
            <CardHeader>
              <CardTitle>Platform Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80 flex items-center justify-center bg-muted/50 rounded-md">
                <BarChart className="h-16 w-16 text-muted-foreground" />
                <p className="ml-4 text-muted-foreground">Platform summary data and overview charts would appear here</p>
              </div>
            </CardContent>
          </Card>
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
    </div>
  );
};

export default AdminDashboard;
