
import { CustomerInteraction } from "@/components/retailer/CustomerInteraction";

const RetailerCustomers = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Customer Management</h1>
      <CustomerInteraction />
    </div>
  );
};

export default RetailerCustomers;
