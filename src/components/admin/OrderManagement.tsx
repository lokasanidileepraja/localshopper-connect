import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ListOrdered, Search, Filter, Calendar, Clock, CheckCircle, Truck, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function OrderManagement() {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  
  // Mock orders data
  const orders = [
    { 
      id: "ORD-10045", 
      customer: "Rahul Sharma", 
      items: 3,
      value: 4999,
      date: "2023-09-15", 
      status: "pending",
      priority: "high"
    },
    { 
      id: "ORD-10044", 
      customer: "Priya Singh", 
      items: 1,
      value: 89999,
      date: "2023-09-14", 
      status: "processing",
      priority: "medium"
    },
    { 
      id: "ORD-10043", 
      customer: "Ajay Patel", 
      items: 4,
      value: 12499,
      date: "2023-09-14", 
      status: "shipped",
      priority: "standard"
    },
    { 
      id: "ORD-10042", 
      customer: "Neha Gupta", 
      items: 2,
      value: 6249,
      date: "2023-09-13", 
      status: "delivered",
      priority: "standard"
    },
    { 
      id: "ORD-10041", 
      customer: "Vijay Kumar", 
      items: 1,
      value: 54999,
      date: "2023-09-12", 
      status: "cancelled",
      priority: "low"
    },
    { 
      id: "ORD-10040", 
      customer: "Shreya Patel", 
      items: 5,
      value: 12999,
      date: "2023-09-12", 
      status: "pending",
      priority: "urgent"
    }
  ];
  
  const getStatusBadge = (status: string) => {
    switch(status) {
      case "pending":
        return <Badge variant="secondary"><Clock className="mr-1 h-3 w-3" /> Pending</Badge>;
      case "processing":
        return <Badge className="bg-blue-500"><Clock className="mr-1 h-3 w-3" /> Processing</Badge>;
      case "shipped":
        return <Badge className="bg-purple-500"><Truck className="mr-1 h-3 w-3" /> Shipped</Badge>;
      case "delivered":
        return <Badge className="bg-green-500"><CheckCircle className="mr-1 h-3 w-3" /> Delivered</Badge>;
      case "cancelled":
        return <Badge variant="destructive"><X className="mr-1 h-3 w-3" /> Cancelled</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };
  
  const getPriorityBadge = (priority: string) => {
    switch(priority) {
      case "urgent":
        return <Badge className="bg-red-500">Urgent</Badge>;
      case "high":
        return <Badge className="bg-orange-500">High</Badge>;
      case "medium":
        return <Badge className="bg-yellow-500 text-black">Medium</Badge>;
      case "standard":
      case "low":
      default:
        return <Badge variant="outline">Standard</Badge>;
    }
  };
  
  const filteredOrders = searchTerm ? 
    orders.filter(order => 
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchTerm.toLowerCase())
    ) : orders;
  
  const prioritySort = (a: any, b: any) => {
    const priorityMap: {[key: string]: number} = {
      urgent: 1,
      high: 2,
      medium: 3,
      standard: 4,
      low: 5
    };
    
    return priorityMap[a.priority] - priorityMap[b.priority];
  };
  
  const sortedOrders = [...filteredOrders].sort(prioritySort);
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold">Intelligent Order Management</h2>
          <p className="text-muted-foreground">Prioritize and manage orders with smart automation</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
          <Button variant="outline">
            <Calendar className="mr-2 h-4 w-4" />
            Date Range
          </Button>
          <Button onClick={() => {
            toast({
              title: "Orders Processed",
              description: "Batch processing of 5 orders completed."
            });
          }}>
            Batch Process
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Orders</CardTitle>
          </CardHeader>
          <CardContent className="space-y-1">
            <div className="text-2xl font-bold">1,254</div>
            <p className="text-xs text-muted-foreground">Past 30 days</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Pending Orders</CardTitle>
          </CardHeader>
          <CardContent className="space-y-1">
            <div className="text-2xl font-bold text-yellow-500">42</div>
            <p className="text-xs text-muted-foreground">5 high priority</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Processing Rate</CardTitle>
          </CardHeader>
          <CardContent className="space-y-1">
            <div className="text-2xl font-bold text-green-500">98%</div>
            <p className="text-xs text-muted-foreground">2% faster than target</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Avg. Fulfillment Time</CardTitle>
          </CardHeader>
          <CardContent className="space-y-1">
            <div className="text-2xl font-bold">1.3 days</div>
            <p className="text-xs text-green-500">-0.2 days from last month</p>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Order Queue</CardTitle>
          <CardDescription>Smart prioritized order processing queue</CardDescription>
          <div className="mt-4 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input 
              placeholder="Search by order ID or customer name..." 
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all">
            <TabsList className="mb-4">
              <TabsTrigger value="all">All Orders</TabsTrigger>
              <TabsTrigger value="pending">Pending</TabsTrigger>
              <TabsTrigger value="processing">Processing</TabsTrigger>
              <TabsTrigger value="shipped">Shipped</TabsTrigger>
              <TabsTrigger value="delivered">Delivered</TabsTrigger>
              <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Items</TableHead>
                    <TableHead>Value</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sortedOrders.length > 0 ? (
                    sortedOrders.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell className="font-medium">{order.id}</TableCell>
                        <TableCell>{order.customer}</TableCell>
                        <TableCell>{order.items}</TableCell>
                        <TableCell>₹{order.value.toLocaleString()}</TableCell>
                        <TableCell>{new Date(order.date).toLocaleDateString()}</TableCell>
                        <TableCell>{getPriorityBadge(order.priority)}</TableCell>
                        <TableCell>{getStatusBadge(order.status)}</TableCell>
                        <TableCell>
                          <Button variant="outline" size="sm" onClick={() => {
                            toast({
                              title: "Processing Order",
                              description: `Now processing order ${order.id}`,
                            });
                          }}>
                            Process
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={8} className="text-center py-4">
                        No orders match your search
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TabsContent>
            
            {/* Other tab contents would be similar but with filtered data */}
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
