
import { Button } from "@/components/ui/button";
import { Product } from "@/types/shop";
import { ShopComparison } from "./ShopComparison";
import { Shop } from "@/types/shop";
import { useState, useEffect } from "react";
import { useCartStore } from "@/store/cartStore";
import { MinusCircle, PlusCircle } from "lucide-react";

interface CartItemWithShop extends Product {
  shopName: string;
  currentPrice: number;
  quantity: number;
}

interface CartItemProps {
  item: CartItemWithShop;
  shops: Shop[];
  onRemove: (id: string) => void;
}

export const CartItem = ({ item, shops, onRemove }: CartItemProps) => {
  const [currentShop, setCurrentShop] = useState(item.shopName);
  const { updateItemPrice, updateItemQuantity } = useCartStore();
  const [currentPrice, setCurrentPrice] = useState(item.currentPrice);
  const [quantity, setQuantity] = useState(item.quantity || 1);

  const otherShops = shops.filter((shop) => shop.name !== currentShop);

  useEffect(() => {
    console.log("CartItem rendered with:", item);
    setQuantity(item.quantity || 1);
  }, [item]);

  const handleShopSelect = (shopName: string, price: number) => {
    setCurrentShop(shopName);
    setCurrentPrice(price);
    updateItemPrice(item.id, price);
  };

  const handleIncreaseQuantity = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    updateItemQuantity(item.id, newQuantity);
  };

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      updateItemQuantity(item.id, newQuantity);
    }
  };

  return (
    <div className="border rounded-lg p-6 space-y-4 bg-white shadow-sm">
      <div className="flex items-center justify-between border-b pb-4">
        <div>
          <h3 className="text-lg font-semibold">{item.name}</h3>
          <p className="text-sm text-gray-600">from {currentShop}</p>
          <div className="flex items-center mt-2">
            <Button 
              variant="outline" 
              size="icon" 
              className="h-8 w-8 rounded-full"
              onClick={handleDecreaseQuantity}
            >
              <MinusCircle className="h-4 w-4" />
            </Button>
            <span className="mx-3 font-medium">{quantity}</span>
            <Button 
              variant="outline" 
              size="icon" 
              className="h-8 w-8 rounded-full"
              onClick={handleIncreaseQuantity}
            >
              <PlusCircle className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-xl font-bold mt-2 text-primary">
            ₹{(currentPrice * quantity).toLocaleString()}
            {quantity > 1 && (
              <span className="text-sm text-muted-foreground ml-2">
                (₹{currentPrice.toLocaleString()} each)
              </span>
            )}
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
