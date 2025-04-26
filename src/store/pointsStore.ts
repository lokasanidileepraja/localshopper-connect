
import { create } from "zustand";
import { persist } from "zustand/middleware";

type BadgeType = "Tech Scout" | "Price Hunter" | "Deal Finder" | "Review Master" | "Local Expert";

interface Badge {
  id: string;
  name: BadgeType;
  description: string;
  icon: string;
  unlockedAt: number;
  earnedOn?: Date;
}

export interface PointsState {
  points: number;
  badges: Badge[];
  reviewCount: number;
  dealsSaved: number;
  alertsSet: number;
  checkinsCompleted: number;
  
  // Actions
  addPoints: (amount: number) => void;
  unlockBadge: (badgeId: string) => void;
  incrementReviews: () => void;
  incrementDealsSaved: (amount: number) => void;
  incrementAlertsSet: () => void;
  incrementCheckins: () => void;
}

export const usePointsStore = create<PointsState>()(
  persist(
    (set) => ({
      points: 0,
      badges: [
        {
          id: "tech-scout",
          name: "Tech Scout",
          description: "Browse 10 different products",
          icon: "search",
          unlockedAt: 50
        },
        {
          id: "price-hunter",
          name: "Price Hunter",
          description: "Set 5 price alerts",
          icon: "bell",
          unlockedAt: 100
        },
        {
          id: "deal-finder",
          name: "Deal Finder",
          description: "Save ₹5,000 through our platform",
          icon: "tag",
          unlockedAt: 250
        },
        {
          id: "review-master",
          name: "Review Master",
          description: "Write 3 product or store reviews",
          icon: "star",
          unlockedAt: 300
        },
        {
          id: "local-expert",
          name: "Local Expert",
          description: "Check in at 5 different local stores",
          icon: "map-pin",
          unlockedAt: 500
        },
      ],
      reviewCount: 0,
      dealsSaved: 0,
      alertsSet: 0,
      checkinsCompleted: 0,
      
      addPoints: (amount: number) => 
        set((state) => ({ points: state.points + amount })),
      
      unlockBadge: (badgeId: string) => 
        set((state) => ({
          badges: state.badges.map(badge => 
            badge.id === badgeId 
              ? { ...badge, earnedOn: badge.earnedOn || new Date() } 
              : badge
          )
        })),
      
      incrementReviews: () => 
        set((state) => ({ reviewCount: state.reviewCount + 1 })),
      
      incrementDealsSaved: (amount: number) => 
        set((state) => ({ dealsSaved: state.dealsSaved + amount })),
      
      incrementAlertsSet: () => 
        set((state) => ({ alertsSet: state.alertsSet + 1 })),
      
      incrementCheckins: () => 
        set((state) => ({ checkinsCompleted: state.checkinsCompleted + 1 })),
    }),
    {
      name: "techlocator-points",
    }
  )
);
