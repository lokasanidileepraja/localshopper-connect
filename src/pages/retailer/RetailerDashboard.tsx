
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RetailerDashboard as RetailerDashboardComponents } from "@/components/retailer/RetailerDashboard";
import { SalesChart } from "@/components/retailer/SalesChart";
import { InventorySummary } from "@/components/retailer/InventorySummary";
import { RecentReservations } from "@/components/retailer/RecentReservations";
import { OrderManagement } from "@/components/retailer/OrderManagement";

const RetailerDashboard = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Retailer Dashboard</h1>
      
      <RetailerDashboardComponents />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Sales Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <SalesChart />
            </CardContent>
          </Card>
        </div>
        
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Inventory Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <InventorySummary />
            </CardContent>
          </Card>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Reservations</CardTitle>
          </CardHeader>
          <CardContent>
            <RecentReservations />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <OrderManagement />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RetailerDashboard;
