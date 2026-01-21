import { Shop } from "@/types/shop";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { ShoppingCart, Star, MapPin, Check, TrendingDown, Sparkles, ShieldCheck, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface ShopComparisonProps {
  currentShop: string;
  price: number;
  otherShops: Shop[];
  productModel: string;
  onShopSelect: (shopName: string, price: number) => void;
}

interface ComparisonShop {
  name: string;
  price: number;
  rating?: number;
  distance?: string;
  isVerified?: boolean;
  isOpen?: boolean;
}

export const ShopComparison = ({
  currentShop,
  price,
  otherShops,
  productModel,
  onShopSelect,
}: ShopComparisonProps) => {
  const { toast } = useToast();
  const [selectedShop, setSelectedShop] = useState<string>(currentShop);

  // Generate a random price within ±5% of the current price
  const getRandomPrice = (basePrice: number) => {
    const variation = basePrice * 0.05;
    const randomOffset = Math.random() * variation * 2 - variation;
    return Math.round(basePrice + randomOffset);
  };

  // Find all prices for this product model with proper typing
  const allShops: ComparisonShop[] = [
    { name: currentShop, price, isVerified: true, isOpen: true },
    ...otherShops.map(shop => {
      const product = shop.products.find(p => p.model === productModel);
      return {
        name: shop.name,
        price: product?.price || getRandomPrice(price),
        rating: shop.rating,
        distance: shop.distance,
        isVerified: shop.isVerified,
        isOpen: shop.isOpen
      };
    })
  ].sort((a, b) => a.price - b.price);

  const lowestPrice = allShops[0]?.price || 0;
  const highestRated = [...allShops].sort((a, b) => (b.rating || 0) - (a.rating || 0))[0];
  const closest = [...allShops].sort((a, b) => {
    const distA = parseFloat(a.distance?.replace(" km", "") || "999");
    const distB = parseFloat(b.distance?.replace(" km", "") || "999");
    return distA - distB;
  })[0];

  const getShopBadge = (shop: ComparisonShop) => {
    if (shop.price === lowestPrice) {
      return (
        <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white border-0 gap-1">
          <TrendingDown className="h-3 w-3" />
          Best Price
        </Badge>
      );
    }
    if (shop.name === highestRated.name && shop.rating && shop.rating >= 4.5) {
      return (
        <Badge className="bg-gradient-to-r from-amber-500 to-orange-500 text-white border-0 gap-1">
          <Star className="h-3 w-3" />
          Top Rated
        </Badge>
      );
    }
    if (shop.name === closest.name && shop.distance) {
      const dist = parseFloat(shop.distance.replace(" km", ""));
      if (dist < 2) {
        return (
          <Badge className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white border-0 gap-1">
            <MapPin className="h-3 w-3" />
            Nearest
          </Badge>
        );
      }
    }
    return null;
  };

  const handleStoreSelect = (shopName: string, shopPrice: number) => {
    setSelectedShop(shopName);
    onShopSelect(shopName, shopPrice);
    
    const savings = price - shopPrice;
    toast({
      title: "Store Selected",
      description: savings > 0 
        ? `Great choice! You're saving ₹${savings.toLocaleString()} at ${shopName}`
        : `You've selected ${shopName}`,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4"
    >
      {/* Quick Decision Summary */}
      <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-transparent p-4 rounded-xl border border-primary/20">
        <div className="flex items-center gap-2 mb-2">
          <Sparkles className="h-5 w-5 text-primary" />
          <h3 className="font-semibold text-foreground">Quick Comparison</h3>
        </div>
        <p className="text-sm text-muted-foreground">
          {allShops.length} stores available • Lowest price: <span className="font-semibold text-primary">₹{lowestPrice.toLocaleString()}</span>
          {price > lowestPrice && (
            <span className="text-green-600 ml-1">
              (Save ₹{(price - lowestPrice).toLocaleString()})
            </span>
          )}
        </p>
      </div>

      {/* Shop List */}
      <div className="space-y-2">
        <AnimatePresence mode="popLayout">
          {allShops.map((shop, index) => {
            const badge = getShopBadge(shop);
            const isSelected = selectedShop === shop.name;
            const priceDiff = shop.price - lowestPrice;
            
            return (
              <motion.div
                key={shop.name}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => handleStoreSelect(shop.name, shop.price)}
                className={cn(
                  "relative p-4 rounded-xl border-2 cursor-pointer transition-all",
                  isSelected 
                    ? "border-primary bg-primary/5 shadow-md" 
                    : shop.price === lowestPrice
                      ? "border-green-500/50 bg-green-50/50 dark:bg-green-950/20 hover:border-green-500"
                      : "border-border hover:border-primary/30 hover:bg-accent/30"
                )}
              >
                {/* Badge */}
                {badge && (
                  <div className="absolute -top-2.5 left-4">
                    {badge}
                  </div>
                )}

                <div className="flex items-center justify-between gap-4">
                  {/* Left: Shop Info */}
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    {/* Selection Indicator */}
                    <div className={cn(
                      "w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors",
                      isSelected 
                        ? "border-primary bg-primary" 
                        : "border-muted-foreground/30"
                    )}>
                      {isSelected && <Check className="h-3 w-3 text-primary-foreground" />}
                    </div>

                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-foreground truncate">{shop.name}</span>
                        {shop.isVerified && (
                          <ShieldCheck className="h-4 w-4 text-blue-500 flex-shrink-0" />
                        )}
                      </div>
                      <div className="flex items-center gap-3 text-sm text-muted-foreground mt-0.5">
                        {shop.rating && (
                          <span className="flex items-center gap-1">
                            <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                            {shop.rating}
                          </span>
                        )}
                        {shop.distance && (
                          <span className="flex items-center gap-1">
                            <MapPin className="h-3.5 w-3.5" />
                            {shop.distance}
                          </span>
                        )}
                        {shop.isOpen !== undefined && (
                          <span className={cn(
                            "flex items-center gap-1",
                            shop.isOpen ? "text-green-600" : "text-muted-foreground"
                          )}>
                            <Clock className="h-3.5 w-3.5" />
                            {shop.isOpen ? "Open" : "Closed"}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Right: Price */}
                  <div className="text-right flex-shrink-0">
                    <p className={cn(
                      "text-lg font-bold",
                      shop.price === lowestPrice ? "text-green-600" : "text-foreground"
                    )}>
                      ₹{shop.price.toLocaleString()}
                    </p>
                    {priceDiff > 0 && (
                      <p className="text-xs text-muted-foreground">
                        +₹{priceDiff.toLocaleString()} more
                      </p>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Recommendation */}
      {allShops[0] && allShops[0].name !== selectedShop && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center justify-between p-3 rounded-lg bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-900"
        >
          <div className="flex items-center gap-2 text-sm">
            <TrendingDown className="h-4 w-4 text-green-600" />
            <span className="text-green-700 dark:text-green-400">
              Switch to <strong>{allShops[0].name}</strong> to save ₹{(price - lowestPrice).toLocaleString()}
            </span>
          </div>
          <Button
            size="sm"
            variant="ghost"
            className="text-green-700 hover:text-green-800 hover:bg-green-100"
            onClick={() => handleStoreSelect(allShops[0].name, allShops[0].price)}
          >
            Switch
          </Button>
        </motion.div>
      )}
    </motion.div>
  );
};
