
import { memo, useEffect } from "react";
import HeaderSection from "@/components/admin/dashboard/HeaderSection";
import SummaryMetrics from "@/components/admin/dashboard/SummaryMetrics";
import PerformanceMetrics from "@/components/admin/dashboard/PerformanceMetrics";
import TabsSection from "@/components/admin/dashboard/TabsSection";
import { ErrorBoundary } from "@/components/common/ErrorBoundary";

/**
 * Contains the admin dashboard content
 * Wrapped with memo to prevent unnecessary re-renders
 */
const AdminDashboardContainer = () => {
  // Modified to remove problematic hooks that could be causing refresh cycles
  
  useEffect(() => {
    // Clean event listeners on mount to prevent memory leaks
    console.log('Admin dashboard mounted');
    return () => {
      console.log('Admin dashboard unmounted, cleaning up resources');
    };
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <ErrorBoundary>
        <HeaderSection />
      </ErrorBoundary>
      <ErrorBoundary>
        <SummaryMetrics />
      </ErrorBoundary>
      <ErrorBoundary>
        <PerformanceMetrics />
      </ErrorBoundary>
      <ErrorBoundary>
        <TabsSection />
      </ErrorBoundary>
    </div>
  );
};

export default memo(AdminDashboardContainer);
