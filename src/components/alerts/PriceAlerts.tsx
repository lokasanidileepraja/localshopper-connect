
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bell } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { AlertForm } from "./AlertForm";
import { ActiveAlert } from "./ActiveAlert";

interface PriceAlertsProps {
  productName: string;
  currentPrice: number;
}

export const PriceAlerts = ({ productName, currentPrice }: PriceAlertsProps) => {
  const [targetPrice, setTargetPrice] = useState("");
  const [isAlertSet, setIsAlertSet] = useState(false);
  const { toast } = useToast();

  const handleSetAlert = () => {
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
            <AlertForm
              targetPrice={targetPrice}
              onTargetPriceChange={setTargetPrice}
              onSetAlert={handleSetAlert}
              currentPrice={currentPrice}
            />
          ) : (
            <ActiveAlert
              targetPrice={targetPrice}
              onRemoveAlert={handleRemoveAlert}
            />
          )}
        </motion.div>
      </CardContent>
    </Card>
  );
};
