
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface FeatureFlag {
  id: string;
  enabled: boolean;
  name: string;
  description: string;
}

interface FeatureFlagState {
  flags: FeatureFlag[];
  toggleFlag: (id: string) => void;
  setFlag: (id: string, enabled: boolean) => void;
}

export const useFeatureFlagStore = create<FeatureFlagState>()(
  persist(
    (set) => ({
      flags: [
        {
          id: "flash-deals",
          enabled: true,
          name: "Flash Deals",
          description: "Show time-limited deals with countdown timers"
        },
        {
          id: "low-stock-alerts",
          enabled: true,
          name: "Low Stock Alerts",
          description: "Display low stock warnings on product pages"
        },
        {
          id: "wishlist-value-meter",
          enabled: true,
          name: "Wishlist Value Meter",
          description: "Show running total of wishlist items"
        },
        {
          id: "saved-cart-reminders",
          enabled: true,
          name: "Saved Cart Reminders",
          description: "Remind users of items left in cart"
        },
        {
          id: "signup-coupons",
          enabled: true,
          name: "Signup Coupons",
          description: "Offer discount codes for new signups"
        },
        {
          id: "thank-you-vouchers",
          enabled: true,
          name: "Thank You Vouchers",
          description: "Occasionally give post-purchase discounts"
        },
      ],
      
      toggleFlag: (id: string) => 
        set((state) => ({
          flags: state.flags.map(flag => 
            flag.id === id 
              ? { ...flag, enabled: !flag.enabled } 
              : flag
          )
        })),
        
      setFlag: (id: string, enabled: boolean) => 
        set((state) => ({
          flags: state.flags.map(flag => 
            flag.id === id 
              ? { ...flag, enabled } 
              : flag
          )
        })),
    }),
    {
      name: "techlocator-feature-flags",
    }
  )
);
