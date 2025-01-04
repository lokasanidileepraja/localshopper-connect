import { motion } from "framer-motion";
import { CategoryCard } from "./CategoryCard";
import { Category } from "@/types/categories";
import { useIsMobile } from "@/hooks/use-mobile";

interface CategoryGridProps {
  categories: Category[];
  selectedIndex: number;
  onSelect: (name: string) => void;
}

export const CategoryGrid = ({ categories, selectedIndex, onSelect }: CategoryGridProps) => {
  const isMobile = useIsMobile();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="w-full"
    >
      <div className={`
        grid 
        ${isMobile ? 'grid-cols-2 gap-3' : 'sm:grid-cols-3 lg:grid-cols-4 gap-6'}
        auto-rows-fr
      `}>
        {categories.map((category, index) => (
          <CategoryCard
            key={category.name}
            category={category}
            onSelect={onSelect}
            isSelected={selectedIndex === index}
            index={index}
          />
        ))}
      </div>

      {categories.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-12"
        >
          <p className="text-gray-500 text-lg">No categories found matching your search.</p>
          <p className="text-gray-400 text-sm mt-2">Try adjusting your search terms.</p>
        </motion.div>
      )}
    </motion.div>
  );
};