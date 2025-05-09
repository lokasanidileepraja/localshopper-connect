import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Calculator } from "lucide-react";

interface BulkPurchaseProps {
  productId: string;
  basePrice: number;
}

export const BulkPurchase = ({ productId, basePrice }: BulkPurchaseProps) => {
  const [quantity, setQuantity] = useState("");
  const { toast } = useToast();

  const handleQuoteRequest = () => {
    const qty = parseInt(quantity);
    if (!qty || qty < 1) {
      toast({
        title: "Invalid quantity",
        description: "Please enter a valid quantity",
        variant: "destructive",
      });
      return;
    }

    const estimatedPrice = basePrice * qty * (qty >= 10 ? 0.9 : 0.95); // 10% discount for 10+ units, 5% for less

    toast({
      title: "Bulk Purchase Quote",
      description: (
        <div className="mt-2 space-y-2">
          <p>Quantity: {qty} units</p>
          <p>Base Price: ₹{basePrice.toLocaleString()} per unit</p>
          <p>Estimated Total: ₹{Math.round(estimatedPrice).toLocaleString()}</p>
          <p className="text-sm text-gray-600">
            *Final price may vary. Our team will contact you shortly.
          </p>
        </div>
      ),
    });
  };

  return (
    <div className="space-y-4 p-4 border rounded-lg">
      <div className="flex items-center gap-2">
        <Calculator className="h-5 w-5 text-primary" />
        <h2 className="text-xl font-semibold">Bulk Purchase</h2>
      </div>
      <p className="text-sm text-gray-600">
        Get up to 10% discount on bulk orders. Enter quantity to get an instant quote.
      </p>
      <div className="flex gap-2">
        <Input
          type="number"
          min="1"
          placeholder="Enter quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          className="flex-1"
        />
        <Button onClick={handleQuoteRequest}>Get Quote</Button>
      </div>
      <p className="text-xs text-gray-500">
        * Minimum 5 units for bulk pricing. Larger quantities get better discounts.
      </p>
    </div>
  );
};
