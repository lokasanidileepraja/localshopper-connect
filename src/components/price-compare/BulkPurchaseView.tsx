
import { useState, useEffect } from "react";
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
import { 
  Phone, 
  Clock, 
  Package, 
  Percent, 
  MessageSquare, 
  Store, 
  ShoppingBag, 
  ShieldCheck, 
  TrendingDown, 
  Star, 
  Info
} from "lucide-react";
import { Shop } from "@/types/shop";
import { BaseProduct } from "@/types/models";
import { products } from "@/data/products";
import { motion } from "framer-motion";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "@/components/ui/tooltip";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface BulkPurchaseViewProps {
  searchQuery: string;
  filters: {
    priceRange: [number, number];
    storeTypes: string[];
    proximity: number;
    inStock: boolean;
  };
}

// Use a type that's compatible with both shop.Product and models.Product
type DisplayProduct = {
  id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: number;
  stock: number;
  brand: string;
  model: string;
  inStock: boolean;
};

export const BulkPurchaseView = ({ searchQuery, filters }: BulkPurchaseViewProps) => {
  const { toast } = useToast();
  const [selectedStore, setSelectedStore] = useState<Shop | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<DisplayProduct | null>(null);
  const [quantity, setQuantity] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [negotiationStage, setNegotiationStage] = useState<string>("request");
  const [negotiationProgress, setNegotiationProgress] = useState<number>(0);
  const [counterOfferPrice, setCounterOfferPrice] = useState<string>("");
  
  // Track views for analytics
  useEffect(() => {
    // In a real app, this would send analytics data
    console.log("Bulk Purchase View loaded");
  }, []);

  // Get available stores
  const shops: Shop[] = ELECTRONICS_SHOPS.filter(shop => {
    if (filters.storeTypes.length > 0 && !filters.storeTypes.includes(shop.category)) {
      return false;
    }
    return true;
  }).sort((a, b) => b.rating - a.rating); // Sort by rating

  // Get available products based on search query
  const allProducts: DisplayProduct[] = Object.values(products).flat() as DisplayProduct[];
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

  // Calculate discount tier for display
  const getDiscountTier = () => {
    if (!quantity || parseInt(quantity) < 5) return null;
    
    const qty = parseInt(quantity);
    if (qty >= 20) return "15%";
    if (qty >= 10) return "10%";
    return "5%";
  };

  const handleStoreSelect = (storeId: string) => {
    const store = shops.find(s => s.id === storeId);
    if (store) {
      setSelectedStore(store);
      
      // Show success toast
      toast({
        title: "Store Selected",
        description: `You've selected ${store.name} for your bulk purchase request.`,
      });
    }
  };

  const handleProductSelect = (productId: string) => {
    const product = availableProducts.find(p => p.id === productId);
    if (product) {
      setSelectedProduct(product);
      
      // Reset quantity if product changes
      setQuantity("");
      
      toast({
        title: "Product Selected",
        description: `You've selected ${product.name} for bulk purchase.`,
      });
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
    setNegotiationProgress(25);
    
    toast({
      title: "Bulk purchase request sent!",
      description: `Your request for ${quantity} units has been sent to ${selectedStore?.name}. They will respond within 48 hours.`,
    });

    // In a real app, this would send the request to the backend
    setTimeout(() => {
      // Simulate store response for demo purposes
      setNegotiationStage("response");
      setNegotiationProgress(50);
      
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
    setNegotiationProgress(100);
  };

  const handleCounterOffer = () => {
    if (!counterOfferPrice || isNaN(Number(counterOfferPrice)) || Number(counterOfferPrice) <= 0) {
      toast({
        title: "Invalid counter offer",
        description: "Please enter a valid price for your counter offer",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Counter offer sent",
      description: "Your counter offer has been sent to the store owner."
    });
    setNegotiationStage("negotiation");
    setNegotiationProgress(75);
    
    // Simulate store accepting counter offer
    setTimeout(() => {
      setNegotiationStage("confirmed");
      setNegotiationProgress(100);
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
      {/* Progress tracker */}
      {isSubmitted && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Negotiation Progress</span>
            <span className="text-sm font-medium">{negotiationProgress}%</span>
          </div>
          <Progress value={negotiationProgress} className="h-2" />
          <div className="flex justify-between mt-1 text-xs text-muted-foreground">
            <span>Request Sent</span>
            <span>Store Response</span>
            <span>Negotiation</span>
            <span>Confirmed</span>
          </div>
        </motion.div>
      )}
      
      <div className="flex flex-col md:flex-row gap-6 mt-4">
        {/* Request Form */}
        <Card className="flex-1 shadow-sm border-primary/10 hover:border-primary/20 transition-colors">
          <CardHeader className="bg-gradient-to-r from-purple-50 to-transparent">
            <CardTitle className="flex items-center gap-2">
              <ShoppingBag className="h-5 w-5 text-primary" />
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
                  <Label htmlFor="store" className="flex items-center gap-1">
                    <Store className="h-4 w-4 text-primary" />
                    Select Store
                  </Label>
                  <Select onValueChange={handleStoreSelect}>
                    <SelectTrigger id="store" className="border-primary/20">
                      <SelectValue placeholder="Select a store" />
                    </SelectTrigger>
                    <SelectContent>
                      {shops.map((shop) => (
                        <SelectItem key={shop.id} value={shop.id} className="flex items-center gap-2">
                          <div className="flex items-center justify-between w-full">
                            <span>{shop.name}</span>
                            <span className="text-xs bg-primary/10 px-2 py-0.5 rounded-full ml-2">
                              {shop.distance}
                            </span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="product" className="flex items-center gap-1">
                    <Package className="h-4 w-4 text-primary" />
                    Select Product
                  </Label>
                  <Select onValueChange={handleProductSelect}>
                    <SelectTrigger id="product" className="border-primary/20">
                      <SelectValue placeholder="Select a product" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableProducts.map((product) => (
                        <SelectItem key={product.id} value={product.id}>
                          <div className="flex justify-between w-full">
                            <span className="truncate">{product.name}</span>
                            <span className="text-xs font-semibold text-primary">
                              ₹{product.price.toLocaleString()}
                            </span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="quantity" className="flex items-center gap-1">
                      <Package className="h-4 w-4 text-primary" />
                      Quantity
                    </Label>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div className="flex items-center text-xs text-muted-foreground cursor-help">
                            <Info className="h-3 w-3 mr-1" />
                            Bulk Discount Tiers
                          </div>
                        </TooltipTrigger>
                        <TooltipContent className="w-64">
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <span>5-9 units:</span>
                              <Badge variant="outline" className="bg-green-50">5% off</Badge>
                            </div>
                            <div className="flex items-center justify-between">
                              <span>10-19 units:</span>
                              <Badge variant="outline" className="bg-green-100">10% off</Badge>
                            </div>
                            <div className="flex items-center justify-between">
                              <span>20+ units:</span>
                              <Badge variant="outline" className="bg-green-200">15% off</Badge>
                            </div>
                          </div>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <Input 
                    id="quantity" 
                    type="number" 
                    min="5"
                    placeholder="Enter quantity (min. 5 units)" 
                    value={quantity}
                    className="border-primary/20"
                    onChange={(e) => setQuantity(e.target.value)}
                  />
                  <p className="text-xs text-primary italic">
                    Minimum 5 units required for bulk pricing
                  </p>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="message" className="flex items-center gap-1">
                    <MessageSquare className="h-4 w-4 text-primary" />
                    Message to Store (Optional)
                  </Label>
                  <Textarea 
                    id="message" 
                    placeholder="Add any specific requirements or questions..." 
                    value={message}
                    className="border-primary/20 min-h-[100px]"
                    onChange={(e) => setMessage(e.target.value)}
                  />
                </div>
                
                {selectedProduct && quantity && parseInt(quantity) >= 5 && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="rounded-lg bg-gradient-to-r from-primary/5 to-primary/10 p-4 mt-4"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <Percent className="h-4 w-4 text-primary" />
                      <p className="font-medium text-sm">Estimated Bulk Price:</p>
                    </div>
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-semibold text-lg">₹{estimatedPrice.toLocaleString()}</p>
                        <div className="flex items-center text-xs text-muted-foreground">
                          <span>Base: ₹{selectedProduct.price.toLocaleString()} × {quantity} units</span>
                          {getDiscountTier() && (
                            <Badge 
                              variant="outline" 
                              className="ml-2 bg-green-50 border-green-200 text-green-800"
                            >
                              {getDiscountTier()} bulk discount
                            </Badge>
                          )}
                        </div>
                      </div>
                      <div className="text-xs text-muted-foreground text-right">
                        <p>Per unit after discount:</p>
                        <p className="text-sm font-medium">
                          ₹{Math.round(estimatedPrice / parseInt(quantity)).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
                
                <Button 
                  className="w-full mt-2 bg-primary hover:bg-primary/90" 
                  onClick={handleSubmitRequest}
                  disabled={
                    !selectedStore || 
                    !selectedProduct || 
                    !quantity || 
                    parseInt(quantity) < 5
                  }
                >
                  <ShoppingBag className="mr-2 h-4 w-4" />
                  Submit Bulk Purchase Request
                </Button>
              </>
            ) : (
              <div className="space-y-4">
                <div className="flex gap-4 items-center p-3 bg-muted rounded-lg">
                  <Avatar>
                    <AvatarImage src={selectedStore?.image} />
                    <AvatarFallback>
                      {selectedStore?.name.substring(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium flex items-center gap-1">
                      <Store className="h-4 w-4 text-primary" /> {selectedStore?.name}
                    </p>
                    <p className="text-sm text-muted-foreground">{selectedStore?.address}</p>
                    <div className="flex items-center mt-1 text-xs">
                      <div className="flex items-center gap-1 text-yellow-600">
                        <Star className="h-3 w-3 fill-yellow-400" />
                        <span>{selectedStore?.rating}</span>
                      </div>
                      {selectedStore?.isVerified && (
                        <Badge variant="outline" className="ml-2 bg-green-50 border-green-200 text-green-700">
                          <ShieldCheck className="h-3 w-3 mr-1" /> Verified
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Product</p>
                  <p className="font-medium">{selectedProduct?.name}</p>
                </div>
                
                <div className="flex justify-between border-y py-3 my-2">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Quantity</p>
                    <p className="font-medium">{quantity} units</p>
                  </div>
                  
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground mb-1">Requested Price</p>
                    <p className="font-bold">₹{estimatedPrice.toLocaleString()}</p>
                  </div>
                </div>
                
                <div className="border-b pb-4 mb-4">
                  <p className="flex items-center gap-1 mb-2 font-medium">
                    <Clock className="h-4 w-4 text-primary" /> Negotiation Status
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
                              <TrendingDown className="h-3 w-3" />
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
                          "Thank you for your interest! We can offer a 5% discount on your bulk order with delivery within 7 days. Looking forward to your business."
                        </p>
                      </div>
                      
                      <div className="space-y-3">
                        <div className="flex gap-2">
                          <Button size="sm" onClick={handleAcceptOffer} className="flex-1">
                            Accept Offer
                          </Button>
                          <Button size="sm" variant="outline" className="flex-1" onClick={() => {
                            // Toggle counter offer input
                            document.getElementById('counter-offer')?.classList.toggle('hidden');
                          }}>
                            Make Counter Offer
                          </Button>
                        </div>
                        
                        <div id="counter-offer" className="hidden space-y-2 border-t pt-2">
                          <Label htmlFor="counter-price">Your Counter Offer (₹)</Label>
                          <div className="flex gap-2">
                            <Input 
                              id="counter-price" 
                              type="number" 
                              placeholder="Enter your price" 
                              value={counterOfferPrice}
                              onChange={(e) => setCounterOfferPrice(e.target.value)}
                            />
                            <Button onClick={handleCounterOffer}>Send</Button>
                          </div>
                        </div>
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
                      
                      <div className="bg-muted p-2 rounded text-sm mb-3">
                        <p className="italic">
                          "We've accepted your order! Your bulk purchase will be processed and ready for delivery within 5-7 business days."
                        </p>
                      </div>
                      
                      <Button className="w-full mt-2">
                        Proceed to Checkout
                      </Button>
                    </motion.div>
                  )}
                </div>
                
                <div className="space-y-2">
                  <p className="font-medium text-sm flex items-center gap-1">
                    <MessageSquare className="h-4 w-4 text-primary" />
                    Your Message
                  </p>
                  <div className="bg-muted rounded-lg p-3">
                    <p className="text-sm italic">
                      {message || "No additional message was provided."}
                    </p>
                  </div>
                </div>
                
                {/* Add a way to start over */}
                <Button 
                  variant="outline" 
                  className="w-full mt-2" 
                  onClick={() => {
                    setIsSubmitted(false);
                    setNegotiationStage("request");
                    setNegotiationProgress(0);
                    setMessage("");
                    setQuantity("");
                  }}
                >
                  Start New Request
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
        
        {/* Info Cards */}
        <div className="md:w-1/3 space-y-4">
          <Card className="shadow-sm border-primary/10 hover:border-primary/20 transition-colors">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-transparent">
              <CardTitle className="text-lg flex items-center gap-2">
                <Percent className="h-5 w-5 text-primary" />
                Bulk Purchase Benefits
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <div className="mt-0.5 bg-primary/10 p-1 rounded">
                    <TrendingDown className="h-4 w-4 text-primary shrink-0" />
                  </div>
                  <div>
                    <p className="font-medium">Volume Discounts</p>
                    <p className="text-sm text-muted-foreground">Get special pricing when ordering 5+ units. Up to 15% off for larger quantities</p>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <div className="mt-0.5 bg-primary/10 p-1 rounded">
                    <MessageSquare className="h-4 w-4 text-primary shrink-0" />
                  </div>
                  <div>
                    <p className="font-medium">Direct Negotiation</p>
                    <p className="text-sm text-muted-foreground">Negotiate with store owners for the best price and delivery terms</p>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <div className="mt-0.5 bg-primary/10 p-1 rounded">
                    <Package className="h-4 w-4 text-primary shrink-0" />
                  </div>
                  <div>
                    <p className="font-medium">Priority Shipping</p>
                    <p className="text-sm text-muted-foreground">Get priority handling and delivery for your bulk orders</p>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <div className="mt-0.5 bg-primary/10 p-1 rounded">
                    <ShieldCheck className="h-4 w-4 text-primary shrink-0" />
                  </div>
                  <div>
                    <p className="font-medium">Protected Purchases</p>
                    <p className="text-sm text-muted-foreground">All bulk orders come with our buyer protection guarantee</p>
                  </div>
                </li>
              </ul>
            </CardContent>
          </Card>
          
          <Card className="shadow-sm border-primary/10 hover:border-primary/20 transition-colors">
            <CardHeader className="bg-gradient-to-r from-purple-50 to-transparent">
              <CardTitle className="text-lg flex items-center gap-2">
                <Clock className="h-5 w-5 text-primary" />
                How It Works
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ol className="space-y-3 relative border-l border-primary/20 pl-6 py-2">
                <li className="relative">
                  <div className="absolute -left-[24px] bg-background p-0.5 border border-primary/20 rounded-full">
                    <div className="w-3 h-3 bg-primary rounded-full"></div>
                  </div>
                  <div className="mb-4">
                    <p className="font-medium">Select a store and product</p>
                    <p className="text-sm text-muted-foreground">Choose from our network of verified retailers</p>
                  </div>
                </li>
                <li className="relative">
                  <div className="absolute -left-[24px] bg-background p-0.5 border border-primary/20 rounded-full">
                    <div className="w-3 h-3 bg-primary rounded-full"></div>
                  </div>
                  <div className="mb-4">
                    <p className="font-medium">Enter your desired quantity</p>
                    <p className="text-sm text-muted-foreground">Minimum 5 units for bulk pricing, larger quantities get bigger discounts</p>
                  </div>
                </li>
                <li className="relative">
                  <div className="absolute -left-[24px] bg-background p-0.5 border border-primary/20 rounded-full">
                    <div className="w-3 h-3 bg-primary rounded-full"></div>
                  </div>
                  <div className="mb-4">
                    <p className="font-medium">Submit your request</p>
                    <p className="text-sm text-muted-foreground">The store owner will respond within 48 hours</p>
                  </div>
                </li>
                <li className="relative">
                  <div className="absolute -left-[24px] bg-background p-0.5 border border-primary/20 rounded-full">
                    <div className="w-3 h-3 bg-primary rounded-full"></div>
                  </div>
                  <div className="mb-4">
                    <p className="font-medium">Negotiate if needed</p>
                    <p className="text-sm text-muted-foreground">Accept the offer or propose a counter offer</p>
                  </div>
                </li>
                <li className="relative">
                  <div className="absolute -left-[24px] bg-background p-0.5 border border-primary/20 rounded-full">
                    <div className="w-3 h-3 bg-primary rounded-full"></div>
                  </div>
                  <div>
                    <p className="font-medium">Complete your purchase</p>
                    <p className="text-sm text-muted-foreground">Proceed to checkout once terms are agreed</p>
                  </div>
                </li>
              </ol>
            </CardContent>
            <CardFooter className="bg-muted/50 px-4 py-3">
              <div className="text-sm flex items-center gap-2">
                <Info className="h-4 w-4 text-primary" />
                <span>Average response time is under 24 hours</span>
              </div>
            </CardFooter>
          </Card>
          
          {/* Add testimonials or recent successful bulk orders */}
          <Card className="shadow-sm border-primary/10 hover:border-primary/20 transition-colors">
            <CardHeader className="bg-gradient-to-r from-green-50 to-transparent">
              <CardTitle className="text-lg">Recent Bulk Deals</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="p-3 bg-muted rounded-lg">
                <div className="flex justify-between">
                  <p className="font-medium">iPhone 13 Pro</p>
                  <Badge variant="outline" className="bg-green-50">15% off</Badge>
                </div>
                <p className="text-sm text-muted-foreground">12 units @ ₹76,500 per unit</p>
                <p className="text-xs text-primary mt-1">Ordered 2 days ago</p>
              </div>
              
              <div className="p-3 bg-muted rounded-lg">
                <div className="flex justify-between">
                  <p className="font-medium">Samsung Galaxy S23</p>
                  <Badge variant="outline" className="bg-green-50">10% off</Badge>
                </div>
                <p className="text-sm text-muted-foreground">8 units @ ₹69,999 per unit</p>
                <p className="text-xs text-primary mt-1">Ordered 5 days ago</p>
              </div>
              
              <div className="p-3 bg-muted rounded-lg">
                <div className="flex justify-between">
                  <p className="font-medium">MacBook Air M2</p>
                  <Badge variant="outline" className="bg-green-50">12% off</Badge>
                </div>
                <p className="text-sm text-muted-foreground">5 units @ ₹92,000 per unit</p>
                <p className="text-xs text-primary mt-1">Ordered 1 week ago</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      {/* Confirmation Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Confirm Bulk Purchase Request</DialogTitle>
            <DialogDescription>
              You're about to send a bulk purchase request to {selectedStore?.name}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="flex gap-4 items-center p-3 bg-muted rounded-lg">
              <Avatar>
                <AvatarImage src={selectedStore?.image} />
                <AvatarFallback>
                  {selectedStore?.name.substring(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">{selectedStore?.name}</p>
                {selectedStore?.rating && (
                  <div className="flex items-center gap-1 text-yellow-600">
                    <Star className="h-4 w-4 fill-yellow-400" />
                    <span>{selectedStore.rating}</span>
                  </div>
                )}
              </div>
            </div>
            
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
            
            <div className="bg-blue-50 text-blue-800 p-3 rounded-md text-sm">
              <p>
                <span className="font-medium">Note:</span> The store owner will review your request and may offer additional discounts or modify terms. You'll have the option to accept or negotiate further.
              </p>
            </div>
            
            {message && (
              <div className="border-t pt-3">
                <p className="text-sm text-muted-foreground">Your message:</p>
                <p className="text-sm mt-1 italic">"{message}"</p>
              </div>
            )}
          </div>
          
          <DialogFooter className="flex sm:justify-between">
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleConfirmRequest}>Send Request</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
