
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Star, ExternalLink, ShoppingCart, Calendar, Shield, CreditCard, Clock } from "lucide-react";
import { motion } from "framer-motion";
import { ELECTRONICS_SHOPS } from "@/data/shops";
import { useCartStore } from "@/store/cartStore";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface PriceComparisonResultsProps {
  searchQuery: string;
  filters: {
    priceRange: [number, number];
    storeTypes: string[];
    proximity: number;
    inStock: boolean;
    emiAvailable?: boolean;
    verifiedOnly?: boolean;
    location?: string;
  };
}

export const PriceComparisonResults = ({
  searchQuery,
  filters,
}: PriceComparisonResultsProps) => {
  const { addToCart } = useCart();
  const { toast } = useToast();
  const [selectedProduct, setSelectedProduct] = useState("");

  // Filter shops based on search query and filters
  const filteredShops = ELECTRONICS_SHOPS.filter((shop) => {
    // Filter by search query
    if (searchQuery && !shop.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !shop.products.some(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()))) {
      return false;
    }
    
    // Filter by verified status
    if (filters.verifiedOnly && !shop.isVerified) {
      return false;
    }
    
    // Filter by in-stock
    if (filters.inStock) {
      return shop.products.some((p) => p.inStock);
    }
    
    // Filter by EMI availability
    if (filters.emiAvailable) {
      return shop.products.some((p) => p.emiOptions && p.emiOptions.length > 0);
    }
    
    return true;
  });

  const handleAddToCart = (shop, product) => {
    addToCart(product, shop.name);
    setSelectedProduct(product.id);
    
    toast({
      title: "Added to cart",
      description: `${product.name} from ${shop.name} added to your cart`,
    });
  };

  const formatLastUpdated = (dateString) => {
    if (!dateString) return null;
    
    const date = new Date(dateString);
    const now = new Date();
    const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) {
      return 'Today';
    } else if (diffDays === 1) {
      return 'Yesterday';
    } else if (diffDays < 7) {
      return `${diffDays} days ago`;
    } else {
      return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
    }
  };

  return (
    <div className="space-y-8">
      {filteredShops.map((shop, index) => {
        // Filter products based on search query
        const relevantProducts = shop.products.filter(p => 
          !searchQuery || p.name.toLowerCase().includes(searchQuery.toLowerCase())
        ).filter(p => 
          p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1]
        );
        
        if (relevantProducts.length === 0) return null;
        
        return (
          <motion.div
            key={shop.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="space-y-4"
          >
            <Card className="overflow-hidden">
              <div className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-lg">{shop.name}</h3>
                    {shop.isVerified && (
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                        <Shield className="h-3 w-3 mr-1 fill-green-500" /> Verified
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-full">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium text-yellow-700">{shop.rating}</span>
                    </div>
                    <Badge className="ml-2" variant={shop.isOpen ? "default" : "secondary"}>
                      {shop.isOpen ? "Open" : "Closed"}
                    </Badge>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-1 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      <span>{shop.distance}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4" />
                      <span>{shop.phone}</span>
                    </div>
                  </div>
                </div>

                <div className="border-t pt-4 mt-4">
                  <h4 className="font-semibold mb-2">Available Products</h4>
                  <div className="space-y-3">
                    {relevantProducts.map(product => (
                      <div key={product.id} className="flex justify-between items-center p-3 border rounded hover:bg-gray-50">
                        <div>
                          <p className="font-medium">{product.name}</p>
                          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1">
                            <p className="text-sm text-gray-600">
                              {product.inStock ? "In stock" : "Out of stock"}
                            </p>
                            
                            {shop.lastUpdated && (
                              <p className="text-xs text-muted-foreground flex items-center gap-1">
                                <Calendar className="h-3 w-3" />
                                Updated: {formatLastUpdated(shop.lastUpdated)}
                              </p>
                            )}
                            
                            {product.emiOptions && product.emiOptions.length > 0 && (
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <span className="cursor-help text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full flex items-center gap-1">
                                      <CreditCard className="h-3 w-3" /> EMI Available
                                    </span>
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <div className="space-y-1 p-1">
                                      <p className="text-xs font-medium">EMI Options:</p>
                                      {product.emiOptions.map((emi, i) => (
                                        <div key={i} className="text-xs">
                                          <span className="font-medium">{emi.provider}:</span> {emi.tenures[0].months} months at {emi.tenures[0].interestRate}%
                                        </div>
                                      ))}
                                    </div>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <p className="font-bold text-primary">₹{product.price.toLocaleString()}</p>
                          <Button 
                            size="sm" 
                            onClick={() => handleAddToCart(shop, product)}
                            disabled={!product.inStock || selectedProduct === product.id}
                          >
                            <ShoppingCart className="w-4 h-4 mr-1" />
                            {selectedProduct === product.id ? "Added" : "Add to Cart"}
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex gap-2 mt-4">
                  <Button variant="outline" className="flex-1">
                    <Phone className="h-4 w-4 mr-2" />
                    Contact
                  </Button>
                  <Button className="flex-1">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Visit Store
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        );
      })}
      
      {filteredShops.length === 0 && (
        <div className="text-center py-12">
          <h3 className="text-xl font-semibold mb-2">No results found</h3>
          <p className="text-gray-600">Try adjusting your search or filters</p>
        </div>
      )}
    </div>
  );
};
