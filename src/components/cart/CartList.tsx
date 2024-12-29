import { CartItem } from "@/components/CartItem";
import { Product, Shop } from "@/types/shop";

interface CartListProps {
  items: (Product & { shopName: string })[];
  shops: Shop[];
  onRemove: (id: string) => void;
}

export const CartList = ({ items, shops, onRemove }: CartListProps) => {
  if (items.length === 0) {
    return (
      <div className="text-center py-8">
        <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
        <p className="text-gray-600">Start shopping to add items to your cart</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {items.map((item) => (
        <CartItem
          key={item.id}
          item={item}
          shops={shops}
          onRemove={onRemove}
        />
      ))}
    </div>
  );
};