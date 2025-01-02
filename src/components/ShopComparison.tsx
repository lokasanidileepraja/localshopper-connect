import { Shop } from "@/types/shop";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import { ShoppingCart, Star } from "lucide-react";

interface ShopComparisonProps {
  shops: Shop[];
  onCompare: (shopIds: string[]) => void;
}

export const ShopComparison = ({ shops, onCompare }: ShopComparisonProps) => {
  const [selectedShops, setSelectedShops] = useState<string[]>([]);

  const handleShopSelect = (shopName: string) => {
    setSelectedShops((prev) =>
      prev.includes(shopName)
        ? prev.filter((name) => name !== shopName)
        : [...prev, shopName]
    );
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {shops.map((shop) => (
          <Card key={shop.name} className="relative">
            <CardHeader className="p-0">
              <div className="relative h-48 overflow-hidden rounded-t-lg">
                <img
                  src={shop.image}
                  alt={shop.name}
                  className="h-full w-full object-cover"
                />
                <div className="absolute right-2 top-2">
                  <Checkbox
                    checked={selectedShops.includes(shop.name)}
                    onCheckedChange={() => handleShopSelect(shop.name)}
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-4">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="font-semibold">{shop.name}</h3>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span>{shop.rating}</span>
                </div>
              </div>
              <div className="flex items-center justify-between text-sm text-gray-600">
                <span>{shop.category}</span>
                <span>{shop.distance}</span>
              </div>
              <div className="mt-4">
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => onCompare([shop.name])}
                >
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  View Products
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      {selectedShops.length > 1 && (
        <div className="flex justify-center">
          <Button onClick={() => onCompare(selectedShops)}>
            Compare Selected Shops
          </Button>
        </div>
      )}
    </div>
  );
};