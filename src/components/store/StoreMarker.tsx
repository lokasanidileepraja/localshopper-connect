
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ShoppingBag, ExternalLink, Star } from "lucide-react";
import { Shop, Product } from "@/types/shop";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { 
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { analytics } from "@/lib/analytics";

interface StoreMarkerProps {
  shop: Shop;
  onClick: (shopId: string) => void;
  isSelected: boolean;
}

export const StoreMarker = ({ shop, onClick, isSelected }: StoreMarkerProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Filter to show only mobile products
  const mobileProducts = shop.products.filter(product => 
    product.category.toLowerCase() === "mobile" || 
    product.category.toLowerCase() === "smartphone"
  );

  const handleStoreClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onClick(shop.id);
    
    analytics.trackEvent('map_store_select', { 
      storeId: shop.id, 
      storeName: shop.name 
    });
  };

  const handleProductClick = (e: React.MouseEvent, productId: string) => {
    e.stopPropagation();
    navigate(`/product/${productId}`);
    
    toast({
      title: "Opening product details",
      description: "Loading product information...",
    });
    
    analytics.trackEvent('map_product_select', { 
      productId,
      storeId: shop.id, 
      storeName: shop.name 
    });
  };

  const handleViewStore = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(`/shop/${shop.id}`);
    
    toast({
      title: "Opening store page",
      description: `Viewing ${shop.name}`,
    });
    
    analytics.trackEvent('map_view_store', { 
      storeId: shop.id, 
      storeName: shop.name 
    });
  };

  return (
    <HoverCard openDelay={100} closeDelay={200}>
      <HoverCardTrigger asChild>
        <div 
          onClick={handleStoreClick}
          className={`cursor-pointer transition-transform ${isSelected ? 'scale-125 z-10' : 'hover:scale-110'}`}
        >
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div 
                  className={`
                    w-8 h-8 rounded-full flex items-center justify-center text-white font-bold 
                    shadow-lg transition-all
                    ${isSelected ? 'bg-primary ring-4 ring-primary/30' : shop.isOpen ? 'bg-green-500' : 'bg-gray-500'}
                  `}
                >
                  {shop.name.charAt(0)}
                </div>
              </TooltipTrigger>
              <TooltipContent side="top" className="bg-white px-2 py-1 text-xs">
                {shop.name} {shop.isOpen ? "(Open)" : "(Closed)"}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </HoverCardTrigger>
      <HoverCardContent className="w-80 p-0" side="right">
        <motion.div 
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          <Card className="border-0 shadow-none">
            <div className="bg-gradient-to-r from-primary/90 to-primary p-4 text-white rounded-t-lg">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-bold text-lg">{shop.name}</h3>
                <Badge variant={shop.isOpen ? "secondary" : "outline"} className="bg-white/20">
                  {shop.isOpen ? "Open Now" : "Closed"}
                </Badge>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Star className="h-4 w-4 fill-yellow-300 text-yellow-300" />
                <span>{shop.rating}/5.0</span>
                <span className="mx-2">•</span>
                <span>{shop.distance}</span>
              </div>
            </div>
            <CardContent className="p-3">
              {mobileProducts.length > 0 ? (
                <div className="space-y-3">
                  <h4 className="text-sm font-medium">Available Products:</h4>
                  <div className="grid gap-2">
                    {mobileProducts.slice(0, 3).map((product) => (
                      <div 
                        key={product.id} 
                        className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-50 cursor-pointer transition-colors"
                        onClick={(e) => handleProductClick(e, product.id)}
                      >
                        <div className="w-10 h-10 bg-gray-100 rounded-md overflow-hidden flex-shrink-0">
                          <img 
                            src={product.image || "/placeholder.svg"} 
                            alt={product.name} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-grow min-w-0">
                          <h5 className="text-sm font-medium truncate">{product.name}</h5>
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-primary font-semibold">₹{product.price.toLocaleString()}</span>
                            <Badge variant={product.inStock ? "outline" : "secondary"} className="text-xs">
                              {product.inStock ? "In Stock" : "Out of Stock"}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    ))}
                    {mobileProducts.length > 3 && (
                      <div className="text-xs text-center text-muted-foreground">
                        +{mobileProducts.length - 3} more products
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="py-3 text-center text-muted-foreground text-sm">
                  No mobile products available at this store
                </div>
              )}
              
              <Button 
                className="w-full mt-3 gap-2" 
                onClick={handleViewStore}
                size="sm"
              >
                <ShoppingBag className="w-4 h-4" />
                View Full Store
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </HoverCardContent>
    </HoverCard>
  );
};
