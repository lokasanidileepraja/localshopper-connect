
import { useState } from "react";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";
import { TooltipWrapper } from "@/components/common/TooltipWrapper";
import { useCartStore } from "@/store/cartStore";

interface WishlistButtonProps {
  productId: string;
  productName?: string;
  category?: string;
}

export const WishlistButton = ({ 
  productId, 
  productName = "Product", 
  category = ""
}: WishlistButtonProps) => {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const { toast } = useToast();
  const isMobile = useIsMobile();

  const handleWishlist = () => {
    setIsWishlisted(!isWishlisted);
    toast({
      title: isWishlisted ? "Removed from Wishlist" : "Added to Wishlist 🎉",
      description: isWishlisted 
        ? "You can always add it back later."
        : `${productName} saved to your wishlist${category ? ` under ${category}` : ''}. We'll alert you for price drops!`,
      variant: "default"
    });
  };

  const tooltipText = isWishlisted 
    ? "Remove from wishlist" 
    : "Add to wishlist for price alerts";

  return (
    <TooltipWrapper content={tooltipText}>
      <Button
        variant="outline"
        size={isMobile ? "sm" : "icon"}
        onClick={handleWishlist}
        aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
        className={`transition-colors h-8 w-8 p-0 ${
          isWishlisted ? "text-red-500 hover:text-red-600" : "hover:text-red-500"
        }`}
        data-active={isWishlisted}
      >
        <Heart className={`h-4 w-4 ${isWishlisted ? "fill-current" : ""}`} />
      </Button>
    </TooltipWrapper>
  );
};
