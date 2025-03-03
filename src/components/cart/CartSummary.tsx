
import { Button } from "@/components/ui/button";
import { Product } from "@/types/shop";
import { useCart } from "@/contexts/CartContext";
import { ShoppingBag, CreditCard, ArrowRight } from "lucide-react";
import { Separator } from "@/components/ui/separator";

interface CartSummaryProps {
  items: (Product & { shopName: string; currentPrice?: number })[];
  onCheckout: () => void;
}

export const CartSummary = ({ onCheckout }: CartSummaryProps) => {
  const { items: cartItems, cartTotal } = useCart();
  
  // Calculate taxes and shipping
  const tax = Math.round(cartTotal * 0.18); // 18% tax
  const shipping = cartTotal > 0 ? (cartTotal > 10000 ? 0 : 99) : 0;
  const finalTotal = cartTotal + tax + shipping;

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border sticky top-8">
      <h2 className="text-lg font-semibold mb-4 flex items-center">
        <ShoppingBag className="h-5 w-5 mr-2" />
        Order Summary
      </h2>
      <div className="space-y-2 mb-4">
        {cartItems.map((item) => (
          <div key={item.id} className="flex justify-between text-sm">
            <span className="truncate max-w-[70%]">{item.name}</span>
            <span className="font-medium">₹{item.currentPrice.toLocaleString()}</span>
          </div>
        ))}
      </div>
      
      <Separator className="my-4" />
      
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>Subtotal</span>
          <span>₹{cartTotal.toLocaleString()}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span>Tax (18%)</span>
          <span>₹{tax.toLocaleString()}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span>Shipping</span>
          <span>{shipping > 0 ? `₹${shipping}` : "Free"}</span>
        </div>
      </div>
      
      <Separator className="my-4" />
      
      <div className="flex justify-between font-semibold mb-6">
        <span>Total</span>
        <span>₹{finalTotal.toLocaleString()}</span>
      </div>
      
      {shipping === 0 && cartTotal > 0 && (
        <div className="bg-green-50 text-green-700 text-sm p-2 rounded-md mb-4 text-center">
          Free shipping applied!
        </div>
      )}
      
      <Button className="w-full" onClick={onCheckout} disabled={cartItems.length === 0}>
        <CreditCard className="h-4 w-4 mr-2" />
        Proceed to Checkout
        <ArrowRight className="h-4 w-4 ml-2" />
      </Button>
      
      {cartItems.length === 0 && (
        <p className="text-center text-sm text-gray-500 mt-4">
          Your cart is empty. Add items to proceed.
        </p>
      )}
    </div>
  );
};
