import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";

interface BulkPurchaseProps {
  productId: string;
  basePrice: number;
}

export const BulkPurchase = ({ productId, basePrice }: BulkPurchaseProps) => {
  const { toast } = useToast();
  const [quantity, setQuantity] = React.useState("10");
  const [businessType, setBusinessType] = React.useState("");

  const bulkDiscounts = {
    "10-49": 5,
    "50-99": 10,
    "100+": 15,
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Bulk Purchase Request Sent",
      description: "Our team will contact you soon with a quote.",
    });
  };

  const getDiscountedPrice = () => {
    const qty = parseInt(quantity);
    let discount = 0;

    if (qty >= 100) discount = 15;
    else if (qty >= 50) discount = 10;
    else if (qty >= 10) discount = 5;

    const discountedPrice = basePrice * (1 - discount / 100);
    return discountedPrice;
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 rounded-lg border p-4">
      <h3 className="text-lg font-semibold">Bulk Purchase Options</h3>
      
      <div className="space-y-4">
        <div>
          <label className="mb-2 block text-sm font-medium">Quantity</label>
          <Input
            type="number"
            min="10"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">Business Type</label>
          <Select value={businessType} onValueChange={setBusinessType}>
            <SelectTrigger>
              <SelectValue placeholder="Select business type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="retailer">Retailer</SelectItem>
              <SelectItem value="wholesaler">Wholesaler</SelectItem>
              <SelectItem value="distributor">Distributor</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="rounded-lg bg-gray-50 p-4">
          <h4 className="mb-2 font-medium">Bulk Discounts</h4>
          <ul className="space-y-1 text-sm">
            {Object.entries(bulkDiscounts).map(([range, discount]) => (
              <li key={range} className="flex justify-between">
                <span>{range} units</span>
                <span>{discount}% off</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-lg bg-primary/5 p-4">
          <div className="flex justify-between">
            <span className="font-medium">Price per unit:</span>
            <span className="font-semibold">
              ₹{getDiscountedPrice().toLocaleString()}
            </span>
          </div>
          <div className="mt-2 flex justify-between">
            <span className="font-medium">Total price:</span>
            <span className="font-semibold">
              ₹{(getDiscountedPrice() * parseInt(quantity)).toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      <Button type="submit" className="w-full">
        Request Bulk Purchase Quote
      </Button>
    </form>
  );
};