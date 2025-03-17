
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { WhatsAppStockUpdate } from "./WhatsAppStockUpdate";
import { QuickActions } from "./QuickActions";
import { SalesChart } from "./SalesChart";
import { RecentReservations } from "./RecentReservations";
import { InventorySummary } from "./InventorySummary";

export const RetailerDashboardComponents = () => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <div className="col-span-2">
        <SalesChart />
      </div>
      
      <div className="space-y-4">
        <QuickActions />
        <WhatsAppStockUpdate storeId="store123" />
      </div>
      
      <div className="col-span-2">
        <RecentReservations />
      </div>
      
      <div>
        <InventorySummary />
      </div>
    </div>
  );
};

export { WhatsAppStockUpdate } from "./WhatsAppStockUpdate";
export { QuickActions } from "./QuickActions";
export { SalesChart } from "./SalesChart";
export { RecentReservations } from "./RecentReservations";
export { InventorySummary } from "./InventorySummary";
