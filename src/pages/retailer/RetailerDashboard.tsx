
import { useCallback, useState, memo, Suspense } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RetailerDashboard as RetailerDashboardComponents } from "@/components/retailer/RetailerDashboard";
import { SalesChart } from "@/components/retailer/SalesChart";
import { InventorySummary } from "@/components/retailer/InventorySummary";
import { RecentReservations } from "@/components/retailer/RecentReservations";
import { OrderManagement } from "@/components/retailer/OrderManagement";
import { Skeleton } from "@/components/ui/skeleton";

// Memoize content components for better performance
const MemoizedSalesChart = memo(SalesChart);
const MemoizedInventorySummary = memo(InventorySummary);
const MemoizedReservations = memo(RecentReservations);
const MemoizedOrderManagement = memo(OrderManagement);

// Create a lazy-loaded content wrapper for tab content
const LazyTabContent = memo(({ children }: { children: React.ReactNode }) => (
  <Suspense fallback={<Skeleton className="h-48 w-full" />}>
    {children}
  </Suspense>
));

const RetailerDashboard = () => {
  const [activeTab, setActiveTab] = useState<string | null>(null);
  
  // Only render components when their tab is active or has been viewed
  const handleTabChange = useCallback((value: string) => {
    setActiveTab(prev => prev === null ? value : prev);
  }, []);
  
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
              <MemoizedSalesChart />
            </CardContent>
          </Card>
        </div>
        
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Inventory Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <MemoizedInventorySummary />
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
            <MemoizedReservations />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <LazyTabContent>
              <MemoizedOrderManagement />
            </LazyTabContent>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RetailerDashboard;
