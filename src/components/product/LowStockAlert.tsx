
import { AlertCircle } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface LowStockAlertProps {
  stock: number;
  threshold?: number;
  className?: string;
}

export const LowStockAlert = ({
  stock,
  threshold = 5,
  className
}: LowStockAlertProps) => {
  // Only show for items actually low in stock
  if (stock > threshold) {
    return null;
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={cn(
        "flex items-center gap-1.5 px-3 py-1.5 rounded-full",
        stock <= 2 ? "bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-400" 
                  : "bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-400",
        className
      )}
    >
      <AlertCircle className="h-3.5 w-3.5" />
      <span className="text-xs font-medium">
        {stock === 1 ? (
          "Last one!"
        ) : stock <= 3 ? (
          `Only ${stock} left!`
        ) : (
          `Low stock: ${stock} left`
        )}
      </span>
    </motion.div>
  );
};
