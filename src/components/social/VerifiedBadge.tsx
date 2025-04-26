
import { BadgeCheck } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

interface VerifiedBadgeProps {
  type: "retailer" | "expert" | "product";
  size?: "sm" | "md" | "lg";
  className?: string;
}

export const VerifiedBadge = ({
  type,
  size = "md",
  className
}: VerifiedBadgeProps) => {
  const sizes = {
    sm: "h-3 w-3",
    md: "h-4 w-4",
    lg: "h-5 w-5"
  };

  const labels = {
    retailer: "Verified Retailer",
    expert: "Verified Expert",
    product: "Verified Authentic"
  };

  const descriptions = {
    retailer: "This retailer has been verified by our team",
    expert: "This expert has proven credentials in their field",
    product: "This product's authenticity has been verified"
  };

  const colors = {
    retailer: "text-blue-500",
    expert: "text-purple-500",
    product: "text-green-500"
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger className="flex items-center gap-1">
          <BadgeCheck className={cn(sizes[size], colors[type], className)} />
          <span className={cn(
            "text-xs font-medium",
            colors[type]
          )}>
            {labels[type]}
          </span>
        </TooltipTrigger>
        <TooltipContent>
          <p className="text-xs">{descriptions[type]}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
