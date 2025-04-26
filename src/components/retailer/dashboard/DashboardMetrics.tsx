
import { Card, CardContent } from "@/components/ui/card";
import { 
  ShoppingBag, 
  Banknote, 
  UserCheck, 
  Package,
  TrendingUp,
} from "lucide-react";

interface DashboardMetricsProps {
  totalSales: number;
  totalReservations: number;
  totalCustomers: number;
  pendingPickups: number;
  salesGrowth: number;
  pendingStockUpdates: boolean;
}

export const DashboardMetrics = ({
  totalSales,
  totalReservations,
  totalCustomers,
  pendingPickups,
  salesGrowth,
  pendingStockUpdates
}: DashboardMetricsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card>
        <CardContent className="p-6">
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">Total Sales</p>
              <p className="text-2xl font-bold">₹{totalSales.toLocaleString()}</p>
            </div>
            <div className="h-8 w-8 bg-primary/20 flex items-center justify-center rounded-full">
              <Banknote className="h-4 w-4 text-primary" />
            </div>
          </div>
          <div className="flex items-center mt-4 text-sm">
            <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
            <span className="text-green-500 font-medium">{salesGrowth}%</span>
            <span className="text-muted-foreground ml-1">vs last month</span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">Reservations</p>
              <p className="text-2xl font-bold">{totalReservations}</p>
            </div>
            <div className="h-8 w-8 bg-primary/20 flex items-center justify-center rounded-full">
              <ShoppingBag className="h-4 w-4 text-primary" />
            </div>
          </div>
          <div className="flex items-center mt-4 text-sm">
            <div className="flex gap-2">
              <div className="text-orange-500 border-orange-200 bg-orange-50 inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold">
                {pendingPickups} pending
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">Customers</p>
              <p className="text-2xl font-bold">{totalCustomers}</p>
            </div>
            <div className="h-8 w-8 bg-primary/20 flex items-center justify-center rounded-full">
              <UserCheck className="h-4 w-4 text-primary" />
            </div>
          </div>
          <div className="flex items-center mt-4 text-sm">
            <div className="text-blue-500 border-blue-200 bg-blue-50 inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold">
              12 new this week
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className={pendingStockUpdates ? "border-orange-300 bg-orange-50" : ""}>
        <CardContent className="p-6">
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">Inventory Status</p>
              <p className="text-2xl font-bold">
                {pendingStockUpdates ? "Update Needed" : "Up to Date"}
              </p>
            </div>
            <div className={`h-8 w-8 ${pendingStockUpdates ? "bg-orange-200" : "bg-green-200"} flex items-center justify-center rounded-full`}>
              <Package className={`h-4 w-4 ${pendingStockUpdates ? "text-orange-600" : "text-green-600"}`} />
            </div>
          </div>
          <div className="flex justify-between items-center mt-4 text-sm">
            <span className="text-muted-foreground">Last updated 5 days ago</span>
            <button className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2">
              Update Now
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
