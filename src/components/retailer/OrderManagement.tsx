
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Search, 
  Filter, 
  Calendar, 
  CheckCircle, 
  Clock,
  Truck,
  X,
  FileText,
  RefreshCcw,
  Download,
  ShoppingBag,
  CreditCard
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const OrderManagement = () => {
  const { toast } = useToast();
  const [orderTab, setOrderTab] = useState("all");
  
  // Sample orders data
  const orders = [
    { 
      id: "10045", 
      customer: "Rahul Sharma", 
      items: 3,
      value: 4999,
      date: "2023-09-15", 
      status: "pending",
      payment: "online"
    },
    { 
      id: "10044", 
      customer: "Priya Singh", 
      items: 1,
      value: 89999,
      date: "2023-09-14", 
      status: "processing",
      payment: "cod"
    },
    { 
      id: "10043", 
      customer: "Ajay Patel", 
      items: 4,
      value: 12499,
      date: "2023-09-14", 
      status: "shipped",
      payment: "online"
    },
    { 
      id: "10042", 
      customer: "Neha Gupta", 
      items: 2,
      value: 6249,
      date: "2023-09-13", 
      status: "delivered",
      payment: "cod"
    },
    { 
      id: "10041", 
      customer: "Vijay Kumar", 
      items: 1,
      value: 54999,
      date: "2023-09-12", 
      status: "cancelled",
      payment: "online"
    }
  ];

  const getStatusIcon = (status: string) => {
    switch(status) {
      case "pending": return <Clock className="h-4 w-4 text-yellow-500" />;
      case "processing": return <RefreshCcw className="h-4 w-4 text-blue-500" />;
      case "shipped": return <Truck className="h-4 w-4 text-purple-500" />;
      case "delivered": return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "cancelled": return <X className="h-4 w-4 text-red-500" />;
      default: return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusBadge = (status: string) => {
    let variant: "default" | "secondary" | "destructive" | "outline" = "default";
    
    switch(status) {
      case "pending": variant = "secondary"; break;
      case "processing": variant = "secondary"; break;
      case "delivered": variant = "default"; break;
      case "cancelled": variant = "destructive"; break;
      default: variant = "outline";
    }
    
    return (
      <Badge variant={variant} className="capitalize flex items-center gap-1">
        {getStatusIcon(status)}
        {status}
      </Badge>
    );
  };

  const handleViewOrder = (id: string) => {
    toast({
      title: "View Order",
      description: `Viewing Order #${id}`,
    });
  };

  const handleProcessOrder = (id: string) => {
    toast({
      title: "Process Order",
      description: `Processing Order #${id}`,
    });
  };

  const filteredOrders = orderTab === "all" 
    ? orders 
    : orders.filter(order => order.status === orderTab);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="relative w-full sm:w-auto flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input placeholder="Search orders..." className="pl-10" />
        </div>
        <div className="flex gap-2 items-center w-full sm:w-auto justify-end">
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-1" />
            Filter
          </Button>
          <Button variant="outline" size="sm">
            <Calendar className="h-4 w-4 mr-1" />
            Date Range
          </Button>
          <Button size="sm">
            <Download className="h-4 w-4 mr-1" />
            Export
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 flex items-center">
            <div className="mr-4 bg-blue-100 p-3 rounded-full">
              <ShoppingBag className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Orders</p>
              <p className="text-xl font-bold">124</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 flex items-center">
            <div className="mr-4 bg-yellow-100 p-3 rounded-full">
              <Clock className="h-6 w-6 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Pending</p>
              <p className="text-xl font-bold">12</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 flex items-center">
            <div className="mr-4 bg-green-100 p-3 rounded-full">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Completed</p>
              <p className="text-xl font-bold">96</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 flex items-center">
            <div className="mr-4 bg-purple-100 p-3 rounded-full">
              <CreditCard className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Revenue</p>
              <p className="text-xl font-bold">₹1.2L</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={orderTab} onValueChange={setOrderTab}>
        <TabsList>
          <TabsTrigger value="all">All Orders</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="processing">Processing</TabsTrigger>
          <TabsTrigger value="shipped">Shipped</TabsTrigger>
          <TabsTrigger value="delivered">Delivered</TabsTrigger>
          <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
        </TabsList>
        
        <TabsContent value={orderTab} className="mt-4">
          <div className="border rounded-md">
            <div className="grid grid-cols-6 gap-4 p-4 border-b bg-gray-50 font-medium">
              <div>Order ID</div>
              <div>Customer</div>
              <div>Date</div>
              <div>Value</div>
              <div>Status</div>
              <div className="text-right">Actions</div>
            </div>
            {filteredOrders.length > 0 ? (
              filteredOrders.map((order, index) => (
                <div 
                  key={order.id}
                  className={`grid grid-cols-6 gap-4 p-4 items-center ${
                    index !== filteredOrders.length - 1 ? 'border-b' : ''
                  }`}
                >
                  <div className="font-medium">#{order.id}</div>
                  <div>{order.customer}</div>
                  <div>{new Date(order.date).toLocaleDateString()}</div>
                  <div>₹{order.value.toLocaleString()}</div>
                  <div>{getStatusBadge(order.status)}</div>
                  <div className="flex justify-end gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleViewOrder(order.id)}
                    >
                      <FileText className="h-4 w-4 mr-1" />
                      View
                    </Button>
                    {(order.status === "pending" || order.status === "processing") && (
                      <Button
                        size="sm"
                        onClick={() => handleProcessOrder(order.id)}
                      >
                        Process
                      </Button>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="p-8 text-center text-gray-500">
                No orders found with the selected filter
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
