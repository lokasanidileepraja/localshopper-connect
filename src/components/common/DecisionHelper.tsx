import { motion, AnimatePresence } from "framer-motion";
import { Check, ArrowRight, Sparkles, TrendingDown, Star, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface RecommendationBadgeProps {
  type: "best-value" | "lowest-price" | "top-rated" | "popular" | "recommended";
  className?: string;
}

export const RecommendationBadge = ({ type, className }: RecommendationBadgeProps) => {
  const configs = {
    "best-value": { 
      label: "Best Value", 
      icon: Sparkles, 
      className: "bg-gradient-to-r from-amber-500 to-orange-500 text-white border-0" 
    },
    "lowest-price": { 
      label: "Lowest Price", 
      icon: TrendingDown, 
      className: "bg-gradient-to-r from-green-500 to-emerald-500 text-white border-0" 
    },
    "top-rated": { 
      label: "Top Rated", 
      icon: Star, 
      className: "bg-gradient-to-r from-blue-500 to-indigo-500 text-white border-0" 
    },
    "popular": { 
      label: "Most Popular", 
      icon: Zap, 
      className: "bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0" 
    },
    "recommended": { 
      label: "Recommended", 
      icon: Check, 
      className: "bg-primary text-primary-foreground border-0" 
    },
  };

  const config = configs[type];
  const Icon = config.icon;

  return (
    <Badge className={cn("px-2 py-0.5 text-xs font-medium gap-1", config.className, className)}>
      <Icon className="h-3 w-3" />
      {config.label}
    </Badge>
  );
};

interface QuickActionButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  variant?: "primary" | "secondary" | "success";
  icon?: React.ReactNode;
  className?: string;
  disabled?: boolean;
}

export const QuickActionButton = ({ 
  children, 
  onClick, 
  variant = "primary", 
  icon,
  className,
  disabled 
}: QuickActionButtonProps) => {
  const variants = {
    primary: "bg-primary text-primary-foreground hover:bg-primary/90",
    secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
    success: "bg-green-500 text-white hover:bg-green-600",
  };

  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "flex items-center justify-center gap-2 px-6 py-3 rounded-full font-medium transition-all",
        "shadow-sm hover:shadow-md",
        variants[variant],
        disabled && "opacity-50 cursor-not-allowed",
        className
      )}
    >
      {icon}
      {children}
      <ArrowRight className="h-4 w-4" />
    </motion.button>
  );
};

interface ProgressStepsProps {
  steps: { id: string; label: string; completed?: boolean }[];
  currentStep: number;
  className?: string;
}

export const ProgressSteps = ({ steps, currentStep, className }: ProgressStepsProps) => {
  return (
    <div className={cn("flex items-center justify-between w-full", className)}>
      {steps.map((step, index) => (
        <div key={step.id} className="flex items-center flex-1">
          <div className="flex flex-col items-center">
            <motion.div
              initial={false}
              animate={{
                scale: index === currentStep ? 1.1 : 1,
                backgroundColor: index <= currentStep ? "hsl(var(--primary))" : "hsl(var(--muted))",
              }}
              className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors",
                index <= currentStep ? "text-primary-foreground" : "text-muted-foreground"
              )}
            >
              {index < currentStep ? (
                <Check className="h-4 w-4" />
              ) : (
                <span>{index + 1}</span>
              )}
            </motion.div>
            <span className={cn(
              "text-xs mt-1.5 font-medium",
              index <= currentStep ? "text-foreground" : "text-muted-foreground"
            )}>
              {step.label}
            </span>
          </div>
          {index < steps.length - 1 && (
            <div className="flex-1 h-0.5 mx-2 bg-muted overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: index < currentStep ? "100%" : "0%" }}
                transition={{ duration: 0.3 }}
                className="h-full bg-primary"
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

interface DecisionCardProps {
  title: string;
  description?: string;
  value: string;
  highlight?: boolean;
  badge?: React.ReactNode;
  onClick?: () => void;
  selected?: boolean;
  className?: string;
}

export const DecisionCard = ({
  title,
  description,
  value,
  highlight,
  badge,
  onClick,
  selected,
  className,
}: DecisionCardProps) => {
  return (
    <motion.div
      whileHover={{ scale: onClick ? 1.01 : 1 }}
      whileTap={{ scale: onClick ? 0.99 : 1 }}
      onClick={onClick}
      className={cn(
        "relative p-4 rounded-xl border-2 transition-all",
        onClick && "cursor-pointer",
        selected 
          ? "border-primary bg-primary/5 shadow-md" 
          : highlight 
            ? "border-green-500/50 bg-green-50/50 dark:bg-green-950/20" 
            : "border-border hover:border-primary/30",
        className
      )}
    >
      {badge && (
        <div className="absolute -top-2.5 left-4">
          {badge}
        </div>
      )}
      
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <h4 className="font-semibold text-foreground">{title}</h4>
          {description && (
            <p className="text-sm text-muted-foreground mt-0.5">{description}</p>
          )}
        </div>
        <div className="text-right">
          <span className="text-lg font-bold text-primary">{value}</span>
        </div>
      </div>
      
      {selected && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute top-3 right-3"
        >
          <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center">
            <Check className="h-3 w-3 text-primary-foreground" />
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

interface NextStepHintProps {
  message: string;
  action?: string;
  onAction?: () => void;
  className?: string;
}

export const NextStepHint = ({ message, action, onAction, className }: NextStepHintProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        "flex items-center justify-between gap-4 p-4 rounded-xl",
        "bg-gradient-to-r from-primary/10 via-primary/5 to-transparent",
        "border border-primary/20",
        className
      )}
    >
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
          <ArrowRight className="h-4 w-4 text-primary" />
        </div>
        <p className="text-sm font-medium text-foreground">{message}</p>
      </div>
      {action && onAction && (
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onAction}
          className="px-4 py-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
        >
          {action}
        </motion.button>
      )}
    </motion.div>
  );
};
