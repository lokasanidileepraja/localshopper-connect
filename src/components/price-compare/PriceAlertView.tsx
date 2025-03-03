
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bell, AlertTriangle, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { ELECTRONICS_SHOPS } from "@/data/shops";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

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
  const [selectedProduct, setSelectedProduct] = useState("");
  const [notifyAll, setNotifyAll] = useState(true);
  const [alerts, setAlerts] = useState([]);
  const { toast } = useToast();

  // Get products that match the search query
  const allProducts = ELECTRONICS_SHOPS.flatMap(shop => 
    shop.products.map(product => ({
      ...product,
      shopName: shop.name
    }))
  ).filter(product => 
    !searchQuery || product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  // Get unique product names
  const uniqueProducts = [...new Map(allProducts.map(item => [item.name, item])).values()];
  
  useEffect(() => {
    if (uniqueProducts.length > 0 && !selectedProduct) {
      setSelectedProduct(uniqueProducts[0].name);
      // Set default target price slightly below the lowest current price
      const productPrices = allProducts
        .filter(p => p.name === uniqueProducts[0].name)
        .map(p => p.price);
      const lowestPrice = Math.min(...productPrices);
      setTargetPrice(Math.round(lowestPrice * 0.95).toString());
    }
  }, [uniqueProducts, selectedProduct, allProducts]);

  const handleSetAlert = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedProduct || !targetPrice) {
      toast({
        title: "Error",
        description: "Please select a product and set a target price",
        variant: "destructive",
      });
      return;
    }
    
    const newAlert = {
      id: Date.now().toString(),
      product: selectedProduct,
      targetPrice: parseInt(targetPrice),
      notifyAllStores: notifyAll,
      createdAt: new Date().toLocaleString(),
    };
    
    setAlerts(prev => [newAlert, ...prev]);
    
    toast({
      title: "Price Alert Set",
      description: `We'll notify you when ${selectedProduct} drops below ₹${parseInt(targetPrice).toLocaleString()}`,
    });
    
    // Reset form or prepare for next alert
    const productPrices = allProducts
      .filter(p => p.name === selectedProduct)
      .map(p => p.price);
    const lowestPrice = Math.min(...productPrices);
    setTargetPrice(Math.round(lowestPrice * 0.95).toString());
  };
  
  const handleDeleteAlert = (alertId) => {
    setAlerts(prev => prev.filter(alert => alert.id !== alertId));
    toast({
      title: "Alert Deleted",
      description: "The price alert has been removed",
    });
  };

  return (
    <div className="space-y-6">
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
              <Label htmlFor="product-select">Product</Label>
              <Select 
                value={selectedProduct} 
                onValueChange={setSelectedProduct}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a product" />
                </SelectTrigger>
                <SelectContent>
                  {uniqueProducts.map(product => (
                    <SelectItem key={product.id} value={product.name}>
                      {product.name} - Current from ₹{Math.min(...allProducts
                        .filter(p => p.name === product.name)
                        .map(p => p.price)).toLocaleString()}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="target-price">Target Price (₹)</Label>
              <Input
                id="target-price"
                type="number"
                placeholder="Enter your target price"
                value={targetPrice}
                onChange={(e) => setTargetPrice(e.target.value)}
                required
              />
              
              {selectedProduct && (
                <div className="text-sm text-muted-foreground mt-1">
                  Current lowest: ₹{Math.min(...allProducts
                    .filter(p => p.name === selectedProduct)
                    .map(p => p.price)).toLocaleString()}
                </div>
              )}
            </div>
            
            <div className="flex items-center space-x-2">
              <Switch 
                id="notify-all" 
                checked={notifyAll}
                onCheckedChange={setNotifyAll}
              />
              <Label htmlFor="notify-all">Notify me for any store with this price</Label>
            </div>
            
            <Button type="submit" className="w-full">
              Create Alert
            </Button>
          </form>
        </CardContent>
      </Card>
      
      {alerts.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Your Active Alerts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {alerts.map(alert => {
                const currentLowestPrice = Math.min(...allProducts
                  .filter(p => p.name === alert.product)
                  .map(p => p.price));
                
                const isAlertActive = currentLowestPrice > alert.targetPrice;
                
                return (
                  <div key={alert.id} className="border rounded-lg p-4 space-y-2">
                    <div className="flex justify-between items-center">
                      <h4 className="font-semibold">{alert.product}</h4>
                      {isAlertActive ? (
                        <div className="flex items-center text-amber-500">
                          <AlertTriangle className="h-4 w-4 mr-1" />
                          Waiting for price drop
                        </div>
                      ) : (
                        <div className="flex items-center text-green-500">
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Target price reached!
                        </div>
                      )}
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Target: ₹{alert.targetPrice.toLocaleString()}</span>
                      <span>Current: ₹{currentLowestPrice.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-xs text-gray-500">Created: {alert.createdAt}</span>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-red-500 h-6 px-2"
                        onClick={() => handleDeleteAlert(alert.id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
