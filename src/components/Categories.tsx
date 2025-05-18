
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useState, useEffect, useMemo, useCallback, memo } from "react";
import { useCategoryFilter } from "@/hooks/useCategoryFilter";
import { useKeyboardNav } from "@/hooks/useKeyboardNav";
import { CategoryHeader } from "./categories/CategoryHeader";
import { CategoryGrid } from "./categories/CategoryGrid";
import { categories } from "@/data/categories";
import { motion } from "framer-motion";
import { ErrorBoundary } from "@/components/common/ErrorBoundary";
import { usePreventRefresh } from "@/hooks/usePreventRefresh";

interface CategoriesProps {
  onCategorySelect: (category: string) => void;
}

export const Categories = memo(({ onCategorySelect }: CategoriesProps) => {
  // Use the hook to prevent unnecessary refreshes
  usePreventRefresh();
  
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const { filter, setFilter, filteredCategories } = useCategoryFilter(categories);

  // Create a stable reference to the category selection callback
  const handleCategorySelect = useCallback((categoryName: string) => {
    // Log selection but avoid excessive logging
    if (process.env.NODE_ENV !== 'production') {
      console.log(`Selected category: ${categoryName}`);
    }
    
    // Call the callback prop
    onCategorySelect(categoryName);
    
    // Navigate to the category page
    const categoryPath = `/category/${categoryName.toLowerCase()}`;
    navigate(categoryPath);
    
    // Show toast notification
    toast({
      title: "Category Selected",
      description: `Browsing ${categoryName} products`,
    });
  }, [navigate, onCategorySelect, toast]);

  // Set up keyboard navigation handlers
  useKeyboardNav(
    useCallback(() => setSelectedIndex(prev => Math.max(0, prev - 1)), []),
    useCallback(() => {
      const filtered = filteredCategories;
      setSelectedIndex(prev => Math.min(filtered.length - 1, prev + 1));
    }, [filteredCategories]),
    useCallback(() => {
      const filtered = filteredCategories;
      if (filtered.length > 0 && selectedIndex >= 0 && selectedIndex < filtered.length) {
        handleCategorySelect(filtered[selectedIndex].name);
      }
    }, [filteredCategories, handleCategorySelect, selectedIndex])
  );

  // Reset selection index when filter changes, with debouncing
  useEffect(() => {
    const timer = setTimeout(() => {
      setSelectedIndex(0);
    }, 100);
    return () => clearTimeout(timer);
  }, [filter]);

  // Memoize the filtered categories to prevent unnecessary recalculation
  const filtered = useMemo(() => filteredCategories, [filteredCategories]);

  return (
    <ErrorBoundary>
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="py-4 sm:py-6 bg-gradient-to-b from-white to-gray-50"
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
    </ErrorBoundary>
  );
});

Categories.displayName = 'Categories';
