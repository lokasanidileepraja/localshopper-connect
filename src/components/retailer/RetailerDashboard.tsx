
import { useQuery } from "@tanstack/react-query";
import { DashboardMetrics } from "./dashboard/DashboardMetrics";
import { TopSellingProducts } from "./dashboard/TopSellingProducts";
import { DashboardReservations } from "./dashboard/RecentReservations";

export const RetailerDashboard = () => {
  const { data: dashboardData } = useQuery({
    queryKey: ["retailerDashboard"],
    queryFn: () => Promise.resolve({
      totalSales: 158750,
      totalReservations: 24,
      totalCustomers: 87,
      pendingPickups: 6,
      pendingStockUpdates: true,
      unreadMessages: 3,
      salesGrowth: 18,
      topSellingProducts: [
        { name: "iPhone 15", qty: 12, revenue: 95988 },
        { name: "Samsung Galaxy S23", qty: 8, revenue: 63992 },
        { name: "OnePlus 12", qty: 6, revenue: 41994 },
      ],
      recentReservations: [
        { id: "RES-1234", product: "iPhone 15", customer: "Amit S.", time: "2 hours ago", status: "pending" as const },
        { id: "RES-1233", product: "Samsung S23", customer: "Priya M.", time: "5 hours ago", status: "completed" as const },
        { id: "RES-1232", product: "OnePlus 12", customer: "Raj K.", time: "1 day ago", status: "cancelled" as const },
      ],
    }),
  });

  if (!dashboardData) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-32 animate-pulse bg-muted rounded-lg" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <DashboardMetrics 
        totalSales={dashboardData.totalSales}
        totalReservations={dashboardData.totalReservations}
        totalCustomers={dashboardData.totalCustomers}
        pendingPickups={dashboardData.pendingPickups}
        salesGrowth={dashboardData.salesGrowth}
        pendingStockUpdates={dashboardData.pendingStockUpdates}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <TopSellingProducts products={dashboardData.topSellingProducts} />
        <DashboardReservations reservations={dashboardData.recentReservations} />
      </div>
    </div>
  );
};
