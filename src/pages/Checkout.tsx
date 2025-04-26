
import { useState } from "react";
import { useCartStore } from "@/store/cartStore";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { ShoppingBag } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { MultiStepCheckout } from "@/components/checkout/MultiStepCheckout";
import { Helmet } from "react-helmet-async";
import { trackCheckout } from "@/lib/analytics";

const Checkout = () => {
  const { items, cartTotal } = useCartStore();
  const navigate = useNavigate();

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <Helmet>
          <title>Checkout | TechLocator</title>
        </Helmet>
        <div className="max-w-md mx-auto">
          <div className="bg-secondary/30 p-10 rounded-xl mb-6">
            <ShoppingBag className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
            <p className="text-muted-foreground mb-8">Add items to your cart before checkout</p>
          </div>
          <Button onClick={() => navigate("/")}>Continue Shopping</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Helmet>
        <title>Checkout | TechLocator</title>
      </Helmet>
      
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl sm:text-3xl font-bold mb-6 flex items-center">
          <ShoppingBag className="mr-2 h-6 w-6" />
          Checkout
        </h1>
        
        <MultiStepCheckout />
      </div>
    </div>
  );
};

export default Checkout;
