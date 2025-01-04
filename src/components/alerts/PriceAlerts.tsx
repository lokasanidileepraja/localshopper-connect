import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Bell, BellOff } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface PriceAlertsProps {
  productName: string;
  currentPrice: number;
}

export const PriceAlerts = ({ productName, currentPrice }: PriceAlertsProps) => {
  const [targetPrice, setTargetPrice] = useState("");
  const [isAlertSet, setIsAlertSet] = useState(false);
  const { toast } = useToast();

  const handleSetAlert = () => {
    if (!targetPrice || Number(targetPrice) >= currentPrice) {
      toast({
        title: "Invalid Price",
        description: "Please enter a target price lower than the current price",
        variant: "destructive",
      });
      return;
    }

    setIsAlertSet(true);
    toast({
      title: "Price Alert Set",
      description: `We'll notify you when ${productName} drops below ₹${targetPrice}`,
    });
  };

  const handleRemoveAlert = () => {
    setIsAlertSet(false);
    setTargetPrice("");
    toast({
      title: "Alert Removed",
      description: `Price alert for ${productName} has been removed`,
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bell className="h-5 w-5" />
          Price Alerts
        </CardTitle>
      </CardHeader>
      <CardContent>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-4"
        >
          <div className="flex items-center justify-between">
            <span>Current Price:</span>
            <span className="font-medium">₹{currentPrice.toLocaleString()}</span>
          </div>
          
          {!isAlertSet ? (
            <div className="space-y-4">
              <div className="flex gap-2">
                <Input
                  type="number"
                  value={targetPrice}
                  onChange={(e) => setTargetPrice(e.target.value)}
                  placeholder="Enter target price"
                  className="flex-1"
                />
                <Button onClick={handleSetAlert}>
                  Set Alert
                </Button>
              </div>
              <p className="text-sm text-gray-500">
                We'll notify you when the price drops below your target price
              </p>
            </div>
          ) : (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-4"
            >
              <div className="flex items-center justify-between p-4 rounded-lg bg-primary/10">
                <div>
                  <p className="font-medium">Alert Set</p>
                  <p className="text-sm text-gray-600">Target: ₹{Number(targetPrice).toLocaleString()}</p>
                </div>
                <Button variant="outline" size="icon" onClick={handleRemoveAlert}>
                  <BellOff className="h-4 w-4" />
                </Button>
              </div>
            </motion.div>
          )}
        </motion.div>
      </CardContent>
    </Card>
  );
};