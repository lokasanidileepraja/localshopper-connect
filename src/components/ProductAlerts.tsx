import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Bell, TrendingDown, Store, Tag } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

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
  const [notifications, setNotifications] = useState({
    priceDrops: true,
    stockAlerts: true,
    promotions: false,
    localDeals: false,
  });
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

  const handleNotificationChange = (key: keyof typeof notifications) => {
    setNotifications(prev => {
      const newState = { ...prev, [key]: !prev[key] };
      toast({
        title: newState[key] ? "Notification Enabled" : "Notification Disabled",
        description: `You will ${newState[key] ? "now" : "no longer"} receive ${key.replace(/([A-Z])/g, ' $1').toLowerCase()} notifications.`,
      });
      return newState;
    });
  };

  return (
    <div className="space-y-6 p-4 border rounded-lg">
      <div className="flex items-center justify-between border-b pb-4">
        <h2 className="text-xl font-semibold">Product Alerts</h2>
        <Bell className="h-5 w-5 text-primary" />
      </div>
      
      <div className="space-y-6">
        <div className="space-y-4">
          {!inStock && (
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Store className="h-5 w-5 text-primary" />
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
              <TrendingDown className="h-5 w-5 text-primary" />
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

        <div className="space-y-4 border-t pt-4">
          <h3 className="font-medium">Notification Preferences</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Price Drops</Label>
                <p className="text-sm text-muted-foreground">Get notified about price reductions</p>
              </div>
              <Switch
                checked={notifications.priceDrops}
                onCheckedChange={() => handleNotificationChange('priceDrops')}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Stock Alerts</Label>
                <p className="text-sm text-muted-foreground">Know when the product is back in stock</p>
              </div>
              <Switch
                checked={notifications.stockAlerts}
                onCheckedChange={() => handleNotificationChange('stockAlerts')}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Promotions</Label>
                <p className="text-sm text-muted-foreground">Receive special offers and deals</p>
              </div>
              <Switch
                checked={notifications.promotions}
                onCheckedChange={() => handleNotificationChange('promotions')}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Local Deals</Label>
                <p className="text-sm text-muted-foreground">Get alerts for nearby store offers</p>
              </div>
              <Switch
                checked={notifications.localDeals}
                onCheckedChange={() => handleNotificationChange('localDeals')}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};