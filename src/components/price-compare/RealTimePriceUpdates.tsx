
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TrendingDown, TrendingUp, RefreshCw, Zap } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "@/hooks/use-toast";

interface PriceUpdate {
  id: string;
  productName: string;
  storeName: string;
  oldPrice: number;
  newPrice: number;
  change: number;
  timestamp: string;
}

interface RealTimePriceUpdatesProps {
  searchQuery: string;
}

export const RealTimePriceUpdates = ({ searchQuery }: RealTimePriceUpdatesProps) => {
  const [updates, setUpdates] = useState<PriceUpdate[]>([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { toast } = useToast();

  const generateMockUpdate = (): PriceUpdate => {
    const products = ["iPhone 15", "Samsung Galaxy S24", "MacBook Pro", "AirPods Pro"];
    const stores = ["Tech Store", "Mobile Hub", "Electronics Plus", "Gadget World"];
    
    const product = products[Math.floor(Math.random() * products.length)];
    const store = stores[Math.floor(Math.random() * stores.length)];
    const oldPrice = Math.floor(Math.random() * 50000) + 10000;
    const change = Math.floor(Math.random() * 2000) - 1000; // -1000 to +1000
    const newPrice = oldPrice + change;

    return {
      id: `${Date.now()}-${Math.random()}`,
      productName: product,
      storeName: store,
      oldPrice,
      newPrice,
      change,
      timestamp: new Date().toLocaleTimeString()
    };
  };

  const refreshPrices = async () => {
    setIsRefreshing(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newUpdate = generateMockUpdate();
    setUpdates(prev => [newUpdate, ...prev.slice(0, 9)]); // Keep only last 10 updates
    
    setIsRefreshing(false);
    
    toast({
      title: "Prices Updated",
      description: `Found ${Math.floor(Math.random() * 5) + 1} price changes`,
    });
  };

  useEffect(() => {
    // Auto-refresh every 30 seconds
    const interval = setInterval(() => {
      if (searchQuery) {
        const newUpdate = generateMockUpdate();
        setUpdates(prev => [newUpdate, ...prev.slice(0, 9)]);
      }
    }, 30000);

    return () => clearInterval(interval);
  }, [searchQuery]);

  useEffect(() => {
    // Initial load
    if (searchQuery) {
      const initialUpdates = Array.from({ length: 5 }, () => generateMockUpdate());
      setUpdates(initialUpdates);
    }
  }, [searchQuery]);

  if (!searchQuery) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-8">
          <div className="text-center">
            <Zap className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">Real-Time Price Updates</h3>
            <p className="text-muted-foreground">
              Search for a product to see live price changes
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5" />
            Live Price Updates
          </CardTitle>
          <Button
            variant="outline"
            size="sm"
            onClick={refreshPrices}
            disabled={isRefreshing}
            className="flex items-center gap-2"
          >
            <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3 max-h-96 overflow-y-auto">
          <AnimatePresence>
            {updates.map((update, index) => (
              <motion.div
                key={update.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-between p-3 border rounded-lg bg-background"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium text-sm">{update.productName}</span>
                    <Badge variant="outline" className="text-xs">
                      {update.storeName}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span>₹{update.oldPrice.toLocaleString()}</span>
                    <span>→</span>
                    <span className="font-medium">₹{update.newPrice.toLocaleString()}</span>
                    <span>•</span>
                    <span>{update.timestamp}</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-1">
                  {update.change < 0 ? (
                    <TrendingDown className="h-4 w-4 text-green-500" />
                  ) : (
                    <TrendingUp className="h-4 w-4 text-red-500" />
                  )}
                  <span className={`text-sm font-medium ${
                    update.change < 0 ? 'text-green-500' : 'text-red-500'
                  }`}>
                    {update.change > 0 ? '+' : ''}₹{update.change.toLocaleString()}
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          
          {updates.length === 0 && (
            <div className="text-center py-4 text-muted-foreground">
              No price updates yet. Prices update automatically every 30 seconds.
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
