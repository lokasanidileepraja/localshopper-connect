import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Search, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface CategoryHeaderProps {
  filter: string;
  setFilter: (value: string) => void;
}

export const CategoryHeader = ({ filter, setFilter }: CategoryHeaderProps) => {
  const { toast } = useToast();

  const clearSearch = () => {
    setFilter('');
    toast({
      title: "Search cleared",
      description: "Showing all categories",
      duration: 2000,
    });
  };

  const containerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6 mb-8"
    >
      <motion.h2 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-2xl sm:text-3xl font-bold text-center bg-gradient-to-r from-primary/80 to-secondary/80 
          bg-clip-text text-transparent"
      >
        Browse Categories
      </motion.h2>
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3 }}
        className="max-w-md mx-auto"
      >
        <div className="relative group">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5 
            group-hover:text-primary transition-colors" />
          <Input
            type="text"
            placeholder="Search categories..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="pl-10 pr-10 w-full bg-white/50 backdrop-blur-sm
              focus:ring-2 focus:ring-primary/20 transition-all
              hover:bg-white/70 rounded-full"
            aria-label="Search categories"
          />
          {filter && (
            <motion.button
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              className="absolute right-3 top-1/2 transform -translate-y-1/2
                text-gray-400 hover:text-primary transition-colors
                focus:outline-none focus:ring-2 focus:ring-primary/20 rounded-full
                p-1"
              onClick={clearSearch}
              aria-label="Clear search"
            >
              <X className="h-4 w-4" />
            </motion.button>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};