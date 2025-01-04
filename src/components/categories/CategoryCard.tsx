import { motion } from "framer-motion";
import { CategoryCardProps } from "@/types/categories";
import { useIsMobile } from "@/hooks/use-mobile";

export const CategoryCard = ({ category, onSelect, isSelected, index }: CategoryCardProps) => {
  const isMobile = useIsMobile();
  const Icon = category.icon;

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5,
        delay: index * 0.1,
        ease: "easeOut"
      }
    },
    hover: { 
      scale: isMobile ? 1.02 : 1.05,
      y: -5,
      transition: {
        duration: 0.2,
        ease: "easeInOut"
      }
    }
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      className={`
        ${category.color} 
        rounded-xl p-4 sm:p-6 
        cursor-pointer 
        transition-all 
        group
        ${isSelected ? 'ring-2 ring-primary shadow-lg' : ''}
        hover:shadow-xl
      `}
      onClick={() => onSelect(category.name)}
      role="button"
      tabIndex={0}
      aria-label={`Browse ${category.name} category`}
      aria-pressed={isSelected}
      onKeyPress={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          onSelect(category.name);
        }
      }}
    >
      <div className="flex flex-col items-center text-center space-y-3">
        <motion.div
          whileHover={{ rotate: 360 }}
          transition={{ duration: 0.5 }}
        >
          <Icon className={`
            ${isMobile ? 'h-6 w-6' : 'h-8 w-8 sm:h-10 sm:w-10'} 
            text-gray-700
            group-hover:text-primary 
            transition-colors
          `} />
        </motion.div>
        <h3 className="font-semibold text-sm sm:text-lg mb-1">{category.name}</h3>
        <p className="text-xs sm:text-sm text-gray-600 
          opacity-0 group-hover:opacity-100 
          transition-opacity duration-200 
          line-clamp-2 max-w-[200px]"
        >
          {category.description}
        </p>
      </div>
    </motion.div>
  );
};