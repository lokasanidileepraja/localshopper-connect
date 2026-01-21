import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cartStore";
import { ShoppingBag, CreditCard, ArrowRight, Tag, Truck, ShieldCheck, Check, Clock, Sparkles } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface CartSummaryProps {
  onCheckout: () => void;
}

export const CartSummary = ({ onCheckout }: CartSummaryProps) => {
  const { items, cartTotal } = useCartStore();
  
  // Calculate taxes and shipping
  const tax = Math.round(cartTotal * 0.18);
  const shipping = cartTotal > 0 ? (cartTotal > 10000 ? 0 : 99) : 0;
  const finalTotal = cartTotal + tax + shipping;
  const freeShippingThreshold = 10000;
  const progressToFreeShipping = Math.min((cartTotal / freeShippingThreshold) * 100, 100);

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-background p-6 rounded-xl shadow-sm border sticky top-24"
    >
      <h2 className="text-lg font-semibold mb-4 flex items-center">
        <ShoppingBag className="h-5 w-5 mr-2 text-primary" />
        Order Summary
      </h2>
      
      {/* Items List */}
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

      {/* Free Shipping Progress */}
      {cartTotal > 0 && cartTotal < freeShippingThreshold && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4 p-3 rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900"
        >
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="text-amber-700 dark:text-amber-400 font-medium flex items-center gap-1.5">
              <Truck className="h-4 w-4" />
              Add ₹{(freeShippingThreshold - cartTotal).toLocaleString()} for free shipping
            </span>
          </div>
          <div className="h-2 bg-amber-200 dark:bg-amber-900 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progressToFreeShipping}%` }}
              transition={{ duration: 0.5 }}
              className="h-full bg-gradient-to-r from-amber-400 to-amber-500 rounded-full"
            />
          </div>
        </motion.div>
      )}
      
      {/* Price Breakdown */}
      <div className="space-y-3 bg-muted/30 p-4 rounded-lg mb-4">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Subtotal</span>
          <span className="font-medium">₹{cartTotal.toLocaleString()}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground flex items-center gap-1.5">
            <Tag className="h-3.5 w-3.5" />
            Tax (18%)
          </span>
          <span className="font-medium">₹{tax.toLocaleString()}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground flex items-center gap-1.5">
            <Truck className="h-3.5 w-3.5" />
            Shipping
          </span>
          <span className={cn("font-medium", shipping === 0 && "text-green-600")}>
            {shipping > 0 ? `₹${shipping}` : "Free"}
          </span>
        </div>
      </div>

      {/* Total */}
      <div className="flex justify-between items-center mb-6">
        <span className="text-lg font-semibold">Total</span>
        <div className="text-right">
          <span className="text-2xl font-bold text-primary">₹{finalTotal.toLocaleString()}</span>
        </div>
      </div>
      
      {/* Success Message */}
      <AnimatePresence>
        {shipping === 0 && cartTotal > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-green-50 dark:bg-green-950/30 text-green-700 dark:text-green-400 text-sm p-3 rounded-lg mb-4 flex items-center gap-2 border border-green-200 dark:border-green-900"
          >
            <Check className="h-4 w-4 flex-shrink-0" />
            <span className="font-medium">Free shipping applied!</span>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Checkout Button */}
      <Button 
        className="w-full rounded-full py-6 text-base font-semibold shadow-lg hover:shadow-xl transition-shadow" 
        onClick={onCheckout} 
        disabled={items.length === 0}
      >
        <CreditCard className="h-5 w-5 mr-2" />
        Proceed to Checkout
        <ArrowRight className="h-5 w-5 ml-2" />
      </Button>

      {/* Trust Indicators */}
      {items.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-4 pt-4 border-t border-dashed space-y-2"
        >
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <ShieldCheck className="h-4 w-4 text-green-600" />
            <span>Secure 256-bit SSL payment</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="h-4 w-4 text-blue-600" />
            <span>Same-day pickup available</span>
          </div>
        </motion.div>
      )}
      
      {items.length === 0 && (
        <div className="text-center mt-4 p-4 rounded-lg bg-muted/30">
          <Sparkles className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
          <p className="text-sm text-muted-foreground">
            Your cart is empty. Add items to proceed.
          </p>
        </div>
      )}
    </motion.div>
  );
};

