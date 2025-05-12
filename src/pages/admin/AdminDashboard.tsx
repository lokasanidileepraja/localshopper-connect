import { useState } from "react";
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
  ChartPie, // Replaced FileChart with ChartPie
  UserSearch,
  DollarSign,
  MapPin,
  Truck,
  Link
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { AnalyticsDashboard } from "@/components/admin/AnalyticsDashboard";
import { InventoryManagement } from "@/components/admin/InventoryManagement";
import { OrderManagement } from "@/components/admin/OrderManagement";
import { UserManagement } from "@/components/admin/UserManagement";
import { ReportingDashboard } from "@/components/admin/ReportingDashboard";
import { CustomerInsights } from "@/components/admin/CustomerInsights";
import { PricingTools } from "@/components/admin/PricingTools";
import { GeoTargeting } from "@/components/admin/GeoTargeting";
import { VendorManagement } from "@/components/admin/VendorManagement";
import { IntegrationHub } from "@/components/admin/IntegrationHub";

const AdminDashboard = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("overview");
  
  const handleAlertClick = () => {
    toast({
      title: "System Alerts",
      description: "You have 3 unread system alerts that require attention.",
    });
  };

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
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Users className="h-5 w-5 text-primary mr-2" />
              <span className="text-2xl font-bold">14,583</span>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              <span className="text-green-500">↑ 12%</span> from last month
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Active Stores</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Store className="h-5 w-5 text-primary mr-2" />
              <span className="text-2xl font-bold">842</span>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              <span className="text-green-500">↑ 7%</span> from last month
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Products</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <ShoppingBag className="h-5 w-5 text-primary mr-2" />
              <span className="text-2xl font-bold">23,947</span>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              <span className="text-green-500">↑ 18%</span> from last month
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <DollarSign className="h-5 w-5 text-primary mr-2" />
              <span className="text-2xl font-bold">₹4.2M</span>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              <span className="text-green-500">↑ 22%</span> from last quarter
            </p>
          </CardContent>
        </Card>
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
              <div className="flex items-center p-2 bg-muted/50 rounded-md">
                <div className="mr-4 bg-green-100 p-2 rounded-full">
                  <Users className="h-4 w-4 text-green-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">User Registration</p>
                  <p className="text-xs text-muted-foreground">New user from Mumbai, India</p>
                </div>
                <div className="text-xs text-muted-foreground">2 mins ago</div>
              </div>
              
              <div className="flex items-center p-2 bg-muted/50 rounded-md">
                <div className="mr-4 bg-blue-100 p-2 rounded-full">
                  <ShoppingBag className="h-4 w-4 text-blue-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Product Added</p>
                  <p className="text-xs text-muted-foreground">New product: "Samsung Galaxy S25"</p>
                </div>
                <div className="text-xs text-muted-foreground">5 mins ago</div>
              </div>
              
              <div className="flex items-center p-2 bg-muted/50 rounded-md">
                <div className="mr-4 bg-purple-100 p-2 rounded-full">
                  <DollarSign className="h-4 w-4 text-purple-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Order Processed</p>
                  <p className="text-xs text-muted-foreground">Order #12489 - ₹5,999 - Pune</p>
                </div>
                <div className="text-xs text-muted-foreground">12 mins ago</div>
              </div>
              
              <div className="flex items-center p-2 bg-muted/50 rounded-md">
                <div className="mr-4 bg-yellow-100 p-2 rounded-full">
                  <Flag className="h-4 w-4 text-yellow-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Report Generated</p>
                  <p className="text-xs text-muted-foreground">Weekly sales report - Q2 2023</p>
                </div>
                <div className="text-xs text-muted-foreground">25 mins ago</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="space-y-4">
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
        
        <TabsContent value="analytics">
          <AnalyticsDashboard />
        </TabsContent>
        
        <TabsContent value="inventory">
          <InventoryManagement />
        </TabsContent>
        
        <TabsContent value="orders">
          <OrderManagement />
        </TabsContent>
        
        <TabsContent value="users">
          <UserManagement />
        </TabsContent>
        
        <TabsContent value="reports">
          <ReportingDashboard />
        </TabsContent>
        
        <TabsContent value="insights">
          <CustomerInsights />
        </TabsContent>
        
        <TabsContent value="pricing">
          <PricingTools />
        </TabsContent>
        
        <TabsContent value="geo">
          <GeoTargeting />
        </TabsContent>
        
        <TabsContent value="integrations">
          <IntegrationHub />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;
