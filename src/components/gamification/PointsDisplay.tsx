
import { Award, Star } from "lucide-react";
import { motion } from "framer-motion";
import { usePointsStore } from "@/store/pointsStore";
import { cn } from "@/lib/utils";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "@/components/ui/tooltip";
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";

interface PointsDisplayProps {
  size?: "sm" | "md" | "lg";
  className?: string;
  showPopover?: boolean;
}

export const PointsDisplay = ({
  size = "md",
  className,
  showPopover = true
}: PointsDisplayProps) => {
  const { points, badges } = usePointsStore();
  
  const sizes = {
    sm: "h-3 w-3 text-xs",
    md: "h-4 w-4 text-sm",
    lg: "h-5 w-5 text-base"
  };
  
  const earnedBadges = badges.filter(badge => badge.earnedOn);
  const nextBadge = badges.find(badge => !badge.earnedOn);

  const PointsContent = () => (
    <div className="flex items-center gap-1.5">
      <Star className={cn(
        "text-yellow-400 fill-yellow-400",
        sizes[size].split(" ").slice(0, 2).join(" ")
      )} />
      <span className={cn("font-medium", sizes[size].split(" ").slice(2).join(" "))}>
        {points.toLocaleString()} pts
      </span>
    </div>
  );

  if (!showPopover) {
    return (
      <div className={cn("flex items-center", className)}>
        <PointsContent />
      </div>
    );
  }

  return (
    <Popover>
      <PopoverTrigger className={cn(
        "flex items-center transition-colors rounded-full px-2 py-1 hover:bg-accent", 
        className
      )}>
        <PointsContent />
      </PopoverTrigger>
      <PopoverContent className="w-80 p-4">
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h4 className="font-semibold">Your Finder Points</h4>
            <span className="text-lg font-bold">{points.toLocaleString()}</span>
          </div>
          
          <div className="space-y-2">
            <h5 className="text-sm font-medium">Your Badges</h5>
            <div className="grid grid-cols-3 gap-2">
              {earnedBadges.length > 0 ? (
                earnedBadges.map(badge => (
                  <TooltipProvider key={badge.id}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="flex flex-col items-center p-2 bg-accent rounded-lg">
                          <Award className="h-6 w-6 mb-1 text-primary" />
                          <span className="text-xs font-medium">{badge.name}</span>
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="text-xs">{badge.description}</p>
                        <p className="text-xs text-muted-foreground">
                          Earned on {badge.earnedOn?.toLocaleDateString()}
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                ))
              ) : (
                <div className="col-span-3 text-center py-2 text-sm text-muted-foreground">
                  No badges earned yet
                </div>
              )}
            </div>
          </div>
          
          {nextBadge && (
            <div className="space-y-1.5">
              <h5 className="text-sm font-medium">Next Badge</h5>
              <div className="p-3 border rounded-lg">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Award className="h-5 w-5 text-muted-foreground" />
                    <span className="font-medium">{nextBadge.name}</span>
                  </div>
                  <Badge variant="outline">
                    {points}/{nextBadge.unlockedAt} pts
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {nextBadge.description}
                </p>
                <div className="mt-2 bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                  <motion.div
                    className="h-full bg-primary rounded-full"
                    initial={{ width: "0%" }}
                    animate={{ width: `${Math.min(100, (points / nextBadge.unlockedAt) * 100)}%` }}
                    transition={{ duration: 1, delay: 0.2 }}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
};
