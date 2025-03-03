
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Star, ExternalLink, ShoppingCart } from "lucide-react";
import { motion } from "framer-motion";
import { ELECTRONICS_SHOPS } from "@/data/shops";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

interface PriceComparisonResultsProps {
  searchQuery: string;
  filters: {
    priceRange: [number, number];
    storeTypes: string[];
    proximity: number;
    inStock: boolean;
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
    
    // Filter by in-stock
    if (filters.inStock) {
      return shop.products.some((p) => p.inStock);
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
                  <div>
                    <h3 className="font-semibold text-lg">{shop.name}</h3>
                    <div className="flex items-center gap-1 mt-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span>{shop.rating}</span>
                      <Badge className="ml-2" variant={shop.isOpen ? "default" : "secondary"}>
                        {shop.isOpen ? "Open" : "Closed"}
                      </Badge>
                    </div>
                  </div>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      <span>{shop.distance}</span>
                    </div>
                  </div>
                </div>

                <div className="border-t pt-4 mt-4">
                  <h4 className="font-semibold mb-2">Available Products</h4>
                  <div className="space-y-2">
                    {relevantProducts.map(product => (
                      <div key={product.id} className="flex justify-between items-center p-2 border rounded hover:bg-gray-50">
                        <div>
                          <p className="font-medium">{product.name}</p>
                          <p className="text-sm text-gray-600">
                            {product.inStock ? "In stock" : "Out of stock"}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
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
