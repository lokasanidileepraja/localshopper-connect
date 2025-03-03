
import { Shop } from "@/types/shop";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { ShoppingCart, Star, MapPin, Clock, Check, TrendingDown } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

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
}

export const ShopComparison = ({
  currentShop,
  price,
  otherShops,
  productModel,
  onShopSelect,
}: ShopComparisonProps) => {
  const { toast } = useToast();
  const [isComparing, setIsComparing] = useState(false);

  // Generate a random price within ±5% of the current price
  const getRandomPrice = (basePrice: number) => {
    const variation = basePrice * 0.05; // 5% variation
    const randomOffset = Math.random() * variation * 2 - variation;
    return Math.round(basePrice + randomOffset);
  };

  // Find all prices for this product model with proper typing
  const allShops: ComparisonShop[] = [
    { name: currentShop, price },
    ...otherShops.map(shop => {
      const product = shop.products.find(p => p.model === productModel);
      return {
        name: shop.name,
        price: product?.price || getRandomPrice(price),
        rating: shop.rating,
        distance: shop.distance
      };
    })
  ].sort((a, b) => a.price - b.price);

  const lowestPrice = allShops[0]?.price || 0;

  const handleStoreSelect = (shopName: string, shopPrice: number) => {
    // Call the onShopSelect callback passed from the parent
    onShopSelect(shopName, shopPrice);
    
    // Show toast notification
    toast({
      title: "Store Selected",
      description: `You've selected ${shopName} with price ₹${shopPrice.toLocaleString()}`,
    });
  };

  return (
    <div className="space-y-4">
      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="text-lg font-semibold mb-3">Price Comparison</h3>
        <div className="space-y-2">
          {allShops.map((shop, index) => (
            <div 
              key={shop.name}
              className={`flex items-center justify-between p-3 rounded-lg ${
                shop.price === lowestPrice
                  ? "bg-green-50 border border-green-200"
                  : "bg-white border"
              } ${shop.name !== currentShop ? "cursor-pointer hover:border-primary" : ""}`}
              onClick={() => {
                if (shop.name !== currentShop) {
                  handleStoreSelect(shop.name, shop.price);
                }
              }}
            >
              <div className="flex items-center gap-3">
                {shop.price === lowestPrice ? (
                  <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                    <Check className="w-4 h-4 text-green-600" />
                  </div>
                ) : (
                  <div className="w-6 h-6 flex items-center justify-center">
                    {index + 1}
                  </div>
                )}
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-medium">{shop.name}</p>
                    {shop.name !== currentShop && shop.price < price && (
                      <Badge variant="secondary" className="flex items-center gap-1">
                        <TrendingDown className="h-3 w-3" />
                        Cheaper
                      </Badge>
                    )}
                  </div>
                  {shop.rating && (
                    <div className="flex items-center gap-1 text-sm text-gray-600">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      {shop.rating}
                    </div>
                  )}
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-primary">
                  ₹{shop.price.toLocaleString()}
                </p>
                {shop.distance && (
                  <p className="text-sm text-gray-600 flex items-center gap-1 justify-end">
                    <MapPin className="h-3 w-3" />
                    {shop.distance}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {otherShops.map((shop) => {
          const product = shop.products.find((p) => p.model === productModel);
          if (!product) return null;

          const priceDifference = price - product.price;
          const savings = priceDifference > 0 ? priceDifference : 0;

          return (
            <Card key={shop.name} className="relative hover:border-primary transition-colors">
              <CardContent className="p-4">
                <div className="mb-4 flex items-center justify-between">
                  <h4 className="font-semibold">{shop.name}</h4>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span>{shop.rating}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span>{shop.distance}</span>
                  <span className="font-semibold text-primary">
                    ₹{product.price.toLocaleString()}
                  </span>
                </div>
                {savings > 0 && (
                  <p className="mt-2 text-sm text-green-600">
                    Save ₹{savings.toLocaleString()}
                  </p>
                )}
                <div className="mt-4">
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => handleStoreSelect(shop.name, product.price)}
                  >
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    Select Store
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
