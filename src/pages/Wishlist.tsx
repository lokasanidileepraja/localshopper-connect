import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Heart, ShoppingCart, Trash2, Bell, TrendingDown, CalendarClock, Filter, Tag } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { useCartStore } from "@/store/cartStore";
import { Product } from "@/types/shop";
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { TooltipWrapper } from "@/components/common/TooltipWrapper";

const WISHLIST_CATEGORIES = [
  "All", "Electronics", "Mobiles", "Laptops", "Accessories", "Priority"
];

const PRIORITY_LEVELS = [
  { value: "high", label: "High", color: "destructive" },
  { value: "medium", label: "Medium", color: "default" },
  { value: "low", label: "Low", color: "secondary" }
];

const Wishlist = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { addToCart } = useCartStore();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [alertPrice, setAlertPrice] = useState("");
  const [alertEmail, setAlertEmail] = useState("");
  const [selectedTab, setSelectedTab] = useState("All");
  const [selectedPriority, setSelectedPriority] = useState<string | null>(null);
  
  const [wishlistItems, setWishlistItems] = useState([
    {
      id: "1",
      name: "Smartphone X",
      price: 79900,
      image: "/placeholder.svg",
      description: "Latest smartphone with amazing features",
      category: "Electronics",
      subCategory: "Mobiles",
      priority: "high",
      rating: 4.5,
      stock: 10,
      brand: "TechBrand",
      model: "X23",
      inStock: true,
      lastUpdated: "2023-05-15T10:30:00"
    },
    {
      id: "2",
      name: "Laptop Pro",
      price: 129900,
      image: "/placeholder.svg",
      description: "Powerful laptop for professionals",
      category: "Electronics",
      subCategory: "Laptops",
      priority: "medium",
      rating: 4.7,
      stock: 5,
      brand: "ProTech",
      model: "P450",
      inStock: true,
      lastUpdated: "2023-05-16T14:20:00"
    },
    {
      id: "3",
      name: "Wireless Earbuds",
      price: 8990,
      image: "/placeholder.svg",
      description: "Premium wireless earbuds with noise cancellation",
      category: "Electronics",
      subCategory: "Accessories",
      priority: "low",
      rating: 4.3,
      stock: 15,
      brand: "SoundMaster",
      model: "WE200",
      inStock: true,
      lastUpdated: "2023-05-18T09:15:00"
    }
  ]);

  const handleAddToCart = (item: Product) => {
    addToCart(item, "Demo Shop");
    
    toast({
      title: "Added to Cart",
      description: "Item has been added to your cart.",
    });
    
    navigate("/cart");
  };

  const handleRemove = (itemId: string) => {
    setWishlistItems(wishlistItems.filter(item => item.id !== itemId));
    
    toast({
      title: "Removed from Wishlist",
      description: "Item has been removed from your wishlist.",
    });
  };

  const handleContinueShopping = () => {
    navigate("/category/electronics");
  };

  const handleSetPriceAlert = () => {
    if (!alertEmail) {
      toast({
        title: "Email Required",
        description: "Please enter your email address",
        variant: "destructive",
      });
      return;
    }

    if (!alertPrice || isNaN(Number(alertPrice)) || Number(alertPrice) <= 0) {
      toast({
        title: "Invalid Price",
        description: "Please enter a valid target price",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Price Alert Set",
      description: `We'll notify you when ${selectedProduct?.name} drops below ₹${parseInt(alertPrice).toLocaleString()}`,
    });
    
    setSelectedProduct(null);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', { 
      day: 'numeric',
      month: 'short', 
      year: 'numeric'
    });
  };

  const handleChangePriority = (itemId: string, priority: string) => {
    setWishlistItems(
      wishlistItems.map(item => 
        item.id === itemId ? { ...item, priority } : item
      )
    );
    
    toast({
      title: "Priority Updated",
      description: "Item priority has been updated in your wishlist.",
    });
  };

  const filteredItems = wishlistItems.filter(item => {
    const matchesCategory = selectedTab === "All" 
      || item.category === selectedTab 
      || item.subCategory === selectedTab
      || (selectedTab === "Priority" && item.priority === "high");
      
    const matchesPriority = !selectedPriority || item.priority === selectedPriority;
    
    return matchesCategory && matchesPriority;
  });

  return (
    <div className="container py-6 md:py-12">
      <div className="flex items-center gap-2 mb-4">
        <Heart className="h-6 w-6 text-primary" />
        <h1 className="text-2xl md:text-3xl font-bold">My Wishlist</h1>
      </div>
      
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="w-full md:w-auto">
          <Tabs 
            defaultValue="All" 
            value={selectedTab}
            onValueChange={setSelectedTab}
            className="w-full"
          >
            <TabsList className="w-full grid grid-cols-3 md:grid-cols-6">
              {WISHLIST_CATEGORIES.map(category => (
                <TabsTrigger 
                  key={category} 
                  value={category}
                  className="text-xs md:text-sm whitespace-nowrap"
                >
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>
        
        <div className="flex items-center gap-2">
          <TooltipWrapper content="Filter by priority">
            <Filter className="h-4 w-4 text-muted-foreground" />
          </TooltipWrapper>
          <Select
            value={selectedPriority || ""}
            onValueChange={value => setSelectedPriority(value || null)}
          >
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Priorities</SelectItem>
              {PRIORITY_LEVELS.map(priority => (
                <SelectItem key={priority.value} value={priority.value}>
                  {priority.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      
      {filteredItems.length > 0 ? (
        <div className="grid gap-4 md:gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredItems.map((item) => (
            <Card key={item.id} className="overflow-hidden">
              <div className="relative">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-48 object-cover cursor-pointer"
                  onClick={() => navigate(`/product/${item.id}`)}
                />
                <Badge 
                  className={`absolute top-2 right-2 ${
                    item.priority === "high" ? "bg-red-500" : 
                    item.priority === "medium" ? "bg-amber-500" : "bg-blue-500"
                  }`}
                >
                  {item.priority === "high" ? "High Priority" : 
                   item.priority === "medium" ? "Medium Priority" : "Low Priority"}
                </Badge>
              </div>
              <CardContent className="p-4">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 
                    className="font-semibold hover:text-primary truncate cursor-pointer"
                    onClick={() => navigate(`/product/${item.id}`)}
                  >
                    {item.name}
                  </h3>
                  <Badge variant="outline" className="whitespace-nowrap">
                    {item.subCategory}
                  </Badge>
                </div>
                <p className="text-lg font-bold mb-2">₹{item.price.toLocaleString()}</p>
                
                {item.lastUpdated && (
                  <p className="text-xs text-muted-foreground mb-3 flex items-center gap-1">
                    <CalendarClock className="h-3 w-3" />
                    Last updated: {formatDate(item.lastUpdated)}
                  </p>
                )}
                
                <div className="flex gap-2 mb-3">
                  <TooltipWrapper content="Set priority level">
                    <Select
                      value={item.priority}
                      onValueChange={(value) => handleChangePriority(item.id, value)}
                    >
                      <SelectTrigger className="h-8 text-xs">
                        <SelectValue placeholder="Priority" />
                      </SelectTrigger>
                      <SelectContent>
                        {PRIORITY_LEVELS.map(priority => (
                          <SelectItem key={priority.value} value={priority.value}>
                            {priority.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </TooltipWrapper>
                  
                  <TooltipWrapper content="Add to cart">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1"
                      onClick={() => handleAddToCart(item)}
                    >
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Add to Cart
                    </Button>
                  </TooltipWrapper>
                  
                  <Dialog>
                    <DialogTrigger asChild>
                      <TooltipWrapper content="Set price alert">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => setSelectedProduct(item)}
                        >
                          <Bell className="h-4 w-4" />
                        </Button>
                      </TooltipWrapper>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Set Price Alert</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4 py-2">
                        <p className="text-sm text-muted-foreground">
                          We'll notify you when {selectedProduct?.name} drops below your target price.
                        </p>
                        
                        <div className="space-y-2">
                          <Label htmlFor="alert-email">Email</Label>
                          <Input 
                            id="alert-email" 
                            value={alertEmail}
                            onChange={(e) => setAlertEmail(e.target.value)}
                            placeholder="Enter your email address"
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="alert-price">Target Price (₹)</Label>
                          <div className="flex items-center gap-2">
                            <TrendingDown className="h-4 w-4 text-muted-foreground" />
                            <Input 
                              id="alert-price" 
                              value={alertPrice}
                              onChange={(e) => setAlertPrice(e.target.value)}
                              placeholder="e.g., 75000"
                              type="number"
                            />
                          </div>
                        </div>
                        
                        <Button className="w-full" onClick={handleSetPriceAlert}>
                          Set Alert
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                  
                  <TooltipWrapper content="Remove from wishlist">
                    <Button
                      variant="destructive"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => handleRemove(item.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TooltipWrapper>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle className="text-center">No items found</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-muted-foreground mb-4">
              {wishlistItems.length > 0 
                ? "No items match your selected filters. Try changing your filter criteria."
                : "Your wishlist is empty. Add items to your wishlist to keep track of products you're interested in."
              }
            </p>
            <Button onClick={handleContinueShopping}>
              Continue Shopping
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Wishlist;
