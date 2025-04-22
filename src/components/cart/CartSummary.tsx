
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cartStore";
import { ShoppingBag, CreditCard, ArrowRight, Tag, Truck } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { motion } from "framer-motion";

interface CartSummaryProps {
  onCheckout: () => void;
}

export const CartSummary = ({ onCheckout }: CartSummaryProps) => {
  const { items, cartTotal } = useCartStore();
  
  // Calculate taxes and shipping
  const tax = Math.round(cartTotal * 0.18); // 18% tax
  const shipping = cartTotal > 0 ? (cartTotal > 10000 ? 0 : 99) : 0;
  const finalTotal = cartTotal + tax + shipping;

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white p-6 rounded-xl shadow-sm border sticky top-24"
    >
      <h2 className="text-lg font-semibold mb-4 flex items-center">
        <ShoppingBag className="h-5 w-5 mr-2 text-primary" />
        Order Summary
      </h2>
      
      {items.length > 0 && (
        <div className="max-h-60 overflow-y-auto scrollbar-hide mb-4">
          {items.map((item) => (
            <div key={item.id} className="flex justify-between text-sm py-2 border-b border-dashed">
              <div className="flex items-start gap-2">
                <span className="bg-secondary h-5 w-5 rounded-full flex items-center justify-center text-xs">
                  {item.quantity || 1}
                </span>
                <span className="truncate max-w-[70%]">{item.name}</span>
              </div>
              <span className="font-medium">₹{item.currentPrice?.toLocaleString()}</span>
            </div>
          ))}
        </div>
      )}
      
      <div className="space-y-3 bg-secondary/20 p-3 rounded-lg mb-4">
        <div className="flex justify-between text-sm">
          <span>Subtotal</span>
          <span>₹{cartTotal.toLocaleString()}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="flex items-center gap-1">
            <Tag className="h-3 w-3" />
            Tax (18%)
          </span>
          <span>₹{tax.toLocaleString()}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="flex items-center gap-1">
            <Truck className="h-3 w-3" />
            Shipping
          </span>
          <span>{shipping > 0 ? `₹${shipping}` : "Free"}</span>
        </div>
      </div>
      
      <div className="flex justify-between font-semibold mb-6 text-lg">
        <span>Total</span>
        <span className="text-primary">₹{finalTotal.toLocaleString()}</span>
      </div>
      
      {shipping === 0 && cartTotal > 0 && (
        <div className="bg-green-50 text-green-700 text-sm p-3 rounded-lg mb-4 flex items-center gap-2">
          <Truck className="h-4 w-4" />
          <span>Free shipping applied!</span>
        </div>
      )}
      
      <Button 
        className="w-full rounded-full py-6" 
        onClick={onCheckout} 
        disabled={items.length === 0}
      >
        <CreditCard className="h-4 w-4 mr-2" />
        Proceed to Checkout
        <ArrowRight className="h-4 w-4 ml-2" />
      </Button>
      
      {items.length === 0 && (
        <p className="text-center text-sm text-muted-foreground mt-4">
          Your cart is empty. Add items to proceed.
        </p>
      )}
    </motion.div>
  );
};
