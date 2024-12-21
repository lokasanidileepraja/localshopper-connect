import { Button } from "@/components/ui/button";
import { Shop } from "@/types/shop";
import { useState } from "react";

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
  const [selectedShop, setSelectedShop] = useState(currentShop);

  const handleShopSelect = (shopName: string, price: number) => {
    setSelectedShop(shopName);
    onShopSelect(shopName, price);
  };

  return (
    <div className="bg-gray-50 p-4 rounded-lg">
      <h4 className="font-medium text-sm mb-3 text-gray-700">
        Available at other shops:
      </h4>
      <div className="space-y-3">
        {otherShops.map((shop) => {
          const product = shop.products.find((p) => p.model === productModel);
          if (!product) return null;

          const priceDifference = product.price - price;
          const isLowerPrice = priceDifference < 0;
          const isSelected = shop.name === selectedShop;

          return (
            <div
              key={shop.name}
              className={`flex items-center justify-between p-3 rounded transition-colors ${
                isSelected
                  ? "bg-primary/10 border border-primary"
                  : "hover:bg-gray-100"
              }`}
            >
              <div>
                <p className="font-medium">{shop.name}</p>
                <p className="text-sm text-gray-600">
                  {shop.distance} • {shop.isOpen ? "Open" : "Closed"}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p
                    className={`font-semibold ${
                      isLowerPrice ? "text-green-600" : "text-gray-900"
                    }`}
                  >
                    ₹{product.price.toLocaleString()}
                  </p>
                  {priceDifference !== 0 && (
                    <p
                      className={`text-sm ${
                        isLowerPrice ? "text-green-600" : "text-gray-500"
                      }`}
                    >
                      {isLowerPrice ? "Save " : ""}₹
                      {Math.abs(priceDifference).toLocaleString()}
                      {isLowerPrice ? " here!" : " more"}
                    </p>
                  )}
                </div>
                <Button
                  variant={isSelected ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleShopSelect(shop.name, product.price)}
                >
                  {isSelected ? "Selected" : "Select"}
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};