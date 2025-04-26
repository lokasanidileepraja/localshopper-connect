
import { useEffect, useState } from "react";
import { Timer } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { useFeatureFlagStore } from "@/store/featureFlagStore";

interface FlashDealTimerProps {
  endTime: Date;
  productId: string;
  productName: string;
  discount: number;
  originalPrice: number;
  className?: string;
  variant?: "inline" | "card";
  onTimeEnd?: () => void;
}

export const FlashDealTimer = ({
  endTime,
  productId,
  productName,
  discount,
  originalPrice,
  className,
  variant = "inline",
  onTimeEnd
}: FlashDealTimerProps) => {
  const [timeLeft, setTimeLeft] = useState<{
    hours: number;
    minutes: number;
    seconds: number;
  }>({ hours: 0, minutes: 0, seconds: 0 });
  
  const [isExpired, setIsExpired] = useState(false);
  const { flags } = useFeatureFlagStore();
  const flashDealsEnabled = flags.find(flag => flag.id === "flash-deals")?.enabled || false;

  // Don't render if the feature flag is disabled
  if (!flashDealsEnabled) {
    return null;
  }

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = new Date(endTime).getTime() - new Date().getTime();
      
      if (difference <= 0) {
        setIsExpired(true);
        onTimeEnd?.();
        return { hours: 0, minutes: 0, seconds: 0 };
      }
      
      return {
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      };
    };
    
    // Initial calculation
    setTimeLeft(calculateTimeLeft());
    
    // Update every second
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    
    // Clean up on unmount
    return () => clearInterval(timer);
  }, [endTime, onTimeEnd]);

  // Don't render if expired
  if (isExpired) {
    return null;
  }

  // Format time values with leading zeros
  const formatTime = (value: number) => value.toString().padStart(2, "0");

  if (variant === "card") {
    return (
      <Card className={cn("overflow-hidden border-2 border-red-200", className)}>
        <div className="bg-gradient-to-r from-red-500 to-orange-500 px-3 py-1">
          <h4 className="text-sm font-bold text-white">Flash Deal</h4>
        </div>
        <CardContent className="p-3">
          <div className="mb-2 text-sm line-clamp-1">{productName}</div>
          <div className="flex justify-between items-center">
            <div className="flex items-baseline gap-1.5">
              <span className="text-xl font-bold text-red-600">
                ₹{Math.round(originalPrice * (1 - discount / 100)).toLocaleString()}
              </span>
              <span className="text-xs line-through text-muted-foreground">
                ₹{originalPrice.toLocaleString()}
              </span>
            </div>
            <div className="flex items-center gap-1 bg-red-50 px-2 py-1 rounded-md">
              <Timer className="h-3.5 w-3.5 text-red-600" />
              <span className="text-xs font-medium text-red-600">
                {formatTime(timeLeft.hours)}:{formatTime(timeLeft.minutes)}:{formatTime(timeLeft.seconds)}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className={cn(
        "flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-red-500 to-orange-500 text-white",
        className
      )}
    >
      <Timer className="h-4 w-4 animate-pulse" />
      <span className="text-xs font-medium">
        Flash deal ends in: {formatTime(timeLeft.hours)}:{formatTime(timeLeft.minutes)}:{formatTime(timeLeft.seconds)}
      </span>
    </motion.div>
  );
};
