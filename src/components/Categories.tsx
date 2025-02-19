
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useState, useEffect } from "react";
import { useCategoryFilter } from "@/hooks/useCategoryFilter";
import { useKeyboardNav } from "@/hooks/useKeyboardNav";
import { CategoryHeader } from "./categories/CategoryHeader";
import { CategoryGrid } from "./categories/CategoryGrid";
import { categories } from "@/data/categories";
import { motion } from "framer-motion";

interface CategoriesProps {
  onCategorySelect: (category: string) => void;
}

export const Categories = ({ onCategorySelect }: CategoriesProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const { filter, setFilter, filteredCategories } = useCategoryFilter(categories);

  const handleCategorySelect = (categoryName: string) => {
    onCategorySelect(categoryName);
  };

  useKeyboardNav(
    () => setSelectedIndex(prev => Math.max(0, prev - 1)),
    () => setSelectedIndex(prev => Math.min(filteredCategories().length - 1, prev + 1)),
    () => handleCategorySelect(filteredCategories()[selectedIndex]?.name)
  );

  useEffect(() => {
    setSelectedIndex(0);
  }, [filter]);

  const filtered = filteredCategories();

  return (
    <motion.section 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="py-8 sm:py-12 bg-gradient-to-b from-white to-gray-50"
      id="categories"
    >
      <div className="container mx-auto px-4 max-w-7xl">
        <CategoryHeader filter={filter} setFilter={setFilter} />
        <CategoryGrid 
          categories={filtered} 
          selectedIndex={selectedIndex}
          onSelect={handleCategorySelect}
        />
      </div>
    </motion.section>
  );
};
