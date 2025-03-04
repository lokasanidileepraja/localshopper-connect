
import { Card, CardContent } from "@/components/ui/card";
import { 
  BarChart3, 
  Box, 
  Truck, 
  Users, 
  ShoppingBag, 
  TrendingUp,
  Bell,
  MessageSquare,
  CheckCircle
} from "lucide-react";

export const RetailerDashboard = () => {
  // Sample data - In a real app, this would come from an API
  const stats = [
    { name: "Total Orders", value: "27", icon: ShoppingBag, trend: "+12%" },
    { name: "Total Revenue", value: "₹18,452", icon: TrendingUp, trend: "+8%" },
    { name: "Inventory Items", value: "143", icon: Box, trend: "-3%" },
    { name: "Customer Queries", value: "5", icon: MessageSquare, trend: "+1" },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.name}>
            <CardContent className="p-4 flex items-center">
              <div className="mr-4 bg-primary/10 p-3 rounded-full">
                <stat.icon className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-gray-500">{stat.name}</p>
                <div className="flex items-center">
                  <p className="text-xl font-bold">{stat.value}</p>
                  <span className="ml-2 text-xs text-green-500">{stat.trend}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardContent className="p-4">
            <h3 className="font-semibold mb-4">Recent Orders</h3>
            <div className="space-y-3">
              {[1, 2, 3].map((order) => (
                <div key={order} className="flex items-center justify-between border-b pb-3">
                  <div>
                    <p className="font-medium">Order #{1000 + order}</p>
                    <p className="text-sm text-gray-500">2 items • ₹1,245</p>
                  </div>
                  <div className="flex items-center">
                    <span className="px-2 py-1 rounded text-xs bg-yellow-100 text-yellow-800 mr-2">
                      Pending
                    </span>
                    <button className="text-primary text-sm">View</button>
                  </div>
                </div>
              ))}
            </div>
            <button className="mt-4 text-primary text-sm">View All Orders</button>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <h3 className="font-semibold mb-4">Notifications</h3>
            <div className="space-y-3">
              <div className="flex gap-3 border-b pb-3">
                <Bell className="h-5 w-5 text-primary shrink-0" />
                <div>
                  <p className="text-sm">Low stock alert: "Samsung Galaxy A53"</p>
                  <p className="text-xs text-gray-500">1 hour ago</p>
                </div>
              </div>
              <div className="flex gap-3 border-b pb-3">
                <CheckCircle className="h-5 w-5 text-green-500 shrink-0" />
                <div>
                  <p className="text-sm">Order #1002 has been delivered</p>
                  <p className="text-xs text-gray-500">3 hours ago</p>
                </div>
              </div>
              <div className="flex gap-3 pb-3">
                <Users className="h-5 w-5 text-blue-500 shrink-0" />
                <div>
                  <p className="text-sm">New customer registered: Amit Sharma</p>
                  <p className="text-xs text-gray-500">Yesterday</p>
                </div>
              </div>
            </div>
            <button className="mt-2 text-primary text-sm">View All Notifications</button>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="p-4">
          <h3 className="font-semibold mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {[
              { name: "Add Product", icon: Box },
              { name: "Process Orders", icon: ShoppingBag },
              { name: "Update Stock", icon: TrendingUp },
              { name: "Customer Chat", icon: MessageSquare },
              { name: "Create Promotion", icon: Bell }
            ].map((action) => (
              <button 
                key={action.name}
                className="flex flex-col items-center justify-center p-4 border rounded-lg hover:bg-gray-50 transition-colors"
              >
                <action.icon className="h-6 w-6 text-primary mb-2" />
                <span className="text-sm">{action.name}</span>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
