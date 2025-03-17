
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  ShoppingBag, 
  Banknote, 
  UserCheck, 
  ChevronUpSquare, 
  BarChart2,
  MessageSquare,
  Bell,
  Calendar,
  Package,
  TrendingUp,
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";

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
        { id: "RES-1234", product: "iPhone 15", customer: "Amit S.", time: "2 hours ago", status: "pending" },
        { id: "RES-1233", product: "Samsung S23", customer: "Priya M.", time: "5 hours ago", status: "completed" },
        { id: "RES-1232", product: "OnePlus 12", customer: "Raj K.", time: "1 day ago", status: "cancelled" },
      ],
    }),
  });

  if (!dashboardData) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i} className="h-32 animate-pulse">
            <CardContent className="p-6">
              <div className="h-5 bg-muted rounded w-1/2 mb-4"></div>
              <div className="h-8 bg-muted rounded w-1/3"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">Total Sales</p>
                <p className="text-2xl font-bold">₹{dashboardData.totalSales.toLocaleString()}</p>
              </div>
              <div className="h-8 w-8 bg-primary/20 flex items-center justify-center rounded-full">
                <Banknote className="h-4 w-4 text-primary" />
              </div>
            </div>
            <div className="flex items-center mt-4 text-sm">
              <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
              <span className="text-green-500 font-medium">{dashboardData.salesGrowth}%</span>
              <span className="text-muted-foreground ml-1">vs last month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">Reservations</p>
                <p className="text-2xl font-bold">{dashboardData.totalReservations}</p>
              </div>
              <div className="h-8 w-8 bg-primary/20 flex items-center justify-center rounded-full">
                <ShoppingBag className="h-4 w-4 text-primary" />
              </div>
            </div>
            <div className="flex items-center mt-4 text-sm">
              <div className="flex gap-2">
                <Badge variant="outline" className="text-orange-500 border-orange-200 bg-orange-50">
                  {dashboardData.pendingPickups} pending
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">Customers</p>
                <p className="text-2xl font-bold">{dashboardData.totalCustomers}</p>
              </div>
              <div className="h-8 w-8 bg-primary/20 flex items-center justify-center rounded-full">
                <UserCheck className="h-4 w-4 text-primary" />
              </div>
            </div>
            <div className="flex items-center mt-4 text-sm">
              <Badge variant="outline" className="text-blue-500 border-blue-200 bg-blue-50">
                12 new this week
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card className={dashboardData.pendingStockUpdates ? "border-orange-300 bg-orange-50" : ""}>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">Inventory Status</p>
                <p className="text-2xl font-bold">
                  {dashboardData.pendingStockUpdates ? "Update Needed" : "Up to Date"}
                </p>
              </div>
              <div className={`h-8 w-8 ${dashboardData.pendingStockUpdates ? "bg-orange-200" : "bg-green-200"} flex items-center justify-center rounded-full`}>
                <Package className={`h-4 w-4 ${dashboardData.pendingStockUpdates ? "text-orange-600" : "text-green-600"}`} />
              </div>
            </div>
            <div className="flex justify-between items-center mt-4 text-sm">
              <span className="text-muted-foreground">Last updated 5 days ago</span>
              <Button variant="secondary" size="sm">Update Now</Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart2 className="h-5 w-5" />
              Top Selling Products
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {dashboardData.topSellingProducts.map((product, index) => (
                <div key={index} className="flex items-center justify-between p-2 border rounded-lg">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center justify-center w-6 h-6 bg-primary/10 rounded-full">
                      <span className="text-xs font-medium text-primary">{index + 1}</span>
                    </div>
                    <span className="font-medium">{product.name}</span>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">Units Sold</p>
                      <p className="font-medium">{product.qty}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">Revenue</p>
                      <p className="font-medium">₹{product.revenue.toLocaleString()}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Recent Reservations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {dashboardData.recentReservations.map((reservation, index) => (
                <div key={index} className="flex items-center justify-between p-2 border rounded-lg">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{reservation.product}</span>
                      <Badge variant={
                        reservation.status === "pending" ? "default" :
                        reservation.status === "completed" ? "outline" : "destructive"
                      }>
                        {reservation.status}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {reservation.customer} • {reservation.time}
                    </p>
                  </div>
                  <Button variant="ghost" size="sm">
                    Details
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className={dashboardData.unreadMessages ? "border-blue-300" : ""}>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                Customer Messages
              </div>
              {dashboardData.unreadMessages > 0 && (
                <Badge className="bg-blue-500">
                  {dashboardData.unreadMessages} New
                </Badge>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-1 text-center py-4">
              <p className="text-muted-foreground">
                You have {dashboardData.unreadMessages} unread messages from customers
              </p>
              <Button className="mt-4">
                <MessageSquare className="mr-2 h-4 w-4" />
                View Messages
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              WhatsApp Updates
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-green-50 border border-green-200">
                <h3 className="font-medium mb-2 text-green-800">WhatsApp Management Active</h3>
                <p className="text-sm text-green-700">
                  You're receiving price inquiries and order notifications via WhatsApp
                </p>
              </div>
              <Button className="w-full">
                <ChevronUpSquare className="mr-2 h-4 w-4" />
                Send Stock Update
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
