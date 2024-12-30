import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Bell, TrendingDown } from "lucide-react";

interface ProductAlertsProps {
  productId: string;
  inStock: boolean;
  currentPrice: number;
}

export const ProductAlerts = ({ productId, inStock, currentPrice }: ProductAlertsProps) => {
  const { toast } = useToast();
  const [email, setEmail] = React.useState("");
  const [targetPrice, setTargetPrice] = React.useState("");

  const handleAvailabilityAlert = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    toast({
      title: "Alert Set!",
      description: "We'll notify you when this product is back in stock.",
    });
    setEmail("");
  };

  const handlePriceAlert = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !targetPrice) return;

    toast({
      title: "Price Alert Set!",
      description: `We'll notify you when the price drops below ₹${parseInt(targetPrice).toLocaleString()}`,
    });
    setEmail("");
    setTargetPrice("");
  };

  return (
    <div className="space-y-6 rounded-lg border p-4">
      {!inStock && (
        <form onSubmit={handleAvailabilityAlert} className="space-y-4">
          <h4 className="flex items-center gap-2 font-medium">
            <Bell className="h-4 w-4" />
            Get Availability Alert
          </h4>
          <div className="flex gap-2">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1"
            />
            <Button type="submit">Notify Me</Button>
          </div>
        </form>
      )}

      <form onSubmit={handlePriceAlert} className="space-y-4">
        <h4 className="flex items-center gap-2 font-medium">
          <TrendingDown className="h-4 w-4" />
          Set Price Alert
        </h4>
        <div className="space-y-2">
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className="flex gap-2">
            <Input
              type="number"
              placeholder="Target price"
              value={targetPrice}
              onChange={(e) => setTargetPrice(e.target.value)}
              min={0}
              max={currentPrice}
              className="flex-1"
            />
            <Button type="submit">Set Alert</Button>
          </div>
        </div>
      </form>
    </div>
  );
};