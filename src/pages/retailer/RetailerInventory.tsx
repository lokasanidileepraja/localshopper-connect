
import { InventoryTracking } from "@/components/retailer/InventoryTracking";

const RetailerInventory = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Inventory Management</h1>
      <InventoryTracking />
    </div>
  );
};

export default RetailerInventory;
