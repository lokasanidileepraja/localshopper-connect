import { Helmet } from "react-helmet-async";
import { useCartStore } from "@/store/marketplaceCartStore";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Minus, Plus, Trash2, ShoppingBag, Store, Truck, Package, ArrowRight, Shield, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const CartPage = () => {
  const navigate = useNavigate();
  const { items, storeName, fulfillment, totalItems, cartTotal, setFulfillment, removeFromCart, updateQuantity } = useCartStore();

  const deliveryFee = fulfillment === "delivery" ? (cartTotal > 999 ? 0 : 49) : 0;
  const tax = Math.round(cartTotal * 0.18);
  const finalTotal = cartTotal + deliveryFee + tax;

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] px-8 text-center">
        <Helmet><title>Cart - TechLocator</title></Helmet>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
          className="w-20 h-20 rounded-3xl bg-secondary flex items-center justify-center mb-5"
        >
          <ShoppingBag className="h-9 w-9 text-muted-foreground" />
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
          <h2 className="text-base font-bold text-foreground mb-1.5">Your cart is empty</h2>
          <p className="text-sm text-muted-foreground mb-7">Add items from nearby stores to get started</p>
          <button
            onClick={() => navigate("/home")}
            className="h-12 px-8 rounded-2xl bg-primary text-primary-foreground font-semibold text-sm active:scale-[0.98] transition-transform"
          >
            Browse Products
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="bg-background min-h-screen">
      <Helmet><title>Cart - TechLocator</title></Helmet>

      {/* Page title */}
      <div className="px-4 pt-4 pb-3">
        <h1 className="text-lg font-bold text-foreground">My Cart</h1>
        <p className="text-xs text-muted-foreground">{totalItems} item{totalItems !== 1 ? "s" : ""}</p>
      </div>

      {/* Store Identity Banner */}
      <div className="mx-4 mb-3 flex items-center gap-2.5 px-3.5 py-2.5 rounded-2xl bg-primary/8 border border-primary/20">
        <div className="w-7 h-7 rounded-xl bg-primary/15 flex items-center justify-center shrink-0">
          <Store className="h-3.5 w-3.5 text-primary" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[11px] text-muted-foreground">Ordering from</p>
          <p className="text-xs font-bold text-foreground">{storeName}</p>
        </div>
        <ChevronRight className="h-4 w-4 text-muted-foreground" />
      </div>

      {/* Items */}
      <div className="px-4 space-y-3 mb-3">
        <AnimatePresence>
          {items.map((item) => (
            <motion.div
              key={item.productId}
              layout
              exit={{ opacity: 0, x: -80, height: 0 }}
              className="flex items-center gap-3 p-3 rounded-2xl bg-card border border-border"
            >
              <div className="w-16 h-16 rounded-xl bg-muted overflow-hidden shrink-0">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold text-foreground line-clamp-1">{item.name}</p>
                <p className="text-[10px] text-muted-foreground mt-0.5">{item.variant}</p>
                <p className="text-sm font-bold text-foreground mt-1.5">₹{item.price.toLocaleString("en-IN")}</p>
              </div>
              <div className="flex flex-col items-end gap-2 shrink-0">
                <button
                  onClick={() => removeFromCart(item.productId)}
                  className="p-1.5 rounded-lg active:bg-secondary transition-colors"
                >
                  <Trash2 className="h-3.5 w-3.5 text-muted-foreground" />
                </button>
                <div className="flex items-center gap-1.5 bg-secondary rounded-xl overflow-hidden">
                  <button
                    onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                    disabled={item.quantity <= 1}
                    className="w-7 h-7 flex items-center justify-center active:bg-border transition-colors disabled:opacity-40"
                  >
                    <Minus className="h-3 w-3 text-foreground" />
                  </button>
                  <span className="text-xs font-bold text-foreground w-4 text-center">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                    className="w-7 h-7 flex items-center justify-center active:bg-border transition-colors"
                  >
                    <Plus className="h-3 w-3 text-foreground" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Fulfillment Toggle */}
      <div className="px-4 mb-3">
        <p className="text-xs font-bold text-foreground mb-2">Delivery Method</p>
        <div className="flex gap-2">
          {[
            { key: "delivery" as const, icon: Truck, label: "Home Delivery", sub: "Today, 4–6 PM" },
            { key: "pickup" as const, icon: Package, label: "Store Pickup", sub: "Ready in 30 mins" },
          ].map((opt) => (
            <button
              key={opt.key}
              onClick={() => setFulfillment(opt.key)}
              className={cn(
                "flex-1 flex flex-col items-center gap-1.5 py-3.5 rounded-2xl border text-xs font-medium transition-all",
                fulfillment === opt.key
                  ? "bg-primary/8 border-primary"
                  : "bg-card border-border"
              )}
            >
              <opt.icon className={cn("h-5 w-5", fulfillment === opt.key ? "text-primary" : "text-muted-foreground")} />
              <p className={cn("font-bold text-[11px]", fulfillment === opt.key ? "text-primary" : "text-foreground")}>
                {opt.label}
              </p>
              <p className={cn("text-[10px]", fulfillment === opt.key ? "text-primary/70" : "text-muted-foreground")}>
                {opt.sub}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Pricing Summary */}
      <div className="px-4 mb-24">
        <div className="p-4 rounded-2xl bg-card border border-border">
          <p className="text-xs font-bold text-foreground mb-3">Price Details</p>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-xs text-muted-foreground">Item Total ({totalItems})</span>
              <span className="text-xs text-foreground font-medium">₹{cartTotal.toLocaleString("en-IN")}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-xs text-muted-foreground">
                {fulfillment === "delivery" ? "Delivery Fee" : "Pickup"}
              </span>
              <span className={cn("text-xs font-medium", deliveryFee === 0 ? "text-green-600" : "text-foreground")}>
                {deliveryFee === 0 ? "FREE" : `₹${deliveryFee}`}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-xs text-muted-foreground">GST (18%)</span>
              <span className="text-xs text-foreground font-medium">₹{tax.toLocaleString("en-IN")}</span>
            </div>
            <div className="h-px bg-border my-1" />
            <div className="flex justify-between">
              <span className="text-sm font-bold text-foreground">Total Payable</span>
              <span className="text-sm font-bold text-foreground">₹{finalTotal.toLocaleString("en-IN")}</span>
            </div>
          </div>
          <div className="mt-3 flex items-center gap-1.5 text-[10px] text-muted-foreground">
            <Shield className="h-3 w-3 text-green-600 shrink-0" />
            <span>No platform fees · No hidden charges</span>
          </div>
        </div>
      </div>

      {/* Sticky Checkout */}
      <div className="fixed bottom-14 left-0 right-0 z-40 px-4 pb-3 pt-2.5 bg-background/95 backdrop-blur-xl border-t border-border">
        <button
          onClick={() => navigate("/checkout")}
          className="w-full h-13 py-3.5 rounded-2xl bg-primary text-primary-foreground font-bold text-sm flex items-center justify-between px-5 active:scale-[0.99] transition-transform"
        >
          <span>Proceed to Checkout</span>
          <div className="flex items-center gap-1.5">
            <span className="font-bold">₹{finalTotal.toLocaleString("en-IN")}</span>
            <ArrowRight className="h-4 w-4" />
          </div>
        </button>
      </div>
    </div>
  );
};

export default CartPage;
