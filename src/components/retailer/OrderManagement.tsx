
import { useState, useCallback, memo, useMemo } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { ErrorBoundary } from "@/components/common/ErrorBoundary";
import { usePerformanceMonitor } from "@/hooks/usePerformanceMonitor";

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
  const statusColor = useMemo(() => {
    switch (status.toLowerCase()) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'processing': return 'bg-blue-100 text-blue-800';
      case 'shipped': return 'bg-purple-100 text-purple-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  }, [status]);

  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColor}`}>
      {status}
    </span>
  );
});

StatusBadge.displayName = 'StatusBadge';

// Order list item component
const OrderItem = memo(({ order, onProcessOrder }: { 
  order: any; 
  onProcessOrder: (orderId: string) => void;
}) => (
  <tr className="hover:bg-muted/50">
    <td className="px-4 py-3 text-sm">{order.id}</td>
    <td className="px-4 py-3 text-sm">{order.customer}</td>
    <td className="px-4 py-3 text-sm">{order.total}</td>
    <td className="px-4 py-3 text-sm">
      <StatusBadge status={order.status} />
    </td>
    <td className="px-4 py-3 text-sm">
      <Button 
        variant="outline" 
        size="sm" 
        onClick={() => onProcessOrder(order.id)}
      >
        View
      </Button>
    </td>
  </tr>
));

OrderItem.displayName = 'OrderItem';

export const OrderManagement = memo(() => {
  // Monitor performance
  usePerformanceMonitor('OrderManagement');
  
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("all");
  
  const handleRefresh = useCallback(() => {
    toast({
      title: "Orders Refreshed",
      description: "The order list has been updated with the latest data."
    });
  }, [toast]);
  
  const handleProcessOrder = useCallback((orderId: string) => {
    toast({
      title: "Processing Order",
      description: `Order ${orderId} details opened.`
    });
  }, [toast]);
  
  // Memoize filtered orders to prevent unnecessary recalculations
  const filteredOrders = useMemo(() => {
    if (activeTab === 'all') return orders;
    return orders.filter(order => order.status.toLowerCase() === activeTab.toLowerCase());
  }, [activeTab]);
  
  // Memoize order items to prevent recreating on each render
  const orderItems = useMemo(() => (
    filteredOrders.map((order) => (
      <OrderItem 
        key={order.id} 
        order={order} 
        onProcessOrder={handleProcessOrder} 
      />
    ))
  ), [filteredOrders, handleProcessOrder]);
  
  // Memoize empty state to prevent recreation on each render
  const emptyState = useMemo(() => (
    <tr>
      <td colSpan={5} className="px-4 py-8 text-center text-sm text-muted-foreground">
        No orders found
      </td>
    </tr>
  ), []);

  // Memoize tabs content to prevent recreation
  const tabsListContent = useMemo(() => (
    <TabsList className="grid grid-cols-5 w-full">
      <TabsTrigger value="all">All</TabsTrigger>
      <TabsTrigger value="pending">Pending</TabsTrigger>
      <TabsTrigger value="processing">Processing</TabsTrigger>
      <TabsTrigger value="shipped">Shipped</TabsTrigger>
      <TabsTrigger value="completed">Completed</TabsTrigger>
    </TabsList>
  ), []);
  
  return (
    <ErrorBoundary>
      <div>
        <div className="flex justify-between items-center mb-4">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            {tabsListContent}
          </Tabs>
          <Button variant="outline" className="ml-2 shrink-0" onClick={handleRefresh}>
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
              {filteredOrders.length > 0 ? orderItems : emptyState}
            </tbody>
          </table>
        </div>
      </div>
    </ErrorBoundary>
  );
});

OrderManagement.displayName = 'OrderManagement';
