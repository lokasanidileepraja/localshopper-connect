import { useState } from "react";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

interface WishlistButtonProps {
  productId: string;
}

export const WishlistButton = ({ productId }: WishlistButtonProps) => {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const { toast } = useToast();

  const handleWishlist = () => {
    setIsWishlisted(!isWishlisted);
    toast({
      title: isWishlisted ? "Removed from wishlist" : "Added to wishlist",
      description: isWishlisted 
        ? "The item has been removed from your wishlist"
        : "The item has been added to your wishlist",
    });
  };

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={handleWishlist}
      className={`transition-colors ${
        isWishlisted ? "text-red-500 hover:text-red-600" : "hover:text-red-500"
      }`}
    >
      <Heart className={`h-5 w-5 ${isWishlisted ? "fill-current" : ""}`} />
    </Button>
  );
};