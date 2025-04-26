
import { Award } from "lucide-react";
import { usePointsStore } from "@/store/pointsStore";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "@/components/ui/tooltip";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";

export const BadgesGrid = () => {
  const { badges, points } = usePointsStore();
  
  const earnedBadges = badges.filter(badge => badge.earnedOn);
  const upcomingBadges = badges.filter(badge => !badge.earnedOn)
    .sort((a, b) => a.unlockedAt - b.unlockedAt);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl flex items-center gap-2">
          <Award className="h-5 w-5 text-primary" />
          Your Achievement Badges
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-3">
          <h3 className="text-lg font-medium">Earned Badges</h3>
          {earnedBadges.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {earnedBadges.map((badge) => (
                <motion.div
                  key={badge.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="flex flex-col items-center p-4 bg-accent/50 rounded-lg border-2 border-primary/20 hover:border-primary/40 transition-colors">
                          <Award className="h-8 w-8 mb-2 text-primary fill-primary/10" />
                          <span className="font-medium text-center">{badge.name}</span>
                          <span className="text-xs text-muted-foreground mt-1">
                            {new Date(badge.earnedOn!).toLocaleDateString()}
                          </span>
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{badge.description}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-6 bg-muted/50 rounded-lg">
              <Award className="h-10 w-10 mx-auto mb-2 text-muted-foreground" />
              <p className="font-medium">No badges earned yet</p>
              <p className="text-sm text-muted-foreground mt-1">
                Complete actions like writing reviews and setting alerts to earn badges
              </p>
            </div>
          )}
        </div>
        
        <div className="space-y-3">
          <h3 className="text-lg font-medium">Upcoming Badges</h3>
          <div className="grid grid-cols-1 gap-3">
            {upcomingBadges.map((badge) => {
              const progress = Math.min(100, (points / badge.unlockedAt) * 100);
              
              return (
                <div 
                  key={badge.id}
                  className="flex justify-between items-center p-3 border rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <Award className="h-6 w-6 text-muted-foreground" />
                    <div>
                      <div className="font-medium">{badge.name}</div>
                      <div className="text-sm text-muted-foreground">{badge.description}</div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <Badge variant="outline" className="mb-1">
                      {points}/{badge.unlockedAt} pts
                    </Badge>
                    <div className="w-16 bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                      <div
                        className="h-full bg-primary rounded-full"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
