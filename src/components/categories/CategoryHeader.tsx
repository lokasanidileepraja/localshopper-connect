
import { motion } from "framer-motion";
import { memo, useCallback } from "react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface CategoryHeaderProps {
  filter: string;
  setFilter: (value: string) => void;
}

export const CategoryHeader = memo(({ filter, setFilter }: CategoryHeaderProps) => {
  // Stable handler to avoid recreation on render
  const handleFilterChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value);
  }, [setFilter]);

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="space-y-6 mb-6"
    >
      <motion.div 
        className="flex flex-col items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        <motion.h2 
          className="text-2xl sm:text-3xl font-bold text-center bg-gradient-to-r from-primary/80 to-secondary/80 
            bg-clip-text text-transparent mb-2"
        >
          Browse Categories
        </motion.h2>
        <div className="flex items-center justify-center gap-2">
          <Badge variant="outline" className="font-normal">
            MVP Version
          </Badge>
          <Badge variant="secondary" className="font-normal">
            More categories coming soon
          </Badge>
        </div>
        
        {/* Search input with better performance */}
        <div className="w-full max-w-md mt-4 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            type="text" 
            placeholder="Search categories..."
            value={filter}
            onChange={handleFilterChange}
            className="pl-10 w-full"
            aria-label="Search categories"
          />
        </div>
      </motion.div>
    </motion.div>
  );
});

CategoryHeader.displayName = 'CategoryHeader';
