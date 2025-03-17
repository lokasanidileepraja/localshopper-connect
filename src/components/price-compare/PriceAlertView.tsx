
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bell, Mail, ShoppingBag, Tag } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";

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
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [targetPrice, setTargetPrice] = useState("");
  const [alertThreshold, setAlertThreshold] = useState(10); // Percentage
  const [isAlertSet, setIsAlertSet] = useState(false);

  const handleSetPriceAlert = (type: "price" | "availability" | "deal") => {
    if (!email && !phone) {
      toast({
        title: "Missing information",
        description: "Please enter either email or phone number",
        variant: "destructive",
      });
      return;
    }

    if (type === "price" && (!targetPrice || isNaN(Number(targetPrice)) || Number(targetPrice) <= 0)) {
      toast({
        title: "Invalid price",
        description: "Please enter a valid target price",
        variant: "destructive",
      });
      return;
    }

    let message = "";
    switch (type) {
      case "price":
        message = `We'll notify you when ${searchQuery || "this product"} drops below ₹${parseInt(targetPrice).toLocaleString()}`;
        break;
      case "availability":
        message = `We'll notify you when ${searchQuery || "this product"} becomes available in stock`;
        break;
      case "deal":
        message = `We'll notify you when ${searchQuery || "this product"} has a discount of ${alertThreshold}% or more`;
        break;
    }

    setIsAlertSet(true);
    toast({
      title: "Alert Set",
      description: message,
    });
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="price">
        <TabsList className="w-full grid grid-cols-3">
          <TabsTrigger value="price">Price Drop</TabsTrigger>
          <TabsTrigger value="availability">Availability</TabsTrigger>
          <TabsTrigger value="deals">Deals & Offers</TabsTrigger>
        </TabsList>

        <TabsContent value="price" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Tag className="h-5 w-5" />
                Price Drop Alert
              </CardTitle>
            </CardHeader>
            <CardContent>
              {!isAlertSet ? (
                <div className="space-y-4">
                  <div className="p-4 rounded-lg bg-primary/10">
                    <h3 className="font-medium mb-2">
                      {searchQuery ? `Alert for "${searchQuery}"` : "Set a Price Alert"}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      We'll notify you when the price drops below your target
                    </p>
                  </div>

                  <div className="space-y-3">
                    <div className="space-y-1">
                      <Label>Target Price</Label>
                      <Input
                        type="number"
                        placeholder="Enter your target price"
                        value={targetPrice}
                        onChange={(e) => setTargetPrice(e.target.value)}
                      />
                    </div>
                    
                    <div className="space-y-1">
                      <Label>Email (optional)</Label>
                      <Input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    
                    <div className="space-y-1">
                      <Label>WhatsApp Number (optional)</Label>
                      <Input
                        type="tel"
                        placeholder="Enter your WhatsApp number"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                      />
                      <p className="text-xs text-muted-foreground">
                        We'll send you a WhatsApp notification when price drops
                      </p>
                    </div>
                  </div>

                  <Button onClick={() => handleSetPriceAlert("price")} className="w-full">
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
                    We'll notify you when {searchQuery || "this product"} drops below ₹{parseInt(targetPrice).toLocaleString()}
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
        </TabsContent>

        <TabsContent value="availability" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <ShoppingBag className="h-5 w-5" />
                Stock Alert
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-primary/10">
                  <h3 className="font-medium mb-2">
                    {searchQuery ? `Availability Alert for "${searchQuery}"` : "Get In-Stock Notifications"}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    We'll notify you when this product becomes available
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="space-y-1">
                    <Label>Email (optional)</Label>
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-1">
                    <Label>WhatsApp Number (optional)</Label>
                    <Input
                      type="tel"
                      placeholder="Enter your WhatsApp number"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>
                </div>

                <Button onClick={() => handleSetPriceAlert("availability")} className="w-full">
                  <Bell className="mr-2 h-4 w-4" />
                  Notify When Available
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="deals" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Tag className="h-5 w-5" />
                Deal Alert
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-primary/10">
                  <h3 className="font-medium mb-2">
                    {searchQuery ? `Deal Alert for "${searchQuery}"` : "Get Deal Notifications"}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    We'll notify you when this product has a significant discount
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label>Minimum Discount</Label>
                      <span className="text-sm font-medium">{alertThreshold}% off</span>
                    </div>
                    <Slider
                      value={[alertThreshold]}
                      min={5}
                      max={50}
                      step={5}
                      onValueChange={(value) => setAlertThreshold(value[0])}
                    />
                    <p className="text-xs text-muted-foreground">
                      We'll alert you when the discount is {alertThreshold}% or more
                    </p>
                  </div>
                  
                  <div className="space-y-1">
                    <Label>Email (optional)</Label>
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-1">
                    <Label>WhatsApp Number (optional)</Label>
                    <Input
                      type="tel"
                      placeholder="Enter your WhatsApp number"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>
                </div>

                <Button onClick={() => handleSetPriceAlert("deal")} className="w-full">
                  <Bell className="mr-2 h-4 w-4" />
                  Set Deal Alert
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
