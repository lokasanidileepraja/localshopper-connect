import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { useCategoryFilter } from "@/hooks/useCategoryFilter";
import { useKeyboardNav } from "@/hooks/useKeyboardNav";
import { CategoryHeader } from "./categories/CategoryHeader";
import { CategoryGrid } from "./categories/CategoryGrid";
import { categories } from "@/data/categories";

export const Categories = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const { filter, setFilter, filteredCategories } = useCategoryFilter(categories);

  const scrollToCategory = (categoryName: string) => {
    const element = document.getElementById(categoryName);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      toast({
        title: `Browsing ${categoryName}`,
        description: "Loading products in this category...",
      });
    }
    navigate(`/shop/TechHub Electronics`);
  };

  useKeyboardNav(
    () => setSelectedIndex(prev => Math.max(0, prev - 2)),
    () => setSelectedIndex(prev => Math.min(categories.length - 1, prev + 2)),
    () => scrollToCategory(categories[selectedIndex].name)
  );

  const filtered = filteredCategories();

  return (
    <section className="py-6 sm:py-12 bg-gradient-to-b from-white to-gray-50" id="categories">
      <div className="container mx-auto px-4">
        <CategoryHeader filter={filter} setFilter={setFilter} />
        <CategoryGrid 
          categories={filtered} 
          selectedIndex={selectedIndex}
          onSelect={scrollToCategory}
        />
      </div>
    </section>
  );
};