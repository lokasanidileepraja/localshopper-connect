
import { ShoppingCart, Timer, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { useCartStore } from "@/store/cartStore";
import { formatCurrency } from "@/lib/formatters";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useFeatureFlagStore } from "@/store/featureFlagStore";

interface SavedCartReminderProps {
  className?: string;
}

export const SavedCartReminder = ({ className }: SavedCartReminderProps) => {
  const [visible, setVisible] = useState(false);
  const [hasCoupon, setHasCoupon] = useState(false);
  const { items, cartTotal } = useCartStore();
  const { toast } = useToast();
  const navigate = useNavigate();
  const { flags } = useFeatureFlagStore();
  const isEnabled = flags.find(flag => flag.id === "saved-cart-reminders")?.enabled || false;
  
  // Don't render if feature is disabled
  if (!isEnabled) {
    return null;
  }
  
  useEffect(() => {
    // Check if cart has items older than 24h
    // In a real app, would check timestamps of cart items
    const hasOldItems = items.length > 0;
    // For demo purposes, automatically show the banner if cart has items
    if (hasOldItems) {
      const timer = setTimeout(() => {
        setVisible(true);
        // 50% chance to show coupon
        setHasCoupon(Math.random() > 0.5);
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, [items]);
  
  const handleCheckoutClick = () => {
    if (hasCoupon) {
      toast({
        title: "5% Discount Applied!",
        description: "Your cart has been updated with the special discount.",
      });
    }
    navigate("/cart");
  };
  
  const handleDismiss = () => {
    setVisible(false);
  };
  
  // Don't render if no items or banner not visible
  if (items.length === 0 || !visible) {
    return null;
  }
  
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className={className}
        >
          <div className="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg p-3 sm:p-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="bg-blue-100 dark:bg-blue-900 p-2 rounded-full">
                  <ShoppingCart className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h4 className="font-semibold text-blue-900 dark:text-blue-300">
                    Items waiting in your cart
                  </h4>
                  <div className="flex items-center gap-2 text-sm text-blue-700 dark:text-blue-400">
                    <Timer className="h-3.5 w-3.5" />
                    <span>Added 24+ hours ago</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-2 w-full sm:w-auto">
                {hasCoupon && (
                  <motion.div 
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.3, delay: 0.2 }}
                    className="flex items-center gap-1 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-400 px-2 py-1 rounded-md text-xs font-medium"
                  >
                    <Tag className="h-3 w-3" />
                    5% OFF
                  </motion.div>
                )}
                <Button 
                  size="sm"
                  onClick={handleCheckoutClick}
                  className="flex-1 sm:flex-initial"
                >
                  Checkout ({formatCurrency(cartTotal)})
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={handleDismiss}
                  className="sm:px-2"
                >
                  Dismiss
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
