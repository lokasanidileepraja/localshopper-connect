
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface EmptyStateProps {
  title: string;
  description: string;
  actionText?: string;
  onAction?: () => void;
  icon?: React.ReactNode;
}

export const EmptyState = ({ 
  title, 
  description, 
  actionText, 
  onAction,
  icon
}: EmptyStateProps) => {
  return (
    <motion.div 
      className="text-center py-12 space-y-4 bg-gray-50/50 rounded-xl backdrop-blur-sm"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      {icon && (
        <motion.div 
          className="mx-auto mb-4 flex items-center justify-center"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          {icon}
        </motion.div>
      )}
      <p className="text-gray-500 text-lg font-medium">{title}</p>
      <p className="text-gray-400 text-sm">{description}</p>
      {actionText && onAction && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.4 }}
        >
          <Button
            onClick={onAction}
            className="mt-4"
          >
            {actionText}
          </Button>
        </motion.div>
      )}
    </motion.div>
  );
};
