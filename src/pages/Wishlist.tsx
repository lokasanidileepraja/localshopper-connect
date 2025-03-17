
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, ShoppingCart, Trash2, Bell, TrendingDown, CalendarClock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";
import { Product } from "@/types/shop";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const Wishlist = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [alertPrice, setAlertPrice] = useState("");
  const [alertEmail, setAlertEmail] = useState("");
  
  // Mock wishlist data with lastUpdated timestamp
  const wishlistItems = [
    {
      id: "1",
      name: "Smartphone X",
      price: 79900,
      image: "/placeholder.svg",
      description: "Latest smartphone with amazing features",
      category: "electronics",
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
      category: "electronics",
      rating: 4.7,
      stock: 5,
      brand: "ProTech",
      model: "P450",
      inStock: true,
      lastUpdated: "2023-05-16T14:20:00"
    }
  ];

  const handleAddToCart = (item: Product) => {
    addToCart(item, "Demo Shop");
    
    toast({
      title: "Added to Cart",
      description: "Item has been added to your cart.",
    });
    
    // Navigate to cart
    navigate("/cart");
  };

  const handleRemove = (itemId: string) => {
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

  return (
    <div className="container py-12">
      <div className="flex items-center gap-2 mb-8">
        <Heart className="h-6 w-6 text-primary" />
        <h1 className="text-3xl font-bold">My Wishlist</h1>
      </div>
      
      {wishlistItems.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {wishlistItems.map((item) => (
            <Card key={item.id} className="overflow-hidden">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-48 object-cover cursor-pointer"
                onClick={() => navigate(`/product/${item.id}`)}
              />
              <CardContent className="p-4">
                <h3 className="font-semibold mb-2 cursor-pointer hover:text-primary"
                    onClick={() => navigate(`/product/${item.id}`)}>
                  {item.name}
                </h3>
                <p className="text-lg font-bold mb-2">₹{item.price.toLocaleString()}</p>
                
                {item.lastUpdated && (
                  <p className="text-xs text-muted-foreground mb-4 flex items-center gap-1">
                    <CalendarClock className="h-3 w-3" />
                    Last updated: {formatDate(item.lastUpdated)}
                  </p>
                )}
                
                <div className="flex gap-2 mb-4">
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => handleAddToCart(item)}
                  >
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Add to Cart
                  </Button>
                  
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => setSelectedProduct(item)}
                      >
                        <Bell className="h-4 w-4" />
                      </Button>
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
                  
                  <Button
                    variant="destructive"
                    size="icon"
                    onClick={() => handleRemove(item.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="text-sm text-muted-foreground">
                  <p className="flex items-center gap-1">
                    <span>Current price: </span>
                    <span className="font-semibold">₹{item.price.toLocaleString()}</span>
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle className="text-center">Your wishlist is empty</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-muted-foreground mb-4">Add items to your wishlist to keep track of products you're interested in</p>
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
