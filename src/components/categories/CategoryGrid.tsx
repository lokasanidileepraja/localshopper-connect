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

  return (
    <>
      <div className={`grid grid-cols-2 ${isMobile ? 'gap-3' : 'sm:grid-cols-4 gap-6'}`}>
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
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center text-gray-500 mt-8"
        >
          No categories found matching your search.
        </motion.p>
      )}
    </>
  );
};