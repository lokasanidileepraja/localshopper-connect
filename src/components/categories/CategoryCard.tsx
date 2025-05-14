
import { motion } from "framer-motion";
import { CategoryCardProps } from "@/types/categories";
import { useIsMobile } from "@/hooks/use-mobile";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { memo } from "react";

export const CategoryCard = memo(({ category, onSelect, isSelected, index }: CategoryCardProps) => {
  const isMobile = useIsMobile();
  const Icon = category.icon;
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleInteraction = () => {
    onSelect(category.name);
    navigate(`/category/${category.name.toLowerCase()}`);
    toast({
      title: `Selected ${category.name}`,
      description: "Loading category details...",
      duration: 2000,
    });
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5,
        delay: index * 0.1,
        ease: [0.6, -0.05, 0.01, 0.99]
      }
    },
    hover: { 
      scale: isMobile ? 1.02 : 1.05,
      y: -5,
      transition: {
        duration: 0.2,
        ease: "easeInOut"
      }
    },
    tap: {
      scale: 0.95
    }
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      whileTap="tap"
      className={`
        ${category.color} 
        rounded-xl p-4 sm:p-6 
        cursor-pointer 
        transition-all 
        group
        backdrop-blur-sm
        ${isSelected ? 'ring-2 ring-primary shadow-lg' : ''}
        hover:shadow-xl
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary
        transform-gpu
      `}
      onClick={handleInteraction}
      onKeyPress={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          handleInteraction();
        }
      }}
      role="button"
      tabIndex={0}
      aria-label={`Browse ${category.name} category`}
      aria-pressed={isSelected}
    >
      <div className="flex flex-col items-center text-center space-y-3">
        <motion.div
          whileHover={{ rotate: 360, scale: 1.2 }}
          transition={{ duration: 0.5, type: "spring" }}
          className="relative"
        >
          <Icon className={`
            ${isMobile ? 'h-6 w-6' : 'h-8 w-8 sm:h-10 sm:w-10'} 
            text-gray-700
            group-hover:text-primary 
            transition-colors
            relative z-10
          `} />
          <motion.div
            className="absolute inset-0 bg-primary/10 rounded-full -z-0"
            initial={{ scale: 0 }}
            animate={{ scale: isSelected ? 1.5 : 1 }}
            transition={{ duration: 0.3 }}
          />
        </motion.div>
        <h3 className="font-semibold text-sm sm:text-lg mb-1 group-hover:text-primary transition-colors">
          {category.name}
        </h3>
        <motion.p 
          initial={{ opacity: 0, height: 0 }}
          animate={{ 
            opacity: 1, 
            height: "auto",
            transition: { duration: 0.3 }
          }}
          className="text-xs sm:text-sm text-gray-600 
            group-hover:text-gray-800
            transition-all duration-200 
            line-clamp-2 max-w-[200px]"
        >
          {category.description}
        </motion.p>
      </div>
    </motion.div>
  );
});

CategoryCard.displayName = 'CategoryCard';
