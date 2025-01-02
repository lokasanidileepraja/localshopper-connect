import React from "react";
import { useToast } from "@/components/ui/use-toast";
import { Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const BulkPurchase = () => {
  const { toast } = useToast();
  const [quantity, setQuantity] = React.useState("");

  const handleBulkOrder = () => {
    toast({
      title: "Coming Soon",
      description: "Bulk purchasing will be available soon!",
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold">Bulk Purchase</h2>
        <p className="text-gray-500">Order in bulk for better prices</p>
      </div>

      <div className="flex gap-4">
        <Input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          placeholder="Enter quantity"
          min="1"
        />
        <Button onClick={handleBulkOrder}>
          <Package className="h-4 w-4 mr-2" />
          Calculate Bulk Price
        </Button>
      </div>
    </div>
  );
};