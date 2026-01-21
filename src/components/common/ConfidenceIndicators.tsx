import { motion } from "framer-motion";
import { ShieldCheck, Truck, RotateCcw, CreditCard, Clock, MapPin, Star, Users } from "lucide-react";
import { cn } from "@/lib/utils";

interface TrustBadgeProps {
  type: "verified" | "secure" | "free-shipping" | "returns" | "fast-delivery";
  compact?: boolean;
  className?: string;
}

export const TrustBadge = ({ type, compact = false, className }: TrustBadgeProps) => {
  const configs = {
    "verified": {
      icon: ShieldCheck,
      label: "Verified Seller",
      description: "100% authentic products",
      color: "text-green-600",
      bg: "bg-green-50 dark:bg-green-950/30",
    },
    "secure": {
      icon: CreditCard,
      label: "Secure Payment",
      description: "256-bit SSL encryption",
      color: "text-blue-600",
      bg: "bg-blue-50 dark:bg-blue-950/30",
    },
    "free-shipping": {
      icon: Truck,
      label: "Free Shipping",
      description: "On orders above ₹10,000",
      color: "text-purple-600",
      bg: "bg-purple-50 dark:bg-purple-950/30",
    },
    "returns": {
      icon: RotateCcw,
      label: "Easy Returns",
      description: "7-day return policy",
      color: "text-orange-600",
      bg: "bg-orange-50 dark:bg-orange-950/30",
    },
    "fast-delivery": {
      icon: Clock,
      label: "Fast Delivery",
      description: "Same day available",
      color: "text-teal-600",
      bg: "bg-teal-50 dark:bg-teal-950/30",
    },
  };

  const config = configs[type];
  const Icon = config.icon;

  if (compact) {
    return (
      <div className={cn("flex items-center gap-1.5", config.color, className)}>
        <Icon className="h-4 w-4" />
        <span className="text-sm font-medium">{config.label}</span>
      </div>
    );
  }

  return (
    <div className={cn("flex items-start gap-3 p-3 rounded-lg", config.bg, className)}>
      <div className={cn("mt-0.5", config.color)}>
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <p className={cn("font-medium text-sm", config.color)}>{config.label}</p>
        <p className="text-xs text-muted-foreground mt-0.5">{config.description}</p>
      </div>
    </div>
  );
};

interface SocialProofProps {
  type: "rating" | "buyers" | "views" | "location";
  value: string | number;
  subtext?: string;
  className?: string;
}

export const SocialProof = ({ type, value, subtext, className }: SocialProofProps) => {
  const configs = {
    "rating": { icon: Star, label: "rating" },
    "buyers": { icon: Users, label: "bought this" },
    "views": { icon: Clock, label: "viewing now" },
    "location": { icon: MapPin, label: "away" },
  };

  const config = configs[type];
  const Icon = config.icon;

  return (
    <div className={cn("flex items-center gap-1.5 text-sm", className)}>
      <Icon className={cn(
        "h-4 w-4",
        type === "rating" ? "text-amber-500 fill-amber-500" : "text-muted-foreground"
      )} />
      <span className="font-medium text-foreground">{value}</span>
      <span className="text-muted-foreground">{subtext || config.label}</span>
    </div>
  );
};

interface TrustStripProps {
  className?: string;
}

export const TrustStrip = ({ className }: TrustStripProps) => {
  return (
    <div className={cn(
      "flex items-center justify-center gap-6 py-3 px-4",
      "bg-muted/50 rounded-lg",
      "overflow-x-auto scrollbar-hide",
      className
    )}>
      <TrustBadge type="verified" compact />
      <div className="w-px h-4 bg-border" />
      <TrustBadge type="secure" compact />
      <div className="w-px h-4 bg-border" />
      <TrustBadge type="returns" compact />
    </div>
  );
};

interface PriceSavingsProps {
  currentPrice: number;
  originalPrice?: number;
  lowestPrice?: number;
  className?: string;
}

export const PriceSavings = ({ currentPrice, originalPrice, lowestPrice, className }: PriceSavingsProps) => {
  const savings = originalPrice ? originalPrice - currentPrice : 0;
  const percentOff = originalPrice ? Math.round((savings / originalPrice) * 100) : 0;
  const isLowest = lowestPrice && currentPrice <= lowestPrice;

  if (!savings && !isLowest) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn("space-y-1", className)}
    >
      {savings > 0 && (
        <div className="flex items-center gap-2">
          <span className="text-green-600 font-semibold text-sm">
            You save ₹{savings.toLocaleString()} ({percentOff}% off)
          </span>
        </div>
      )}
      {isLowest && (
        <div className="flex items-center gap-1.5 text-xs text-green-700 bg-green-50 dark:bg-green-950/30 px-2 py-1 rounded-full w-fit">
          <ShieldCheck className="h-3 w-3" />
          <span className="font-medium">Lowest price in 30 days</span>
        </div>
      )}
    </motion.div>
  );
};

interface DeliveryEstimateProps {
  distance?: string;
  storeOpen?: boolean;
  className?: string;
}

export const DeliveryEstimate = ({ distance, storeOpen, className }: DeliveryEstimateProps) => {
  const getEstimate = () => {
    if (!distance) return "2-3 days";
    const km = parseFloat(distance);
    if (km < 3) return "Same day pickup";
    if (km < 10) return "Tomorrow";
    return "2-3 days";
  };

  return (
    <div className={cn("flex items-center gap-2 text-sm", className)}>
      <Truck className="h-4 w-4 text-primary" />
      <span className="text-foreground font-medium">{getEstimate()}</span>
      {distance && (
        <span className="text-muted-foreground">• {distance}</span>
      )}
      {storeOpen !== undefined && (
        <span className={cn(
          "text-xs px-1.5 py-0.5 rounded-full",
          storeOpen 
            ? "bg-green-100 text-green-700 dark:bg-green-950/50 dark:text-green-400" 
            : "bg-red-100 text-red-700 dark:bg-red-950/50 dark:text-red-400"
        )}>
          {storeOpen ? "Open Now" : "Closed"}
        </span>
      )}
    </div>
  );
};
