
import { memo } from "react";
import HeaderSection from "@/components/admin/dashboard/HeaderSection";
import SummaryMetrics from "@/components/admin/dashboard/SummaryMetrics";
import PerformanceMetrics from "@/components/admin/dashboard/PerformanceMetrics";
import TabsSection from "@/components/admin/dashboard/TabsSection";

const AdminDashboard = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <HeaderSection />
      <SummaryMetrics />
      <PerformanceMetrics />
      <TabsSection />
    </div>
  );
};

export default memo(AdminDashboard);
