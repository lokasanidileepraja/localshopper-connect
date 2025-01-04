import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";
import { CartLayout } from "@/components/cart/CartLayout";
import { CartHeader } from "@/components/cart/CartHeader";
import { CartContent } from "@/components/cart/CartContent";
import { ELECTRONICS_SHOPS } from "@/data/shops";

const Cart = () => {
  const { items, removeFromCart } = useCart();
  const { toast } = useToast();

  const handleCheckout = () => {
    toast({
      title: "Proceeding to checkout",
      description: "Redirecting to checkout page...",
    });
  };

  return (
    <CartLayout>
      <CartHeader />
      <CartContent 
        items={items}
        shops={ELECTRONICS_SHOPS}
        onRemove={removeFromCart}
        onCheckout={handleCheckout}
      />
    </CartLayout>
  );
};

export default Cart;