
import { useQuery } from "@tanstack/react-query";
import { DashboardMetrics } from "./dashboard/DashboardMetrics";
import { TopSellingProducts } from "./dashboard/TopSellingProducts";
import { DashboardReservations } from "./dashboard/RecentReservations";
import { memo, useMemo, useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { ErrorBoundary } from "@/components/common/ErrorBoundary";
import { usePerformanceMonitor } from "@/hooks/usePerformanceMonitor";
import { useToast } from "@/hooks/use-toast";

export const RetailerDashboard = memo(() => {
  // Monitor performance to detect issues
  usePerformanceMonitor('RetailerDashboardComponent');
  
  const { toast } = useToast();
  
  // Improved React Query configuration
  const { data: dashboardData, isLoading, error } = useQuery({
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
    staleTime: 5 * 60 * 1000, // 5 minutes cache
    gcTime: 10 * 60 * 1000, // 10 minutes cache garbage collection
    retry: 1, // Only retry once to prevent excessive requests
    refetchOnWindowFocus: false, // Disable refetching on window focus
    refetchOnMount: true, // Enable refetch on mount for data freshness
  });

  // Handle errors gracefully
  useEffect(() => {
    if (error) {
      toast({
        title: "Dashboard Error",
        description: "Failed to load dashboard data. Please try again.",
        variant: "destructive",
      });
      console.error("Dashboard error:", error);
    }
  }, [error, toast]);

  // Memoize skeleton to prevent recreation on each render
  const loadingSkeleton = useMemo(() => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {[1, 2, 3, 4].map((i) => (
        <Skeleton key={i} className="h-32" />
      ))}
      <Skeleton className="h-64 col-span-2" />
      <Skeleton className="h-64 col-span-2" />
    </div>
  ), []);

  // Show loading skeleton
  if (isLoading || !dashboardData) {
    return loadingSkeleton;
  }

  return (
    <div className="space-y-6">
      <ErrorBoundary>
        <DashboardMetrics 
          totalSales={dashboardData.totalSales}
          totalReservations={dashboardData.totalReservations}
          totalCustomers={dashboardData.totalCustomers}
          pendingPickups={dashboardData.pendingPickups}
          salesGrowth={dashboardData.salesGrowth}
          pendingStockUpdates={dashboardData.pendingStockUpdates}
        />
      </ErrorBoundary>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <ErrorBoundary>
          <TopSellingProducts products={dashboardData.topSellingProducts} />
        </ErrorBoundary>
        <ErrorBoundary>
          <DashboardReservations reservations={dashboardData.recentReservations} />
        </ErrorBoundary>
      </div>
    </div>
  );
});

RetailerDashboard.displayName = 'RetailerDashboard';
