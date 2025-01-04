import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface CategoryHeaderProps {
  filter: string;
  setFilter: (value: string) => void;
}

export const CategoryHeader = ({ filter, setFilter }: CategoryHeaderProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6 mb-8"
    >
      <motion.h2 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-2xl sm:text-3xl font-bold text-center"
      >
        Browse Categories
      </motion.h2>
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3 }}
        className="max-w-md mx-auto"
      >
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <Input
            type="text"
            placeholder="Search categories..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="pl-10 w-full bg-white/50 backdrop-blur-sm"
            aria-label="Search categories"
          />
        </div>
      </motion.div>
    </motion.div>
  );
};