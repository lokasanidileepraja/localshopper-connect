import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Bell } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

export const PriceAlerts = () => {
  const [targetPrice, setTargetPrice] = useState("");
  const { toast } = useToast();

  const handleSetAlert = () => {
    toast({
      title: "Price Alert Set",
      description: `We'll notify you when the price drops below ₹${targetPrice}`,
    });
  };

  return (
    <div className="container py-8">
      <h2 className="text-2xl font-bold mb-6">Price Alerts</h2>
      <Card className="p-6">
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <Input
              type="number"
              placeholder="Enter target price"
              value={targetPrice}
              onChange={(e) => setTargetPrice(e.target.value)}
            />
            <Button onClick={handleSetAlert}>
              <Bell className="mr-2 h-4 w-4" />
              Set Alert
            </Button>
          </div>
          <p className="text-sm text-muted-foreground">
            We'll notify you when the price drops below your target price.
          </p>
        </div>
      </Card>
    </div>
  );
};
