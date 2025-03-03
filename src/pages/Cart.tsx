
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";
import { CartLayout } from "@/components/cart/CartLayout";
import { CartHeader } from "@/components/cart/CartHeader";
import { CartContent } from "@/components/cart/CartContent";
import { ELECTRONICS_SHOPS } from "@/data/shops";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Cart = () => {
  const { items, removeFromCart, totalItems } = useCart();
  const { toast } = useToast();
  const navigate = useNavigate();

  // Check if cart is empty when component mounts
  useEffect(() => {
    if (items.length === 0) {
      console.log("Cart is empty");
    } else {
      console.log(`Cart has ${items.length} items`);
    }
  }, [items]);

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
        items={items}
        shops={ELECTRONICS_SHOPS}
        onRemove={handleRemoveItem}
        onCheckout={handleCheckout}
      />
    </CartLayout>
  );
};

export default Cart;
