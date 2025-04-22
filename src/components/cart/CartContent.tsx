
import { Shop } from "@/types/shop";
import { CartList } from "./CartList";
import { CartSummary } from "./CartSummary";
import { useCartStore } from "@/store/cartStore";

interface CartContentProps {
  shops: Shop[];
  onRemove: (id: string) => void;
  onCheckout: () => void;
}

export const CartContent = ({ shops, onRemove, onCheckout }: CartContentProps) => {
  const { items } = useCartStore();

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      <div className="flex-1">
        <CartList shops={shops} onRemove={onRemove} />
      </div>
      {items.length > 0 && (
        <div className="lg:w-80">
          <CartSummary onCheckout={onCheckout} />
        </div>
      )}
    </div>
  );
};
