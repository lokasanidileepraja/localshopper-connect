
import { OrderManagement } from "@/components/retailer/OrderManagement";

const RetailerOrders = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Order Management</h1>
      <OrderManagement />
    </div>
  );
};

export default RetailerOrders;
