
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Line } from "recharts";
import { Bell, Clock, Save, TrendingDown } from "lucide-react";

interface PriceHistoryViewProps {
  searchQuery: string;
  filters: {
    priceRange: [number, number];
    storeTypes: string[];
    proximity: number;
    inStock: boolean;
  };
}

const generatePriceHistory = (product: string, days = 30) => {
  // Starting price
  let price = Math.floor(Math.random() * 20000) + 10000;
  
  return Array.from({ length: days }).map((_, index) => {
    // Random price fluctuations
    const change = Math.floor(Math.random() * 1000) - 500;
    price = Math.max(price + change, 5000); // Ensure price doesn't go below 5000
    
    // Calculate date
    const date = new Date();
    date.setDate(date.getDate() - (days - index - 1));
    
    return {
      date: date.toLocaleDateString('en-IN', { month: 'short', day: 'numeric' }),
      price,
      timestamp: date.getTime()
    };
  });
};

export const PriceHistoryView = ({ searchQuery, filters }: PriceHistoryViewProps) => {
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [targetPrice, setTargetPrice] = useState("");
  const [isAlertSet, setIsAlertSet] = useState(false);
  
  // Generate sample price history data based on search query
  const [priceHistory, setPriceHistory] = useState(() => 
    searchQuery ? generatePriceHistory(searchQuery) : []
  );

  const handleSetPriceAlert = () => {
    if (!email) {
      toast({
        title: "Missing information",
        description: "Please enter your email address",
        variant: "destructive",
      });
      return;
    }

    if (!targetPrice || isNaN(Number(targetPrice)) || Number(targetPrice) <= 0) {
      toast({
        title: "Invalid price",
        description: "Please enter a valid target price",
        variant: "destructive",
      });
      return;
    }

    setIsAlertSet(true);
    toast({
      title: "Price Alert Set",
      description: `We'll notify you when ${searchQuery} drops below ₹${parseInt(targetPrice).toLocaleString()}`,
    });
  };

  // If no search query, show a placeholder
  if (!searchQuery) {
    return (
      <div className="text-center py-12">
        <Bell className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
        <h3 className="text-lg font-semibold mb-2">No Product Selected</h3>
        <p className="text-muted-foreground">
          Search for a product to see its price history and set price alerts
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="overflow-hidden">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Price History for {searchQuery}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80 w-full">
            {priceHistory.length > 0 ? (
              <LineChart 
                width={800} 
                height={300} 
                data={priceHistory}
                margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis 
                  domain={['dataMin - 1000', 'dataMax + 1000']}
                  tickFormatter={(value) => `₹${value.toLocaleString()}`}
                />
                <Tooltip 
                  formatter={(value) => [`₹${Number(value).toLocaleString()}`, 'Price']}
                />
                <Line 
                  type="monotone" 
                  dataKey="price" 
                  stroke="#8884d8" 
                  activeDot={{ r: 8 }} 
                />
              </LineChart>
            ) : (
              <div className="h-full flex items-center justify-center">
                <p className="text-muted-foreground">No price history available</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingDown className="h-5 w-5" />
            Set Price Drop Alert
          </CardTitle>
        </CardHeader>
        <CardContent>
          {!isAlertSet ? (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="Enter your email address" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="target-price">Target Price</Label>
                <Input 
                  id="target-price" 
                  type="number" 
                  placeholder="Enter your target price" 
                  value={targetPrice}
                  onChange={(e) => setTargetPrice(e.target.value)}
                />
                <p className="text-sm text-muted-foreground">
                  We'll notify you when the price drops below this amount
                </p>
              </div>
              <Button onClick={handleSetPriceAlert} className="w-full">
                <Bell className="mr-2 h-4 w-4" />
                Set Price Alert
              </Button>
            </div>
          ) : (
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-center space-y-2">
              <div className="inline-flex items-center justify-center bg-green-100 rounded-full p-2 mb-2">
                <Bell className="h-5 w-5 text-green-600" />
              </div>
              <h3 className="font-semibold text-green-800">Price Alert Set!</h3>
              <p className="text-sm text-green-700">
                We'll notify you at {email} when {searchQuery} drops below ₹{parseInt(targetPrice).toLocaleString()}
              </p>
              <Button 
                variant="outline" 
                size="sm"
                className="mt-2"
                onClick={() => setIsAlertSet(false)}
              >
                Modify Alert
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
