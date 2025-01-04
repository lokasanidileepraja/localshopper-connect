import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Bell, TrendingDown } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

export const PriceAlerts = () => {
  const [email, setEmail] = useState("");
  const [targetPrice, setTargetPrice] = useState("");
  const [notifications, setNotifications] = useState({
    priceDrops: true,
    stockAlerts: true,
    promotions: false,
  });
  const { toast } = useToast();

  const handleSetAlert = () => {
    if (!email || !targetPrice) {
      toast({
        title: "Missing Information",
        description: "Please enter both email and target price",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Price Alert Set",
      description: `We'll notify you at ${email} when the price drops below ₹${parseInt(targetPrice).toLocaleString()}.`,
    });
    setEmail("");
    setTargetPrice("");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Price Alerts
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Email Address</Label>
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label>Target Price</Label>
            <div className="flex items-center gap-2">
              <TrendingDown className="h-4 w-4 text-muted-foreground" />
              <Input
                type="number"
                placeholder="Enter target price"
                value={targetPrice}
                onChange={(e) => setTargetPrice(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="price-drops">Price Drop Alerts</Label>
              <Switch
                id="price-drops"
                checked={notifications.priceDrops}
                onCheckedChange={(checked) =>
                  setNotifications({ ...notifications, priceDrops: checked })
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="stock-alerts">Stock Alerts</Label>
              <Switch
                id="stock-alerts"
                checked={notifications.stockAlerts}
                onCheckedChange={(checked) =>
                  setNotifications({ ...notifications, stockAlerts: checked })
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="promotions">Promotional Alerts</Label>
              <Switch
                id="promotions"
                checked={notifications.promotions}
                onCheckedChange={(checked) =>
                  setNotifications({ ...notifications, promotions: checked })
                }
              />
            </div>
          </div>

          <Button className="w-full" onClick={handleSetAlert}>
            Set Price Alert
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
};