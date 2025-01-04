import { Shop } from "@/types/shop";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useState } from "react";
import { ShoppingCart, Star } from "lucide-react";

interface ShopComparisonProps {
  currentShop: string;
  price: number;
  otherShops: Shop[];
  productModel: string;
  onShopSelect: (shopName: string, price: number) => void;
}

export const ShopComparison = ({
  currentShop,
  price,
  otherShops,
  productModel,
  onShopSelect,
}: ShopComparisonProps) => {
  const [selectedShops, setSelectedShops] = useState<string[]>([]);

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Available at other stores</h3>
      <div className="grid gap-4 md:grid-cols-2">
        {otherShops.map((shop) => {
          const product = shop.products.find((p) => p.model === productModel);
          if (!product) return null;

          const priceDifference = price - product.price;
          const savings = priceDifference > 0 ? priceDifference : 0;

          return (
            <Card key={shop.name} className="relative">
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
                    onClick={() => onShopSelect(shop.name, product.price)}
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