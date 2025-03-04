
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  BarChart3, 
  LineChart, 
  PieChart,
  Download,
  Calendar,
  TrendingUp,
  TrendingDown,
  DollarSign,
  ShoppingBag,
  Users,
  RefreshCcw
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const RetailerAnalytics = () => {
  const { toast } = useToast();
  
  const handleRefreshData = () => {
    toast({
      title: "Refreshing Data",
      description: "Updating analytics with the latest information",
    });
  };

  const handleDownloadReport = () => {
    toast({
      title: "Download Report",
      description: "Preparing your analytics report for download",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <h2 className="text-xl font-bold">Sales & Performance Analytics</h2>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Calendar className="h-4 w-4 mr-1" />
            Last 30 Days
          </Button>
          <Button variant="outline" size="sm" onClick={handleRefreshData}>
            <RefreshCcw className="h-4 w-4 mr-1" />
            Refresh
          </Button>
          <Button size="sm" onClick={handleDownloadReport}>
            <Download className="h-4 w-4 mr-1" />
            Export
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 flex items-center">
            <div className="mr-4 bg-blue-100 p-3 rounded-full">
              <DollarSign className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Revenue</p>
              <div className="flex items-center">
                <p className="text-xl font-bold">₹1.24L</p>
                <TrendingUp className="h-4 w-4 text-green-500 ml-2" />
                <span className="text-xs text-green-500">+12%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 flex items-center">
            <div className="mr-4 bg-green-100 p-3 rounded-full">
              <ShoppingBag className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Orders</p>
              <div className="flex items-center">
                <p className="text-xl font-bold">243</p>
                <TrendingUp className="h-4 w-4 text-green-500 ml-2" />
                <span className="text-xs text-green-500">+8%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 flex items-center">
            <div className="mr-4 bg-purple-100 p-3 rounded-full">
              <Users className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">New Customers</p>
              <div className="flex items-center">
                <p className="text-xl font-bold">56</p>
                <TrendingUp className="h-4 w-4 text-green-500 ml-2" />
                <span className="text-xs text-green-500">+23%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 flex items-center">
            <div className="mr-4 bg-yellow-100 p-3 rounded-full">
              <DollarSign className="h-6 w-6 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Avg. Order Value</p>
              <div className="flex items-center">
                <p className="text-xl font-bold">₹5,120</p>
                <TrendingDown className="h-4 w-4 text-red-500 ml-2" />
                <span className="text-xs text-red-500">-3%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-medium">Revenue Trend</h3>
              <LineChart className="h-5 w-5 text-gray-400" />
            </div>
            <div className="h-60 flex items-center justify-center bg-gray-50 rounded-md">
              <p className="text-gray-500">Revenue chart will be displayed here</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-medium">Top Selling Products</h3>
              <BarChart3 className="h-5 w-5 text-gray-400" />
            </div>
            <div className="h-60 flex items-center justify-center bg-gray-50 rounded-md">
              <p className="text-gray-500">Product sales chart will be displayed here</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-medium">Sales by Category</h3>
              <PieChart className="h-5 w-5 text-gray-400" />
            </div>
            <div className="h-40 flex items-center justify-center bg-gray-50 rounded-md">
              <p className="text-gray-500">Category distribution chart will be displayed here</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-medium">Customer Demographics</h3>
              <PieChart className="h-5 w-5 text-gray-400" />
            </div>
            <div className="h-40 flex items-center justify-center bg-gray-50 rounded-md">
              <p className="text-gray-500">Customer demographics chart will be displayed here</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-medium">Order Status</h3>
              <PieChart className="h-5 w-5 text-gray-400" />
            </div>
            <div className="h-40 flex items-center justify-center bg-gray-50 rounded-md">
              <p className="text-gray-500">Order status distribution chart will be displayed here</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
