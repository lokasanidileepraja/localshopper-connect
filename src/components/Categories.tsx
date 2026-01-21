import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useState, useEffect } from "react";
import { useCategoryFilter } from "@/hooks/useCategoryFilter";
import { useKeyboardNav } from "@/hooks/useKeyboardNav";
import { categories } from "@/data/categories";
import { motion } from "framer-motion";
import { ArrowRight, Smartphone, Laptop, Headphones, Watch, Gamepad2, Camera, Monitor, Cpu } from "lucide-react";

interface CategoriesProps {
  onCategorySelect: (category: string) => void;
}

const categoryIcons: Record<string, React.ElementType> = {
  "Mobiles": Smartphone,
  "Laptops": Laptop,
  "Audio": Headphones,
  "Wearables": Watch,
  "Gaming": Gamepad2,
  "Cameras": Camera,
  "TVs": Monitor,
  "Accessories": Cpu,
};

const categoryColors: Record<string, string> = {
  "Mobiles": "from-blue-500 to-indigo-600",
  "Laptops": "from-slate-600 to-slate-800",
  "Audio": "from-purple-500 to-violet-600",
  "Wearables": "from-rose-500 to-pink-600",
  "Gaming": "from-green-500 to-emerald-600",
  "Cameras": "from-amber-500 to-orange-600",
  "TVs": "from-cyan-500 to-teal-600",
  "Accessories": "from-gray-500 to-zinc-600",
};

export const Categories = ({ onCategorySelect }: CategoriesProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const { filter, setFilter, filteredCategories } = useCategoryFilter(categories);

  const handleCategorySelect = (categoryName: string) => {
    onCategorySelect(categoryName);
    const categoryPath = `/category/${categoryName.toLowerCase()}`;
    navigate(categoryPath);
    toast({
      title: "Category Selected",
      description: `Browsing ${categoryName} products`,
    });
  };

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

  useEffect(() => {
    setSelectedIndex(0);
  }, [filter]);

  const filtered = filteredCategories();

  return (
    <section className="py-20 px-6 lg:px-8" id="categories">
      <div className="container mx-auto max-w-7xl">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Browse Categories
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Find exactly what you're looking for across our wide range of electronics
          </p>
        </motion.div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
          {filtered.map((category, index) => {
            const IconComponent = categoryIcons[category.name] || Cpu;
            const colorClass = categoryColors[category.name] || "from-gray-500 to-gray-600";
            
            return (
              <motion.button
                key={category.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                onClick={() => handleCategorySelect(category.name)}
                className={`
                  group relative p-6 rounded-2xl bg-card border border-border
                  hover:border-primary/20 hover:shadow-lg
                  transition-all duration-300 hover:-translate-y-1
                  text-left focus:outline-none focus:ring-2 focus:ring-primary/50
                  ${selectedIndex === index ? 'ring-2 ring-primary/50' : ''}
                `}
              >
                {/* Icon */}
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${colorClass} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <IconComponent className="h-6 w-6 text-white" />
                </div>
                
                {/* Content */}
                <h3 className="text-lg font-semibold text-foreground mb-1">{category.name}</h3>
                <p className="text-sm text-muted-foreground">50+ Products</p>
                
                {/* Arrow */}
                <ArrowRight className="absolute bottom-6 right-6 h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
              </motion.button>
            );
          })}
        </div>

        {/* View All Link */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mt-10"
        >
          <button
            onClick={() => navigate("/categories")}
            className="inline-flex items-center gap-2 text-primary font-medium hover:gap-3 transition-all"
          >
            View All Categories
            <ArrowRight className="h-4 w-4" />
          </button>
        </motion.div>
      </div>
    </section>
  );
};
