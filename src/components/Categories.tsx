
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useState, useEffect, useMemo, useCallback, memo } from "react";
import { useCategoryFilter } from "@/hooks/useCategoryFilter";
import { useKeyboardNav } from "@/hooks/useKeyboardNav";
import { CategoryHeader } from "./categories/CategoryHeader";
import { CategoryGrid } from "./categories/CategoryGrid";
import { categories } from "@/data/categories";
import { motion } from "framer-motion";

interface CategoriesProps {
  onCategorySelect: (category: string) => void;
}

export const Categories = memo(({ onCategorySelect }: CategoriesProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const { filter, setFilter, filteredCategories } = useCategoryFilter(categories);

  const handleCategorySelect = useCallback((categoryName: string) => {
    console.log(`Selected category: ${categoryName}`);
    onCategorySelect(categoryName);
    
    // Explicitly navigate to the category page with the correct path
    const categoryPath = `/category/${categoryName.toLowerCase()}`;
    console.log(`Navigating to: ${categoryPath}`);
    navigate(categoryPath);
    
    toast({
      title: "Category Selected",
      description: `Browsing ${categoryName} products`,
    });
  }, [navigate, onCategorySelect, toast]);

  useKeyboardNav(
    () => setSelectedIndex(prev => Math.max(0, prev - 1)),
    () => setSelectedIndex(prev => Math.min(filteredCategories().length - 1, prev + 1)),
    () => {
      const selected = filteredCategories()[selectedIndex];
      if (selected) {
        handleCategorySelect(selected.name);
      }
    }
  );

  // Reset selection index when filter changes
  useEffect(() => {
    setSelectedIndex(0);
  }, [filter]);

  // Memoize the filtered categories to prevent unnecessary recalculation
  const filtered = useMemo(() => filteredCategories(), [filteredCategories]);
  console.log("Filtered categories:", filtered);

  return (
    <motion.section 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="py-4 sm:py-8 bg-gradient-to-b from-white to-gray-50"
      id="categories"
    >
      <div className="mx-auto max-w-7xl">
        <CategoryHeader filter={filter} setFilter={setFilter} />
        <CategoryGrid 
          categories={filtered} 
          selectedIndex={selectedIndex}
          onSelect={handleCategorySelect}
        />
      </div>
    </motion.section>
  );
});

Categories.displayName = 'Categories';
