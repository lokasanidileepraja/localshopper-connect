import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Bell, PriceChange } from "lucide-react";

interface ProductAlertsProps {
  productId: string;
  inStock: boolean;
  currentPrice: number;
}

export const ProductAlerts = ({
  productId,
  inStock,
  currentPrice,
}: ProductAlertsProps) => {
  const [targetPrice, setTargetPrice] = useState("");
  const [email, setEmail] = useState("");
  const { toast } = useToast();

  const handleStockAlert = () => {
    if (!email) {
      toast({
        title: "Email required",
        description: "Please enter your email address",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Stock Alert Set",
      description: `We'll notify you at ${email} when the product is back in stock.`,
    });
    setEmail("");
  };

  const handlePriceAlert = () => {
    if (!email || !targetPrice) {
      toast({
        title: "Missing information",
        description: "Please enter both email and target price",
        variant: "destructive",
      });
      return;
    }

    const price = parseFloat(targetPrice);
    if (isNaN(price) || price >= currentPrice) {
      toast({
        title: "Invalid price",
        description: "Target price must be lower than current price",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Price Alert Set",
      description: `We'll notify you at ${email} when the price drops below ₹${parseInt(
        targetPrice
      ).toLocaleString()}.`,
    });
    setTargetPrice("");
    setEmail("");
  };

  return (
    <div className="space-y-4 p-4 border rounded-lg">
      <h2 className="text-xl font-semibold">Product Alerts</h2>
      
      <div className="space-y-4">
        {!inStock && (
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Bell className="h-5 w-5 text-primary" />
              <h3 className="font-medium">Stock Alert</h3>
            </div>
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Button onClick={handleStockAlert} className="w-full">
              Notify When Available
            </Button>
          </div>
        )}

        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <PriceChange className="h-5 w-5 text-primary" />
            <h3 className="font-medium">Price Alert</h3>
          </div>
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type="number"
            placeholder="Target price"
            value={targetPrice}
            onChange={(e) => setTargetPrice(e.target.value)}
          />
          <Button onClick={handlePriceAlert} className="w-full">
            Set Price Alert
          </Button>
        </div>
      </div>
    </div>
  );
};