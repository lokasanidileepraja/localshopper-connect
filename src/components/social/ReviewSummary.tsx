
import { Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider, 
  TooltipTrigger
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface ReviewSummaryProps {
  rating: number;
  reviewCount: number;
  size?: "sm" | "md" | "lg";
  showCount?: boolean;
  showAnimated?: boolean;
  className?: string;
}

export const ReviewSummary = ({
  rating,
  reviewCount,
  size = "md",
  showCount = true,
  showAnimated = false,
  className
}: ReviewSummaryProps) => {
  const starSizes = {
    sm: "h-3 w-3",
    md: "h-4 w-4",
    lg: "h-5 w-5"
  };
  
  const textSizes = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base"
  };

  const renderStars = () => {
    return (
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => {
          const isHalfStar = star - 0.5 === Math.floor(rating) + 0.5;
          const isFullStar = star <= rating;
          
          return showAnimated ? (
            <motion.div
              key={star}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: star * 0.05 }}
            >
              <Star
                className={cn(
                  starSizes[size],
                  isFullStar ? "fill-yellow-400 text-yellow-400" : "text-gray-300",
                  "transition-colors duration-300"
                )}
              />
            </motion.div>
          ) : (
            <Star
              key={star}
              className={cn(
                starSizes[size],
                isFullStar ? "fill-yellow-400 text-yellow-400" : "text-gray-300",
              )}
            />
          );
        })}
      </div>
    );
  };

  return (
    <div className={cn("flex items-center gap-1.5", className)}>
      {renderStars()}
      
      {showCount && (
        <span className={cn(
          textSizes[size], 
          "text-muted-foreground font-medium"
        )}>
          ({reviewCount})
        </span>
      )}
      
      {rating >= 4.5 && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Badge 
                variant="secondary" 
                className="ml-1 bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100"
              >
                Top Rated
              </Badge>
            </TooltipTrigger>
            <TooltipContent>
              <p className="text-xs">This item is highly rated by our community</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
    </div>
  );
};
