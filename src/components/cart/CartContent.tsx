import { Product, Shop } from "@/types/shop";
import { CartList } from "./CartList";
import { CartSummary } from "./CartSummary";

interface CartContentProps {
  items: (Product & { shopName: string })[];
  shops: Shop[];
  onRemove: (id: string) => void;
  onCheckout: () => void;
}

export const CartContent = ({ items, shops, onRemove, onCheckout }: CartContentProps) => {
  return (
    <div className="flex flex-col lg:flex-row gap-8">
      <div className="flex-1">
        <CartList items={items} shops={shops} onRemove={onRemove} />
      </div>
      {items.length > 0 && (
        <div className="lg:w-80">
          <CartSummary items={items} onCheckout={onCheckout} />
        </div>
      )}
    </div>
  );
};