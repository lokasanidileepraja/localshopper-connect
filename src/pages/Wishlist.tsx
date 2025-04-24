
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Heart, ShoppingCart, Trash2 } from "lucide-react";
import { motion } from "framer-motion";
import { useCartStore } from "@/store/cartStore";
import { Navigation } from "@/components/Navigation";

const Wishlist = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { addToCart } = useCartStore();
  
  // For demo purposes, we'll use local state
  const [wishlistItems, setWishlistItems] = useState([
    {
      id: "p1",
      name: "Sony WH-1000XM4 Wireless Headphones",
      image: "https://example.com/headphones.jpg",
      price: 24999,
      brand: "Sony",
      inStock: true,
    },
    {
      id: "p2",
      name: "Samsung Galaxy S24 Ultra",
      image: "https://example.com/smartphone.jpg",
      price: 129999,
      brand: "Samsung",
      inStock: true,
    },
    {
      id: "p3",
      name: "Apple iPad Pro 12.9\"",
      image: "https://example.com/tablet.jpg",
      price: 89999,
      brand: "Apple",
      inStock: false,
    }
  ]);

  const handleRemoveFromWishlist = (itemId) => {
    setWishlistItems(prev => prev.filter(item => item.id !== itemId));
    
    toast({
      title: "Removed from wishlist",
      description: "Item has been removed from your wishlist"
    });
  };

  const handleAddToCart = (product) => {
    addToCart(product, "Online Store");
    
    toast({
      title: "Added to cart",
      description: `${product.name} added to your cart`,
    });
  };
  
  const handleViewProduct = (productId) => {
    navigate(`/product/${productId}`);
  };
  
  return (
    <div className="min-h-screen pb-16 md:pb-0">
      <Navigation />
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-2 mb-8">
            <Heart className="h-5 w-5 text-red-500" />
            <h1 className="text-3xl font-bold">Your Wishlist</h1>
          </div>
          
          {wishlistItems.length === 0 ? (
            <div className="text-center py-16 bg-gray-50 rounded-lg">
              <Heart className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <h2 className="text-xl font-medium mb-2">Your wishlist is empty</h2>
              <p className="text-gray-500 mb-6">Items you save to your wishlist will appear here</p>
              <Button onClick={() => navigate('/categories')}>
                Continue Shopping
              </Button>
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {wishlistItems.map((item, index) => (
                <motion.div 
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="h-full flex flex-col overflow-hidden">
                    <div className="aspect-square bg-gray-100 relative overflow-hidden">
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className="w-full h-full object-cover"
                        onError={e => {
                          e.currentTarget.src = "/placeholder.svg";
                        }}
                      />
                      <Button 
                        variant="ghost" 
                        size="icon"
                        className="absolute top-2 right-2 bg-white/80 hover:bg-white rounded-full"
                        onClick={() => handleRemoveFromWishlist(item.id)}
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                    
                    <CardContent className="p-4 flex-grow flex flex-col">
                      <div className="flex-grow">
                        <p className="text-sm text-muted-foreground mb-1">{item.brand}</p>
                        <h3 className="font-medium mb-2 line-clamp-2">{item.name}</h3>
                        <p className="font-bold mb-4">₹{item.price.toLocaleString()}</p>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-2 mt-2">
                        <Button 
                          variant="outline" 
                          className="w-full"
                          onClick={() => handleViewProduct(item.id)}
                        >
                          View
                        </Button>
                        <Button 
                          className="w-full"
                          disabled={!item.inStock}
                          onClick={() => handleAddToCart(item)}
                        >
                          <ShoppingCart className="h-4 w-4 mr-2" />
                          {item.inStock ? "Add" : "Sold Out"}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
          
          {wishlistItems.length > 0 && (
            <div className="mt-8 flex justify-center">
              <Button variant="outline" onClick={() => navigate("/categories")}>
                Continue Shopping
              </Button>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Wishlist;
