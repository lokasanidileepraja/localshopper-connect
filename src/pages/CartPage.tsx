import { Helmet } from "react-helmet-async";
import { useCartStore } from "@/store/marketplaceCartStore";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Minus, Plus, Trash2, ShoppingCart, Store, Truck, Package, ArrowRight, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const CartPage = () => {
  const navigate = useNavigate();
  const { items, storeId, storeName, fulfillment, totalItems, cartTotal, setFulfillment, removeFromCart, updateQuantity, clearCart } = useCartStore();

  const deliveryFee = fulfillment === "delivery" ? (cartTotal > 999 ? 0 : 49) : 0;
  const tax = Math.round(cartTotal * 0.18);
  const finalTotal = cartTotal + deliveryFee + tax;

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-8 text-center">
        <Helmet><title>Cart - TechLocator</title></Helmet>
        <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
          <ShoppingCart className="h-7 w-7 text-muted-foreground" />
        </div>
        <h2 className="text-lg font-bold text-foreground mb-1">Your cart is empty</h2>
        <p className="text-sm text-muted-foreground mb-6">Add items from nearby stores to get started</p>
        <Button onClick={() => navigate("/home")} className="rounded-full">
          Browse Products
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-background min-h-screen pb-48">
      <Helmet><title>Cart - TechLocator</title></Helmet>

      {/* Store Identity */}
      <div className="px-4 py-3 border-b border-border">
        <div className="flex items-center gap-2">
          <Store className="h-4 w-4 text-primary" />
          <span className="text-sm font-semibold text-foreground">{storeName}</span>
        </div>
      </div>

      {/* Items */}
      <div className="px-4 py-3 space-y-3">
        <AnimatePresence>
          {items.map((item) => (
            <motion.div
              key={item.productId}
              layout
              exit={{ opacity: 0, x: -100 }}
              className="flex items-center gap-3 p-3 rounded-xl bg-card border border-border"
            >
              <div className="w-16 h-16 rounded-lg bg-muted overflow-hidden shrink-0">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-foreground line-clamp-1">{item.name}</p>
                <p className="text-[10px] text-muted-foreground">{item.variant}</p>
                <p className="text-sm font-bold text-foreground mt-1">₹{item.price.toLocaleString("en-IN")}</p>
              </div>
              <div className="flex flex-col items-end gap-2">
                <button onClick={() => removeFromCart(item.productId)} className="p-1">
                  <Trash2 className="h-4 w-4 text-muted-foreground" />
                </button>
                <div className="flex items-center gap-2 bg-secondary rounded-lg">
                  <button onClick={() => updateQuantity(item.productId, item.quantity - 1)} className="p-1.5" disabled={item.quantity <= 1}>
                    <Minus className="h-3.5 w-3.5 text-foreground" />
                  </button>
                  <span className="text-xs font-semibold text-foreground w-4 text-center">{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.productId, item.quantity + 1)} className="p-1.5">
                    <Plus className="h-3.5 w-3.5 text-foreground" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Fulfillment Toggle */}
      <div className="px-4 py-3">
        <p className="text-xs font-semibold text-foreground mb-2">Fulfillment</p>
        <div className="flex gap-2">
          <button
            onClick={() => setFulfillment("delivery")}
            className={cn(
              "flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border text-xs font-medium transition-colors",
              fulfillment === "delivery"
                ? "bg-primary/10 border-primary text-primary"
                : "bg-card border-border text-muted-foreground"
            )}
          >
            <Truck className="h-4 w-4" />
            <div className="text-left">
              <p className="font-semibold">Home Delivery</p>
              <p className="text-[10px] opacity-70">Today, 4-6 PM</p>
            </div>
          </button>
          <button
            onClick={() => setFulfillment("pickup")}
            className={cn(
              "flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border text-xs font-medium transition-colors",
              fulfillment === "pickup"
                ? "bg-primary/10 border-primary text-primary"
                : "bg-card border-border text-muted-foreground"
            )}
          >
            <Package className="h-4 w-4" />
            <div className="text-left">
              <p className="font-semibold">Store Pickup</p>
              <p className="text-[10px] opacity-70">Ready in 30 mins</p>
            </div>
          </button>
        </div>
      </div>

      {/* Pricing Summary */}
      <div className="px-4 py-3">
        <div className="p-4 rounded-xl bg-card border border-border space-y-2">
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Item Total ({totalItems} items)</span>
            <span>₹{cartTotal.toLocaleString("en-IN")}</span>
          </div>
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>{fulfillment === "delivery" ? "Delivery Fee" : "Pickup Fee"}</span>
            <span className={deliveryFee === 0 ? "text-green-600 font-medium" : ""}>
              {deliveryFee === 0 ? "FREE" : `₹${deliveryFee}`}
            </span>
          </div>
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Tax (GST)</span>
            <span>₹{tax.toLocaleString("en-IN")}</span>
          </div>
          <div className="h-px bg-border" />
          <div className="flex justify-between text-sm font-bold text-foreground">
            <span>Total</span>
            <span>₹{finalTotal.toLocaleString("en-IN")}</span>
          </div>
          <p className="text-[10px] text-muted-foreground flex items-center gap-1">
            <Shield className="h-3 w-3" /> No platform fees · No hidden charges
          </p>
        </div>
      </div>

      {/* Sticky Checkout Button */}
      <div className="fixed bottom-14 left-0 right-0 z-40 px-4 pb-3 pt-2 bg-background/95 backdrop-blur-md border-t border-border">
        <Button
          className="w-full h-12 rounded-xl text-sm font-semibold"
          onClick={() => navigate("/checkout")}
        >
          Proceed to Checkout · ₹{finalTotal.toLocaleString("en-IN")}
          <ArrowRight className="h-4 w-4 ml-2" />
        </Button>
      </div>
    </div>
  );
};

export default CartPage;
