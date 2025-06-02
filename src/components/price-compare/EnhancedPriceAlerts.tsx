
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Bell, Plus, X, Mail, Smartphone, TrendingDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "@/hooks/use-toast";

interface PriceAlert {
  id: string;
  productName: string;
  targetPrice: number;
  currentPrice: number;
  isActive: boolean;
  notificationMethods: string[];
  createdAt: string;
}

interface EnhancedPriceAlertsProps {
  searchQuery: string;
  filters: any;
}

export const EnhancedPriceAlerts = ({ searchQuery }: EnhancedPriceAlertsProps) => {
  const [alerts, setAlerts] = useState<PriceAlert[]>([
    {
      id: "1",
      productName: "iPhone 15 Pro",
      targetPrice: 120000,
      currentPrice: 134900,
      isActive: true,
      notificationMethods: ["email", "push"],
      createdAt: "2024-01-15"
    }
  ]);
  
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newAlert, setNewAlert] = useState({
    productName: "",
    targetPrice: "",
    email: "",
    phone: "",
    notificationMethods: ["email"]
  });
  const { toast } = useToast();

  const createAlert = () => {
    if (!newAlert.productName || !newAlert.targetPrice) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    const alert: PriceAlert = {
      id: Date.now().toString(),
      productName: newAlert.productName,
      targetPrice: parseFloat(newAlert.targetPrice),
      currentPrice: Math.floor(Math.random() * 50000) + 20000, // Mock current price
      isActive: true,
      notificationMethods: newAlert.notificationMethods,
      createdAt: new Date().toISOString().split('T')[0]
    };

    setAlerts(prev => [alert, ...prev]);
    setNewAlert({
      productName: "",
      targetPrice: "",
      email: "",
      phone: "",
      notificationMethods: ["email"]
    });
    setShowCreateForm(false);

    toast({
      title: "Price Alert Created",
      description: `We'll notify you when ${alert.productName} drops below ₹${alert.targetPrice.toLocaleString()}`,
    });
  };

  const toggleAlert = (id: string) => {
    setAlerts(prev => prev.map(alert => 
      alert.id === id ? { ...alert, isActive: !alert.isActive } : alert
    ));
  };

  const deleteAlert = (id: string) => {
    setAlerts(prev => prev.filter(alert => alert.id !== id));
    toast({
      title: "Alert Deleted",
      description: "Price alert has been removed",
    });
  };

  const toggleNotificationMethod = (method: string) => {
    setNewAlert(prev => ({
      ...prev,
      notificationMethods: prev.notificationMethods.includes(method)
        ? prev.notificationMethods.filter(m => m !== method)
        : [...prev.notificationMethods, method]
    }));
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Price Alerts
              <Badge variant="secondary">{alerts.filter(a => a.isActive).length} active</Badge>
            </CardTitle>
            <Button
              onClick={() => setShowCreateForm(!showCreateForm)}
              className="flex items-center gap-2"
            >
              <Plus className="h-4 w-4" />
              Create Alert
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <AnimatePresence>
            {showCreateForm && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-6 p-4 border rounded-lg bg-muted/30"
              >
                <h3 className="font-medium mb-4">Create New Price Alert</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="product-name">Product Name</Label>
                    <Input
                      id="product-name"
                      placeholder={searchQuery || "Enter product name"}
                      value={newAlert.productName}
                      onChange={(e) => setNewAlert(prev => ({ ...prev, productName: e.target.value }))}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="target-price">Target Price (₹)</Label>
                    <Input
                      id="target-price"
                      type="number"
                      placeholder="120000"
                      value={newAlert.targetPrice}
                      onChange={(e) => setNewAlert(prev => ({ ...prev, targetPrice: e.target.value }))}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email (optional)</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      value={newAlert.email}
                      onChange={(e) => setNewAlert(prev => ({ ...prev, email: e.target.value }))}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone (optional)</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+91 9876543210"
                      value={newAlert.phone}
                      onChange={(e) => setNewAlert(prev => ({ ...prev, phone: e.target.value }))}
                    />
                  </div>
                </div>
                
                <div className="mt-4">
                  <Label className="text-sm font-medium">Notification Methods</Label>
                  <div className="flex gap-4 mt-2">
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="email-notifications"
                        checked={newAlert.notificationMethods.includes("email")}
                        onCheckedChange={() => toggleNotificationMethod("email")}
                      />
                      <Label htmlFor="email-notifications" className="flex items-center gap-1">
                        <Mail className="h-4 w-4" />
                        Email
                      </Label>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="push-notifications"
                        checked={newAlert.notificationMethods.includes("push")}
                        onCheckedChange={() => toggleNotificationMethod("push")}
                      />
                      <Label htmlFor="push-notifications" className="flex items-center gap-1">
                        <Smartphone className="h-4 w-4" />
                        Push
                      </Label>
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-2 mt-4">
                  <Button onClick={createAlert}>Create Alert</Button>
                  <Button variant="outline" onClick={() => setShowCreateForm(false)}>
                    Cancel
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="space-y-4">
            {alerts.map((alert) => (
              <motion.div
                key={alert.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`p-4 border rounded-lg ${
                  alert.isActive ? 'border-primary/20 bg-primary/5' : 'border-muted bg-muted/30'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-medium">{alert.productName}</h3>
                      <Badge variant={alert.isActive ? "default" : "secondary"}>
                        {alert.isActive ? "Active" : "Paused"}
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Target Price:</span>
                        <p className="font-medium text-green-600">₹{alert.targetPrice.toLocaleString()}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Current Price:</span>
                        <p className="font-medium">₹{alert.currentPrice.toLocaleString()}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                      <span>Created: {alert.createdAt}</span>
                      <div className="flex items-center gap-1">
                        {alert.notificationMethods.includes("email") && <Mail className="h-3 w-3" />}
                        {alert.notificationMethods.includes("push") && <Smartphone className="h-3 w-3" />}
                      </div>
                    </div>
                    
                    {alert.currentPrice <= alert.targetPrice && (
                      <div className="flex items-center gap-1 mt-2 text-green-600 text-sm">
                        <TrendingDown className="h-4 w-4" />
                        Target price reached! Check current deals.
                      </div>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={alert.isActive}
                      onCheckedChange={() => toggleAlert(alert.id)}
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => deleteAlert(alert.id)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
            
            {alerts.length === 0 && (
              <div className="text-center py-8">
                <Bell className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">No Price Alerts</h3>
                <p className="text-muted-foreground mb-4">
                  Create your first price alert to get notified when prices drop
                </p>
                <Button onClick={() => setShowCreateForm(true)}>
                  Create First Alert
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
