import React from "react";
import { useToast } from "@/components/ui/use-toast";
import { Package } from "lucide-react";

export const OrderHistory = () => {
  const { toast } = useToast();
  const [orders, setOrders] = React.useState([]);

  React.useEffect(() => {
    toast({
      title: "Coming Soon",
      description: "Order history will be available soon!",
    });
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold">Order History</h2>
        <p className="text-gray-500">View your past orders</p>
      </div>

      {orders.length === 0 ? (
        <div className="text-center py-8 bg-gray-50 rounded-lg">
          <Package className="h-12 w-12 mx-auto text-gray-400" />
          <p className="mt-2 text-gray-500">No orders yet</p>
        </div>
      ) : null}
    </div>
  );
};
