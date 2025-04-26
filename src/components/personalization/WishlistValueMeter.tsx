
import { Wallet } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";
import { useState, useEffect } from "react";
import { formatCurrency } from "@/lib/formatters";
import { useFeatureFlagStore } from "@/store/featureFlagStore";

interface WishlistItem {
  id: string;
  name: string;
  price: number;
  image: string;
}

interface WishlistValueMeterProps {
  items: WishlistItem[];
  target?: number;
  className?: string;
  variant?: "inline" | "card";
}

export const WishlistValueMeter = ({
  items,
  target = 10000,
  className,
  variant = "card"
}: WishlistValueMeterProps) => {
  const [progressValue, setProgressValue] = useState(0);
  const { flags } = useFeatureFlagStore();
  const isEnabled = flags.find(flag => flag.id === "wishlist-value-meter")?.enabled || false;
  
  // Don't render if feature is disabled
  if (!isEnabled) {
    return null;
  }
  
  const totalValue = items.reduce((sum, item) => sum + item.price, 0);
  const percentage = Math.min(100, (totalValue / target) * 100);
  
  useEffect(() => {
    // Animate progress
    const timer = setTimeout(() => {
      setProgressValue(percentage);
    }, 100);
    
    return () => clearTimeout(timer);
  }, [percentage]);
  
  if (variant === "inline") {
    return (
      <div className={cn("flex items-center gap-2", className)}>
        <Wallet className="h-4 w-4 text-primary" />
        <div className="flex-1">
          <div className="flex justify-between items-center text-xs mb-1">
            <span className="font-medium">Wishlist Value</span>
            <span>{formatCurrency(totalValue)}</span>
          </div>
          <Progress value={progressValue} className="h-1.5" />
        </div>
      </div>
    );
  }
  
  return (
    <Card className={className}>
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Wallet className="h-5 w-5 text-primary" />
            <h3 className="font-medium">Your Wishlist Value</h3>
          </div>
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="text-lg font-bold"
          >
            {formatCurrency(totalValue)}
          </motion.div>
        </div>
        
        <div className="space-y-2">
          <Progress value={progressValue} className="h-2" />
          <div className="flex justify-between items-center text-xs text-muted-foreground">
            <span>₹0</span>
            <span>{formatCurrency(target)}</span>
          </div>
          {percentage >= 100 && (
            <motion.div 
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-400 text-sm p-2 rounded-lg text-center"
            >
              Target reached! You can qualify for premium rewards.
            </motion.div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
