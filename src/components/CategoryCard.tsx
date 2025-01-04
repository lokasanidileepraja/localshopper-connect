import { motion } from "framer-motion";
import { CategoryCardProps } from "@/types/categories";
import { useIsMobile } from "@/hooks/use-mobile";

export const CategoryCard = ({ category, onSelect, isSelected, index }: CategoryCardProps) => {
  const isMobile = useIsMobile();
  const Icon = category.icon;

  return (
    <motion.div
      key={category.name}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ 
        opacity: 1, 
        scale: isSelected ? 1.05 : 1,
        boxShadow: isSelected ? "0 4px 12px rgba(0,0,0,0.1)" : "none"
      }}
      whileHover={{ 
        scale: isMobile ? 1.02 : 1.05,
        boxShadow: "0 10px 20px rgba(0,0,0,0.1)"
      }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      className={`${category.color} rounded-xl p-3 sm:p-6 cursor-pointer hover:shadow-lg transition-all group`}
      onClick={() => onSelect(category.name)}
      role="button"
      tabIndex={0}
      aria-label={`Browse ${category.name} category`}
      onKeyPress={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          onSelect(category.name);
        }
      }}
    >
      <div className="flex flex-col items-center text-center">
        <Icon className={`${isMobile ? 'h-5 w-5' : 'h-6 w-6 sm:h-8 sm:w-8'} mb-2 sm:mb-4 group-hover:text-primary transition-colors`} />
        <h3 className="font-semibold text-sm sm:text-base mb-1 sm:mb-2">{category.name}</h3>
        <p className="text-xs sm:text-sm text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity line-clamp-2">
          {category.description}
        </p>
      </div>
    </motion.div>
  );
};