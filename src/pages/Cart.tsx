
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";
import { CartLayout } from "@/components/cart/CartLayout";
import { CartHeader } from "@/components/cart/CartHeader";
import { CartContent } from "@/components/cart/CartContent";
import { ELECTRONICS_SHOPS } from "@/data/shops";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { items, removeFromCart } = useCart();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (items.length === 0) {
      toast({
        title: "Cart is empty",
        description: "Please add items to your cart before checking out.",
        variant: "destructive",
      });
      return;
    }
    
    // Navigate to checkout page
    navigate("/checkout");
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
