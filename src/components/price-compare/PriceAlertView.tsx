
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bell } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface PriceAlertViewProps {
  searchQuery: string;
  filters: {
    priceRange: [number, number];
    storeTypes: string[];
    proximity: number;
    inStock: boolean;
  };
}

export const PriceAlertView = ({ searchQuery, filters }: PriceAlertViewProps) => {
  const [targetPrice, setTargetPrice] = useState("");
  const { toast } = useToast();

  const handleSetAlert = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Price Alert Set",
      description: `We'll notify you when the price drops below ₹${targetPrice}`,
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bell className="h-5 w-5" />
          Set Price Alert
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSetAlert} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="target-price" className="text-sm font-medium">
              Target Price (₹)
            </label>
            <Input
              id="target-price"
              type="number"
              placeholder="Enter your target price"
              value={targetPrice}
              onChange={(e) => setTargetPrice(e.target.value)}
              required
            />
          </div>
          <Button type="submit" className="w-full">
            Create Alert
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
