
import { motion } from "framer-motion";
import { CategoryCard } from "./CategoryCard";
import { Category } from "@/types/categories";
import { useIsMobile } from "@/hooks/use-mobile";
import { memo, useMemo } from "react";

interface CategoryGridProps {
  categories: Category[];
  selectedIndex: number;
  onSelect: (name: string) => void;
}

export const CategoryGrid = memo(({ categories, selectedIndex, onSelect }: CategoryGridProps) => {
  const isMobile = useIsMobile();

  // Memoize animation variants to prevent recreation on re-render
  const containerVariants = useMemo(() => ({
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.03,  // Reduce stagger time
        delayChildren: 0.05,    // Reduce delay
        duration: 0.2,          // Reduce duration
        ease: "easeOut"
      }
    }
  }), []);

  // Memoize grid classes
  const gridClasses = useMemo(() => `
    grid gap-4 sm:gap-6
    ${isMobile 
      ? 'grid-cols-2' 
      : 'sm:grid-cols-3 lg:grid-cols-4'}
    auto-rows-fr
    will-change-transform
  `, [isMobile]);

  // Early return with EmptyState if no categories
  if (categories.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-center py-12 space-y-4 bg-gray-50/50 rounded-xl backdrop-blur-sm"
      >
        <p className="text-gray-500 text-lg font-medium">No categories found matching your search.</p>
        <p className="text-gray-400 text-sm">Try adjusting your search terms or browse all categories.</p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-6 py-2 bg-primary text-white rounded-md hover:bg-primary/90 
            transition-colors shadow-md hover:shadow-lg
            focus:outline-none focus:ring-2 focus:ring-primary/20"
          onClick={() => window.location.reload()}
        >
          Reset Search
        </motion.button>
      </motion.div>
    );
  }
  
  // Standard grid rendering for reasonable category lists
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="w-full"
    >
      <div className={gridClasses}>
        {/* Render only categories that are visible in the viewport */}
        {categories.slice(0, 20).map((category, index) => (
          <CategoryCard
            key={category.name}
            category={category}
            onSelect={onSelect}
            isSelected={selectedIndex === index}
            index={index}
          />
        ))}
      </div>
    </motion.div>
  );
});

CategoryGrid.displayName = 'CategoryGrid';
