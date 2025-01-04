import { Button } from "@/components/ui/button";
import { BellOff } from "lucide-react";
import { motion } from "framer-motion";

interface ActiveAlertProps {
  targetPrice: string;
  onRemoveAlert: () => void;
}

export const ActiveAlert = ({ targetPrice, onRemoveAlert }: ActiveAlertProps) => {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="space-y-4"
    >
      <div className="flex items-center justify-between p-4 rounded-lg bg-primary/10">
        <div>
          <p className="font-medium">Alert Set</p>
          <p className="text-sm text-gray-600">Target: ₹{Number(targetPrice).toLocaleString()}</p>
        </div>
        <Button variant="outline" size="icon" onClick={onRemoveAlert}>
          <BellOff className="h-4 w-4" />
        </Button>
      </div>
    </motion.div>
  );
};