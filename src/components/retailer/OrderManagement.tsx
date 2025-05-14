
import { useState, useCallback, memo, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

// Sample orders data - in a real app this would come from an API
const orders = [
  { id: "ORD-001", customer: "John Doe", total: "₹4,999", status: "Processing" },
  { id: "ORD-002", customer: "Alice Smith", total: "₹2,450", status: "Completed" },
  { id: "ORD-003", customer: "Robert Brown", total: "₹3,299", status: "Shipped" },
  { id: "ORD-004", customer: "Emma Wilson", total: "₹1,599", status: "Pending" },
  { id: "ORD-005", customer: "Michael Lee", total: "₹8,750", status: "Processing" }
];

// Order status badge component
const StatusBadge = memo(({ status }: { status: string }) => {
  const getStatusColor = () => {
    switch (status.toLowerCase()) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'processing': return 'bg-blue-100 text-blue-800';
      case 'shipped': return 'bg-purple-100 text-purple-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor()}`}>
      {status}
    </span>
  );
});

StatusBadge.displayName = 'StatusBadge';

// Order list item component
const OrderItem = memo(({ order }: { order: any }) => (
  <tr className="hover:bg-muted/50">
    <td className="px-4 py-3 text-sm">{order.id}</td>
    <td className="px-4 py-3 text-sm">{order.customer}</td>
    <td className="px-4 py-3 text-sm">{order.total}</td>
    <td className="px-4 py-3 text-sm">
      <StatusBadge status={order.status} />
    </td>
    <td className="px-4 py-3 text-sm">
      <Button variant="outline" size="sm">View</Button>
    </td>
  </tr>
));

OrderItem.displayName = 'OrderItem';

export const OrderManagement = memo(() => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("all");
  
  const handleRefresh = useCallback(() => {
    toast({
      title: "Orders Refreshed",
      description: "The order list has been updated with the latest data."
    });
  }, [toast]);
  
  // Filter orders based on active tab, memoized to prevent unnecessary recalculations
  const filteredOrders = useMemo(() => {
    if (activeTab === 'all') return orders;
    return orders.filter(order => order.status.toLowerCase() === activeTab.toLowerCase());
  }, [activeTab]);
  
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-5 w-full">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="processing">Processing</TabsTrigger>
            <TabsTrigger value="shipped">Shipped</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>
        </Tabs>
        <Button variant="outline" className="ml-2" onClick={handleRefresh}>
          Refresh
        </Button>
      </div>
      
      <div className="rounded-md border">
        <table className="w-full">
          <thead>
            <tr className="bg-muted/50 text-left">
              <th className="px-4 py-3 text-sm font-medium">Order ID</th>
              <th className="px-4 py-3 text-sm font-medium">Customer</th>
              <th className="px-4 py-3 text-sm font-medium">Total</th>
              <th className="px-4 py-3 text-sm font-medium">Status</th>
              <th className="px-4 py-3 text-sm font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.length > 0 ? (
              filteredOrders.map((order) => (
                <OrderItem key={order.id} order={order} />
              ))
            ) : (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-sm text-muted-foreground">
                  No orders found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
});

OrderManagement.displayName = 'OrderManagement';
