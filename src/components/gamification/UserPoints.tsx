
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useApi } from '@/hooks/useApi';
import { useAuth } from '@/contexts/AuthContext';
import { Award, Star } from 'lucide-react';

export const UserPoints: React.FC = () => {
  const { user } = useAuth();
  const { useUserPoints, useUserBadges } = useApi();
  
  const userId = user?.uid;
  const { data: points = 0, isLoading: isLoadingPoints } = useUserPoints(userId);
  const { data: badges = [], isLoading: isLoadingBadges } = useUserBadges(userId);

  // Next level thresholds
  const currentLevel = Math.floor(points / 100);
  const nextLevelPoints = (currentLevel + 1) * 100;
  const progress = ((points % 100) / 100) * 100;

  if (!user) {
    return null;
  }

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2">
          <Star className="h-5 w-5 text-yellow-500" />
          Your Finder Points
        </CardTitle>
        <CardDescription>
          Earn points by shopping, writing reviews, and more
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm font-medium">Level {currentLevel}</span>
              <span className="text-sm font-medium">{points} Points</span>
            </div>
            <Progress value={progress} className="h-2" />
            <div className="flex justify-end mt-1">
              <span className="text-xs text-muted-foreground">
                {nextLevelPoints - points} points to level {currentLevel + 1}
              </span>
            </div>
          </div>
          
          <div>
            <h4 className="text-sm font-semibold mb-2 flex items-center gap-2">
              <Award className="h-4 w-4" />
              Your Badges
            </h4>
            
            {isLoadingBadges ? (
              <div className="flex gap-2">
                {[1, 2].map((i) => (
                  <div 
                    key={i}
                    className="h-8 w-20 animate-pulse bg-muted rounded-full" 
                  />
                ))}
              </div>
            ) : (
              <div className="flex flex-wrap gap-2">
                {badges.map((badge) => (
                  <Badge key={badge.id} variant="secondary" className="px-3 py-1">
                    {badge.name}
                  </Badge>
                ))}
                {badges.length === 0 && (
                  <span className="text-sm text-muted-foreground">
                    No badges earned yet
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
