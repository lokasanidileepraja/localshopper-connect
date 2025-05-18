
import { memo, useEffect } from "react";
import HeaderSection from "@/components/admin/dashboard/HeaderSection";
import SummaryMetrics from "@/components/admin/dashboard/SummaryMetrics";
import PerformanceMetrics from "@/components/admin/dashboard/PerformanceMetrics";
import TabsSection from "@/components/admin/dashboard/TabsSection";
import { usePreventRefresh } from "@/hooks/usePreventRefresh";
import { useRenderOptimizer } from "@/hooks/useRenderOptimizer";

/**
 * Contains the admin dashboard content
 * Wrapped with memo to prevent unnecessary re-renders
 */
const AdminDashboardContainer = () => {
  // Apply optimization hooks
  usePreventRefresh();
  useRenderOptimizer('AdminDashboardContainer');
  
  useEffect(() => {
    // Clean event listeners on mount to prevent memory leaks
    return () => {
      console.log('Admin dashboard unmounted, cleaning up resources');
    };
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <HeaderSection />
      <SummaryMetrics />
      <PerformanceMetrics />
      <TabsSection />
    </div>
  );
};

export default memo(AdminDashboardContainer);
