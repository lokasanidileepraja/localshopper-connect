
import { useState, useEffect } from "react";
import { Gift, PartyPopper, X, Copy, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useFeatureFlagStore } from "@/store/featureFlagStore";

interface ThankYouVoucherProps {
  orderId: string;
  customerName?: string;
  triggerProbability?: number; // 0-1 probability of showing voucher
}

export const ThankYouVoucher = ({
  orderId,
  customerName = "there",
  triggerProbability = 0.7 // 70% chance by default
}: ThankYouVoucherProps) => {
  const [show, setShow] = useState(false);
  const [couponCopied, setCouponCopied] = useState(false);
  const { toast } = useToast();
  const { flags } = useFeatureFlagStore();
  const isEnabled = flags.find(flag => flag.id === "thank-you-vouchers")?.enabled || false;
  
  const DISCOUNT_AMOUNT = 100; // ₹100 off
  const COUPON_CODE = `THANKS${Math.floor(Math.random() * 1000)}`;
  
  useEffect(() => {
    // Randomly decide whether to show voucher based on probability
    // But only if feature flag is enabled
    if (isEnabled) {
      const shouldShow = Math.random() < triggerProbability;
      
      if (shouldShow) {
        // Delay to create surprise effect after checkout
        const timer = setTimeout(() => {
          setShow(true);
        }, 1500);
        
        return () => clearTimeout(timer);
      }
    }
  }, [triggerProbability, isEnabled]);
  
  const handleClose = () => {
    setShow(false);
  };
  
  const handleCopyCoupon = () => {
    navigator.clipboard.writeText(COUPON_CODE);
    setCouponCopied(true);
    
    toast({
      title: "Coupon copied!",
      description: `Use ${COUPON_CODE} on your next order to get ₹${DISCOUNT_AMOUNT} off.`,
    });
    
    setTimeout(() => {
      setCouponCopied(false);
    }, 2000);
  };

  if (!show) {
    return null;
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.4 }}
        className="fixed bottom-4 right-4 max-w-sm bg-white dark:bg-gray-900 rounded-lg shadow-lg border overflow-hidden z-50"
      >
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-3 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <PartyPopper className="h-5 w-5 text-white" />
            <h3 className="font-semibold text-white">Surprise Gift!</h3>
          </div>
          <button
            onClick={handleClose}
            className="text-white/80 hover:text-white transition-colors"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        
        <div className="p-4">
          <div className="flex items-start gap-4">
            <div className="bg-purple-100 dark:bg-purple-900 p-2 rounded-full">
              <Gift className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            </div>
            
            <div>
              <h4 className="font-semibold mb-1">Thanks for your order, {customerName}!</h4>
              <p className="text-sm text-muted-foreground mb-3">
                Here's a surprise ₹{DISCOUNT_AMOUNT} voucher for your next purchase.
              </p>
              
              <div className="bg-gray-50 dark:bg-gray-950 border rounded p-2 mb-4 flex items-center justify-between">
                <span className="font-mono font-bold">{COUPON_CODE}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleCopyCoupon}
                  className="h-8 gap-1"
                >
                  {couponCopied ? (
                    <>
                      <Check className="h-3 w-3" /> Copied
                    </>
                  ) : (
                    <>
                      <Copy className="h-3 w-3" /> Copy
                    </>
                  )}
                </Button>
              </div>
              
              <div className="text-xs text-muted-foreground">
                Valid for 30 days. No minimum order value.
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
