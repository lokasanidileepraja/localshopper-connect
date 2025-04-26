
import { useState, useEffect } from "react";
import { Gift, X, Copy, Check } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { useFeatureFlagStore } from "@/store/featureFlagStore";

interface SignupCouponModalProps {
  delay?: number;
}

export const SignupCouponModal = ({ delay = 5000 }: SignupCouponModalProps) => {
  const [open, setOpen] = useState(false);
  const [couponCopied, setCouponCopied] = useState(false);
  const [hasSeenCoupon, setHasSeenCoupon] = useLocalStorage("has-seen-signup-coupon", false);
  const [emailOptIn, setEmailOptIn] = useState(false);
  const [smsOptIn, setSmsOptIn] = useState(false);
  const { toast } = useToast();
  const { flags } = useFeatureFlagStore();
  const isEnabled = flags.find(flag => flag.id === "signup-coupons")?.enabled || false;
  
  const COUPON_CODE = "WELCOME5";
  
  useEffect(() => {
    // Show popup after delay only if feature is enabled and user hasn't seen it yet
    if (isEnabled && !hasSeenCoupon) {
      const timer = setTimeout(() => {
        setOpen(true);
      }, delay);
      
      return () => clearTimeout(timer);
    }
  }, [delay, hasSeenCoupon, isEnabled]);
  
  const handleClose = () => {
    setOpen(false);
    setHasSeenCoupon(true);
  };
  
  const handleCopyCoupon = () => {
    navigator.clipboard.writeText(COUPON_CODE);
    setCouponCopied(true);
    
    toast({
      title: "Coupon copied!",
      description: `Use ${COUPON_CODE} at checkout to get 5% off your first purchase.`,
    });
    
    setTimeout(() => {
      setCouponCopied(false);
    }, 2000);
  };
  
  const handleSubmit = () => {
    // In a real app, this would send email/SMS preferences to the server
    toast({
      title: "Preferences saved!",
      description: `You've opted ${emailOptIn ? 'in' : 'out'} of email and ${smsOptIn ? 'in' : 'out'} of SMS notifications.`,
    });
    
    handleClose();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-md overflow-hidden">
        <DialogHeader>
          <button
            onClick={handleClose}
            className="absolute top-2 right-2 h-7 w-7 rounded-full flex items-center justify-center hover:bg-muted transition-colors"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="mx-auto mb-4 w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center"
          >
            <Gift className="h-8 w-8 text-primary" />
          </motion.div>
          <DialogTitle className="text-center text-2xl font-bold">
            Welcome Gift!
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <p className="text-center text-muted-foreground">
            Get 5% off your first purchase when you sign up for price alerts
          </p>
          
          <motion.div
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mx-auto max-w-xs bg-gray-50 dark:bg-gray-900 border-2 border-dashed border-muted rounded-lg p-4 text-center"
          >
            <div className="text-sm text-muted-foreground mb-1">Your coupon code</div>
            <div className="text-2xl font-bold tracking-widest mb-2">{COUPON_CODE}</div>
            <Button
              variant="outline"
              size="sm"
              onClick={handleCopyCoupon}
              className="gap-1.5"
            >
              {couponCopied ? (
                <>
                  <Check className="h-4 w-4" /> Copied
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4" /> Copy code
                </>
              )}
            </Button>
          </motion.div>
          
          <div className="space-y-3 pt-2">
            <h4 className="text-sm font-medium">Get notifications about:</h4>
            
            <div className="flex items-start space-x-2">
              <Checkbox
                id="email-notifications"
                checked={emailOptIn}
                onCheckedChange={(checked) => setEmailOptIn(!!checked)}
              />
              <div className="grid gap-1.5 leading-none">
                <label
                  htmlFor="email-notifications"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Email alerts
                </label>
                <p className="text-sm text-muted-foreground">
                  Price drops and deals on your favorite products
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-2">
              <Checkbox
                id="sms-notifications"
                checked={smsOptIn}
                onCheckedChange={(checked) => setSmsOptIn(!!checked)}
              />
              <div className="grid gap-1.5 leading-none">
                <label
                  htmlFor="sms-notifications"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  SMS alerts
                </label>
                <p className="text-sm text-muted-foreground">
                  Instant notifications about flash deals
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <DialogFooter>
          <Button
            className="w-full"
            onClick={handleSubmit}
          >
            Save & Get My Discount
          </Button>
          <Button
            variant="link"
            className="w-full mt-2"
            onClick={handleClose}
          >
            No thanks
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
