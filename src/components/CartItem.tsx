import { Button } from "@/components/ui/button";
import { Product } from "@/types/shop";
import { ShopComparison } from "./ShopComparison";
import { Shop } from "@/types/shop";
import { useState } from "react";

interface CartItemProps {
  item: Product & { shopName: string };
  shops: Shop[];
  onRemove: (id: string) => void;
}

export const CartItem = ({ item, shops, onRemove }: CartItemProps) => {
  const [currentShop, setCurrentShop] = useState(item.shopName);
  const [currentPrice, setCurrentPrice] = useState(item.price);

  const otherShops = shops.filter((shop) => shop.name !== currentShop);

  const handleShopSelect = (shopName: string, price: number) => {
    setCurrentShop(shopName);
    setCurrentPrice(price);
  };

  return (
    <div className="border rounded-lg p-6 space-y-4 bg-white shadow-sm">
      <div className="flex items-center justify-between border-b pb-4">
        <div>
          <h3 className="text-lg font-semibold">{item.name}</h3>
          <p className="text-sm text-gray-600">from {currentShop}</p>
          <p className="text-xl font-bold mt-2 text-primary">
            ₹{currentPrice.toLocaleString()}
          </p>
        </div>
        <Button variant="outline" onClick={() => onRemove(item.id)}>
          Remove
        </Button>
      </div>
      <ShopComparison
        currentShop={currentShop}
        price={currentPrice}
        otherShops={otherShops}
        productModel={item.model}
        onShopSelect={handleShopSelect}
      />
    </div>
  );
};