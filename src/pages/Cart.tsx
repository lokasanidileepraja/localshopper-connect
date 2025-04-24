
import { useToast } from "@/hooks/use-toast";
import { CartLayout } from "@/components/cart/CartLayout";
import { CartHeader } from "@/components/cart/CartHeader";
import { CartContent } from "@/components/cart/CartContent";
import { ELECTRONICS_SHOPS } from "@/data/shops";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useCartStore } from "@/store/cartStore";

const Cart = () => {
  const { items, removeFromCart, totalItems } = useCartStore();
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Cart items:", items);
    console.log("Total items in cart:", totalItems);
  }, [items, totalItems]);

  const handleCheckout = () => {
    if (items.length === 0) {
      toast({
        title: "Cart is empty",
        description: "Please add items to your cart before checking out.",
        variant: "destructive",
      });
      return;
    }
    navigate("/checkout");
  };

  const handleRemoveItem = (id: string) => {
    removeFromCart(id);
    toast({
      title: "Item removed",
      description: "The item has been removed from your cart.",
    });
  };

  return (
    <CartLayout>
      <CartHeader />
      <CartContent 
        shops={ELECTRONICS_SHOPS}
        onRemove={handleRemoveItem}
        onCheckout={handleCheckout}
      />
    </CartLayout>
  );
};

export default Cart;
