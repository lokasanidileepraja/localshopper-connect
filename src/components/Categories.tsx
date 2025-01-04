import { motion } from "framer-motion";
import { Smartphone, Laptop, Headphones, Camera, Watch, Tv, Speaker, Gamepad } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";
import { useKeyboardNav } from "@/hooks/useKeyboardNav";
import { useState } from "react";
import { useCategoryFilter } from "@/hooks/useCategoryFilter";
import { CategoryCard } from "@/components/CategoryCard";
import { Input } from "@/components/ui/input";
import { Category } from "@/types/categories";

const categories: Category[] = [
  { name: "Phones", icon: Smartphone, color: "bg-blue-100", description: "Latest smartphones and accessories" },
  { name: "Laptops", icon: Laptop, color: "bg-green-100", description: "Powerful laptops for work and play" },
  { name: "Audio", icon: Headphones, color: "bg-yellow-100", description: "High-quality audio equipment" },
  { name: "Cameras", icon: Camera, color: "bg-red-100", description: "Professional cameras and gear" },
  { name: "Wearables", icon: Watch, color: "bg-purple-100", description: "Smart watches and fitness trackers" },
  { name: "TVs", icon: Tv, color: "bg-pink-100", description: "4K and 8K Smart TVs" },
  { name: "Speakers", icon: Speaker, color: "bg-indigo-100", description: "Premium sound systems" },
  { name: "Gaming", icon: Gamepad, color: "bg-orange-100", description: "Gaming consoles and accessories" }
];

export const Categories = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const isMobile = useIsMobile();
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
    () => setSelectedIndex(prev => Math.max(0, prev - (isMobile ? 2 : 4))),
    () => setSelectedIndex(prev => Math.min(categories.length - 1, prev + (isMobile ? 2 : 4))),
    () => scrollToCategory(categories[selectedIndex].name)
  );

  const filtered = filteredCategories();

  return (
    <section className="py-6 sm:py-12 bg-gradient-to-b from-white to-gray-50" id="categories">
      <div className="container mx-auto px-4">
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xl sm:text-2xl font-bold text-center mb-6 sm:mb-8"
        >
          Browse Categories
        </motion.h2>
        
        <div className="max-w-md mx-auto mb-8">
          <Input
            type="text"
            placeholder="Search categories..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="w-full"
          />
        </div>

        <div className={`grid grid-cols-2 ${isMobile ? 'gap-3' : 'sm:grid-cols-4 gap-6'}`}>
          {filtered.map((category, index) => (
            <CategoryCard
              key={category.name}
              category={category}
              onSelect={scrollToCategory}
              isSelected={selectedIndex === index}
              index={index}
            />
          ))}
        </div>

        {filtered.length === 0 && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-gray-500 mt-8"
          >
            No categories found matching your search.
          </motion.p>
        )}
      </div>
    </section>
  );
};