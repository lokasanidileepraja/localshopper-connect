
import { Bell, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { usePointsStore } from "@/store/pointsStore";

interface WishlistAlertPromptProps {
  productId: string;
  productName: string;
  currentPrice: number;
  onWishlistClick: () => void;
  onAlertClick: () => void;
  className?: string;
}

export const WishlistAlertPrompt = ({
  productId,
  productName,
  currentPrice,
  onWishlistClick,
  onAlertClick,
  className
}: WishlistAlertPromptProps) => {
  const { toast } = useToast();
  const { addPoints, incrementAlertsSet } = usePointsStore();
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isAlertSet, setIsAlertSet] = useState(false);

  const handleWishlistClick = () => {
    setIsWishlisted(!isWishlisted);
    
    toast({
      title: isWishlisted ? "Removed from Wishlist" : "Added to Wishlist",
      description: isWishlisted 
        ? `${productName} was removed from your wishlist`
        : `${productName} was added to your wishlist`,
    });
    
    if (!isWishlisted) {
      addPoints(10);
    }
    
    onWishlistClick();
  };

  const handleAlertClick = () => {
    setIsAlertSet(!isAlertSet);
    
    toast({
      title: isAlertSet ? "Price Alert Removed" : "Price Alert Set",
      description: isAlertSet 
        ? `Price alert for ${productName} was removed`
        : `We'll notify you when the price of ${productName} drops below ₹${currentPrice.toLocaleString()}`,
    });
    
    if (!isAlertSet) {
      addPoints(15);
      incrementAlertsSet();
    }
    
    onAlertClick();
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={className}
    >
      <div className="flex gap-2">
        <Button
          variant={isWishlisted ? "default" : "outline"}
          size="sm"
          className={`flex-1 gap-1.5 ${isWishlisted ? "bg-red-500 hover:bg-red-600" : ""}`}
          onClick={handleWishlistClick}
        >
          <Heart className={`h-4 w-4 ${isWishlisted ? "fill-white" : ""}`} />
          <span className="hidden sm:inline">{isWishlisted ? "Wishlisted" : "Add to Wishlist"}</span>
          <span className="sm:hidden">{isWishlisted ? "Saved" : "Wishlist"}</span>
        </Button>
        <Button
          variant={isAlertSet ? "default" : "outline"}
          size="sm"
          className={`flex-1 gap-1.5 ${isAlertSet ? "bg-blue-500 hover:bg-blue-600" : ""}`}
          onClick={handleAlertClick}
        >
          <Bell className={`h-4 w-4 ${isAlertSet ? "fill-white" : ""}`} />
          <span className="hidden sm:inline">{isAlertSet ? "Alert Set" : "Set Price Alert"}</span>
          <span className="sm:hidden">{isAlertSet ? "Set" : "Alert"}</span>
        </Button>
      </div>
    </motion.div>
  );
};
