
import { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription,
  CardFooter
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem
} from "@/components/ui/select";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { ELECTRONICS_SHOPS } from "@/data/shops";
import { useToast } from "@/hooks/use-toast";
import { Phone, Clock, Package, Percent, MessageSquare, Store, ShoppingBag } from "lucide-react";
import { Shop } from "@/types/shop";
import { Product } from "@/types/models";
import { products } from "@/data/products";
import { motion } from "framer-motion";

interface BulkPurchaseViewProps {
  searchQuery: string;
  filters: {
    priceRange: [number, number];
    storeTypes: string[];
    proximity: number;
    inStock: boolean;
  };
}

export const BulkPurchaseView = ({ searchQuery, filters }: BulkPurchaseViewProps) => {
  const { toast } = useToast();
  const [selectedStore, setSelectedStore] = useState<Shop | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [negotiationStage, setNegotiationStage] = useState<string>("request");

  // Get available stores
  const shops: Shop[] = ELECTRONICS_SHOPS.filter(shop => {
    if (filters.storeTypes.length > 0 && !filters.storeTypes.includes(shop.category)) {
      return false;
    }
    return true;
  });

  // Get available products based on search query
  const allProducts: Product[] = Object.values(products).flat();
  const availableProducts = searchQuery 
    ? allProducts.filter(p => 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        (p.description && p.description.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : allProducts.slice(0, 10); // Just take first 10 products if no search

  const calculateBulkPrice = () => {
    if (!selectedProduct || !quantity || parseInt(quantity) < 1) return 0;
    
    const basePrice = selectedProduct.price;
    const qty = parseInt(quantity);
    
    // Apply bulk discounts
    let discount = 0;
    if (qty >= 20) discount = 0.15; // 15% discount for 20+ units
    else if (qty >= 10) discount = 0.10; // 10% discount for 10-19 units
    else if (qty >= 5) discount = 0.05; // 5% discount for 5-9 units
    
    return basePrice * qty * (1 - discount);
  };

  const handleStoreSelect = (storeId: string) => {
    const store = shops.find(s => s.id === storeId);
    if (store) {
      setSelectedStore(store);
    }
  };

  const handleProductSelect = (productId: string) => {
    const product = availableProducts.find(p => p.id === productId);
    if (product) {
      setSelectedProduct(product);
    }
  };

  const handleSubmitRequest = () => {
    if (!selectedStore || !selectedProduct || !quantity || parseInt(quantity) < 1) {
      toast({
        title: "Incomplete request",
        description: "Please select a store, product and enter a valid quantity",
        variant: "destructive"
      });
      return;
    }
    
    setIsDialogOpen(true);
  };

  const handleConfirmRequest = () => {
    setIsSubmitted(true);
    setIsDialogOpen(false);
    
    toast({
      title: "Bulk purchase request sent!",
      description: `Your request for ${quantity} units has been sent to ${selectedStore?.name}. They will respond within 48 hours.`
    });

    // In a real app, this would send the request to the backend
    setTimeout(() => {
      // Simulate store response for demo purposes
      setNegotiationStage("response");
      
      toast({
        title: "New response received!",
        description: `${selectedStore?.name} has responded to your bulk purchase request.`,
      });
    }, 5000);
  };

  const handleAcceptOffer = () => {
    toast({
      title: "Offer accepted!",
      description: "Your bulk order has been confirmed. Please proceed to checkout."
    });
    setNegotiationStage("confirmed");
  };

  const handleCounterOffer = () => {
    toast({
      title: "Counter offer sent",
      description: "Your counter offer has been sent to the store owner."
    });
    setNegotiationStage("negotiation");
    
    // Simulate store accepting counter offer
    setTimeout(() => {
      setNegotiationStage("confirmed");
      toast({
        title: "Counter offer accepted!",
        description: `${selectedStore?.name} has accepted your counter offer.`
      });
    }, 3000);
  };

  const estimatedPrice = calculateBulkPrice();
  const discountedPrice = estimatedPrice * 0.95; // 5% additional discount from store (for demo)

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-6 mt-4">
        {/* Request Form */}
        <Card className="flex-1 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShoppingBag className="h-5 w-5" />
              Request Bulk Purchase
            </CardTitle>
            <CardDescription>
              Get special discounts when you buy in bulk directly from stores
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {!isSubmitted ? (
              <>
                <div className="space-y-2">
                  <Label htmlFor="store">Select Store</Label>
                  <Select onValueChange={handleStoreSelect}>
                    <SelectTrigger id="store">
                      <SelectValue placeholder="Select a store" />
                    </SelectTrigger>
                    <SelectContent>
                      {shops.map((shop) => (
                        <SelectItem key={shop.id} value={shop.id}>
                          {shop.name} ({shop.distance})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="product">Select Product</Label>
                  <Select onValueChange={handleProductSelect}>
                    <SelectTrigger id="product">
                      <SelectValue placeholder="Select a product" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableProducts.map((product) => (
                        <SelectItem key={product.id} value={product.id}>
                          {product.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="quantity">Quantity (Min. 5 units for bulk pricing)</Label>
                  <Input 
                    id="quantity" 
                    type="number" 
                    min="5"
                    placeholder="Enter quantity" 
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="message">Message to Store (Optional)</Label>
                  <Textarea 
                    id="message" 
                    placeholder="Add any specific requirements or questions..." 
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                </div>
                
                {selectedProduct && quantity && parseInt(quantity) >= 5 && (
                  <div className="rounded-lg bg-muted p-3 mt-4">
                    <p className="font-medium text-sm mb-1">Estimated Price:</p>
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-semibold text-lg">₹{estimatedPrice.toLocaleString()}</p>
                        <p className="text-xs text-muted-foreground">
                          ₹{selectedProduct.price.toLocaleString()} × {quantity} units
                          {parseInt(quantity) >= 5 && (
                            <Badge variant="outline" className="ml-2">
                              {parseInt(quantity) >= 20 ? '15%' : parseInt(quantity) >= 10 ? '10%' : '5%'} bulk discount applied
                            </Badge>
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
                
                <Button 
                  className="w-full mt-2" 
                  onClick={handleSubmitRequest}
                  disabled={
                    !selectedStore || 
                    !selectedProduct || 
                    !quantity || 
                    parseInt(quantity) < 5
                  }
                >
                  Submit Bulk Purchase Request
                </Button>
              </>
            ) : (
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Store</p>
                  <p className="font-medium flex items-center gap-1">
                    <Store className="h-4 w-4" /> {selectedStore?.name}
                  </p>
                </div>
                
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Product</p>
                  <p className="font-medium">{selectedProduct?.name}</p>
                </div>
                
                <div className="flex justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Quantity</p>
                    <p className="font-medium">{quantity} units</p>
                  </div>
                  
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground mb-1">Estimated Total</p>
                    <p className="font-bold">₹{estimatedPrice.toLocaleString()}</p>
                  </div>
                </div>
                
                <div className="border-t pt-4 mt-4">
                  <p className="flex items-center gap-1 mb-2 font-medium">
                    <Clock className="h-4 w-4" /> Negotiation Status
                  </p>
                  
                  {negotiationStage === "request" && (
                    <div className="bg-muted rounded p-3 text-center">
                      <p className="text-sm">Waiting for store response...</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        The store will respond within 48 hours
                      </p>
                    </div>
                  )}
                  
                  {negotiationStage === "response" && (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="bg-green-50 border border-green-100 rounded p-3"
                    >
                      <div className="flex justify-between items-center mb-2">
                        <p className="font-medium">Store Offer</p>
                        <Badge className="bg-green-500">New</Badge>
                      </div>
                      <p className="text-sm mb-2">{selectedStore?.name} has made you an offer!</p>
                      
                      <div className="bg-background rounded p-3 mb-3">
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="font-medium">₹{discountedPrice.toLocaleString()}</p>
                            <div className="flex items-center gap-1 text-xs text-green-600">
                              <Percent className="h-3 w-3" />
                              5% additional discount offered
                            </div>
                          </div>
                          <p className="text-sm line-through text-muted-foreground">
                            ₹{estimatedPrice.toLocaleString()}
                          </p>
                        </div>
                      </div>
                      
                      <div className="bg-muted p-2 rounded text-sm mb-3">
                        <p className="italic">
                          "Thank you for your interest! We can offer a 5% discount on your bulk order with delivery within 7 days."
                        </p>
                      </div>
                      
                      <div className="flex gap-2 mt-3">
                        <Button size="sm" onClick={handleAcceptOffer} className="flex-1">
                          Accept Offer
                        </Button>
                        <Button size="sm" variant="outline" onClick={handleCounterOffer} className="flex-1">
                          Counter Offer
                        </Button>
                      </div>
                    </motion.div>
                  )}
                  
                  {negotiationStage === "negotiation" && (
                    <div className="bg-muted rounded p-3 text-center">
                      <p className="text-sm">Counter offer sent</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Waiting for store response...
                      </p>
                    </div>
                  )}
                  
                  {negotiationStage === "confirmed" && (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="bg-green-50 border border-green-100 rounded p-3"
                    >
                      <div className="flex justify-between items-center mb-2">
                        <p className="font-medium text-green-700">Order Confirmed!</p>
                        <Badge className="bg-green-600">Confirmed</Badge>
                      </div>
                      
                      <div className="bg-background rounded p-3 mb-3">
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="font-medium">₹{(discountedPrice * 0.98).toLocaleString()}</p>
                            <div className="flex items-center gap-1 text-xs text-green-600">
                              <Percent className="h-3 w-3" />
                              7% total discount applied
                            </div>
                          </div>
                          <p className="text-sm line-through text-muted-foreground">
                            ₹{estimatedPrice.toLocaleString()}
                          </p>
                        </div>
                      </div>
                      
                      <Button className="w-full mt-2">
                        Proceed to Checkout
                      </Button>
                    </motion.div>
                  )}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
        
        {/* Info Card */}
        <div className="md:w-1/3 space-y-4">
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg">Bulk Purchase Benefits</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <Percent className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium">Volume Discounts</p>
                    <p className="text-sm text-muted-foreground">Get special pricing when ordering 5+ units</p>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <MessageSquare className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium">Direct Negotiation</p>
                    <p className="text-sm text-muted-foreground">Negotiate with store owners for the best price</p>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <Package className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium">Priority Shipping</p>
                    <p className="text-sm text-muted-foreground">Get priority handling and delivery</p>
                  </div>
                </li>
              </ul>
            </CardContent>
          </Card>
          
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg">How It Works</CardTitle>
            </CardHeader>
            <CardContent>
              <ol className="space-y-3 list-decimal ml-5">
                <li className="text-sm">
                  <span className="font-medium">Select a store and product</span>
                  <p className="text-muted-foreground">Choose from our verified retailers</p>
                </li>
                <li className="text-sm">
                  <span className="font-medium">Enter your desired quantity</span>
                  <p className="text-muted-foreground">Minimum 5 units for bulk pricing</p>
                </li>
                <li className="text-sm">
                  <span className="font-medium">Submit your request</span>
                  <p className="text-muted-foreground">The store owner will respond within 48 hours</p>
                </li>
                <li className="text-sm">
                  <span className="font-medium">Negotiate if needed</span>
                  <p className="text-muted-foreground">Accept the offer or propose a counter offer</p>
                </li>
                <li className="text-sm">
                  <span className="font-medium">Complete your purchase</span>
                  <p className="text-muted-foreground">Proceed to checkout once terms are agreed</p>
                </li>
              </ol>
            </CardContent>
          </Card>
        </div>
      </div>
      
      {/* Confirmation Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Bulk Purchase Request</DialogTitle>
            <DialogDescription>
              You're about to send a bulk purchase request to {selectedStore?.name}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-muted-foreground">Product</p>
                <p className="font-medium">{selectedProduct?.name}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground">Quantity</p>
                <p className="font-medium">{quantity} units</p>
              </div>
            </div>
            
            <div className="flex justify-between items-center pt-2 border-t">
              <p className="font-medium">Estimated Total:</p>
              <p className="font-bold text-lg">₹{estimatedPrice.toLocaleString()}</p>
            </div>
            
            <div className="bg-muted p-3 rounded-md">
              <p className="text-sm">
                <span className="font-medium">Note:</span> The store owner will review your request and may offer additional discounts or modify terms. You'll have the option to accept or negotiate further.
              </p>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleConfirmRequest}>Send Request</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
