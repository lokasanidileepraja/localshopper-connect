import { useNavigate } from "react-router-dom";
import { categories } from "@/data/categories";
import { motion } from "framer-motion";
import { ArrowRight, Smartphone, Laptop, Headphones, Watch, Gamepad2, Camera, Monitor, Cpu } from "lucide-react";

interface CategoriesProps {
  onCategorySelect: (category: string) => void;
}

const categoryIcons: Record<string, React.ElementType> = {
  "Mobiles": Smartphone, "Laptops": Laptop, "Audio": Headphones, "Wearables": Watch,
  "Gaming": Gamepad2, "Cameras": Camera, "TVs": Monitor, "Accessories": Cpu,
};

const categoryColors: Record<string, string> = {
  "Mobiles": "bg-blue-500/10 text-blue-600", "Laptops": "bg-slate-500/10 text-slate-600",
  "Audio": "bg-purple-500/10 text-purple-600", "Wearables": "bg-rose-500/10 text-rose-600",
  "Gaming": "bg-green-500/10 text-green-600", "Cameras": "bg-amber-500/10 text-amber-600",
  "TVs": "bg-cyan-500/10 text-cyan-600", "Accessories": "bg-gray-500/10 text-gray-600",
};

export const Categories = ({ onCategorySelect }: CategoriesProps) => {
  const navigate = useNavigate();

  const handleSelect = (name: string) => {
    onCategorySelect(name);
    navigate(`/category/${name.toLowerCase()}`);
  };

  return (
    <section className="px-4 py-5">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-base font-bold text-foreground">Categories</h2>
        <button
          onClick={() => navigate("/categories")}
          className="text-xs font-medium text-primary flex items-center gap-0.5"
        >
          See all <ArrowRight className="h-3 w-3" />
        </button>
      </div>

      {/* Horizontal Scroll */}
      <div className="flex gap-3 overflow-x-auto scrollbar-hide -mx-4 px-4 pb-1">
        {categories.map((category, index) => {
          const Icon = categoryIcons[category.name] || Cpu;
          const color = categoryColors[category.name] || "bg-muted text-muted-foreground";
          
          return (
            <motion.button
              key={category.name}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.04 }}
              onClick={() => handleSelect(category.name)}
              className="flex flex-col items-center gap-2 shrink-0 w-16 active:scale-95 transition-transform"
            >
              <div className={`w-14 h-14 rounded-2xl ${color} flex items-center justify-center`}>
                <Icon className="h-6 w-6" />
              </div>
              <span className="text-[11px] font-medium text-foreground text-center leading-tight line-clamp-1">
                {category.name}
              </span>
            </motion.button>
          );
        })}
      </div>
    </section>
  );
};
