import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ShoppingCart, ArrowRight, Check, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface StickyActionBarProps {
  show: boolean;
  productName?: string;
  price: number;
  originalPrice?: number;
  onAddToCart: () => void;
  onBuyNow?: () => void;
  inStock?: boolean;
  className?: string;
}

export const StickyActionBar = ({
  show,
  productName,
  price,
  originalPrice,
  onAddToCart,
  onBuyNow,
  inStock = true,
  className,
}: StickyActionBarProps) => {
  const discount = originalPrice ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className={cn(
            "fixed bottom-0 left-0 right-0 z-40 md:hidden",
            "bg-background/95 backdrop-blur-xl border-t border-border",
            "pb-safe px-4 py-3",
            className
          )}
        >
          <div className="flex items-center justify-between gap-4">
            {/* Price Info */}
            <div className="flex flex-col">
              <div className="flex items-baseline gap-2">
                <span className="text-xl font-bold text-foreground">
                  ₹{price.toLocaleString()}
                </span>
                {originalPrice && (
                  <span className="text-sm text-muted-foreground line-through">
                    ₹{originalPrice.toLocaleString()}
                  </span>
                )}
              </div>
              {discount > 0 && (
                <span className="text-xs text-green-600 font-medium flex items-center gap-1">
                  <Sparkles className="h-3 w-3" />
                  Save {discount}%
                </span>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={onAddToCart}
                disabled={!inStock}
                className="h-11 w-11 rounded-full"
              >
                <ShoppingCart className="h-5 w-5" />
              </Button>
              
              {onBuyNow && (
                <Button
                  onClick={onBuyNow}
                  disabled={!inStock}
                  className="h-11 px-6 rounded-full font-medium"
                >
                  Buy Now
                  <ArrowRight className="h-4 w-4 ml-1" />
                </Button>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

interface FloatingCartButtonProps {
  itemCount: number;
  total: number;
  onClick: () => void;
  show: boolean;
  className?: string;
}

export const FloatingCartButton = ({
  itemCount,
  total,
  onClick,
  show,
  className,
}: FloatingCartButtonProps) => {
  return (
    <AnimatePresence>
      {show && itemCount > 0 && (
        <motion.button
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onClick}
          className={cn(
            "fixed bottom-20 right-4 z-40",
            "flex items-center gap-3 px-4 py-3 rounded-full",
            "bg-primary text-primary-foreground shadow-lg",
            "hover:shadow-xl transition-shadow",
            className
          )}
        >
          <div className="relative">
            <ShoppingCart className="h-5 w-5" />
            <span className="absolute -top-2 -right-2 w-5 h-5 bg-white text-primary text-xs font-bold rounded-full flex items-center justify-center">
              {itemCount > 9 ? "9+" : itemCount}
            </span>
          </div>
          <span className="font-semibold">₹{total.toLocaleString()}</span>
          <ArrowRight className="h-4 w-4" />
        </motion.button>
      )}
    </AnimatePresence>
  );
};
