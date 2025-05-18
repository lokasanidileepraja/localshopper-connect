
import { motion } from "framer-motion";
import { CategoryCardProps } from "@/types/categories";
import { useIsMobile } from "@/hooks/use-mobile";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { memo, useCallback } from "react";

export const CategoryCard = memo(({ category, onSelect, isSelected, index }: CategoryCardProps) => {
  const isMobile = useIsMobile();
  const Icon = category.icon;
  const { toast } = useToast();
  const navigate = useNavigate();

  // Use useCallback to create stable function reference
  const handleInteraction = useCallback(() => {
    onSelect(category.name);
    const categoryPath = `/category/${category.name.toLowerCase()}`;
    navigate(categoryPath);
    toast({
      title: `Selected ${category.name}`,
      description: "Loading category details...",
      duration: 2000,
    });
  }, [category.name, navigate, onSelect, toast]);

  // Memoize event handler to prevent recreating on each render
  const handleKeyPress = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleInteraction();
    }
  }, [handleInteraction]);

  // Don't compute these on every render - memoize instead
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.3,  // Reduce animation duration for better performance
        delay: Math.min(index * 0.05, 0.5),  // Cap the maximum delay
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
        will-change-transform
      `}
      onClick={handleInteraction}
      onKeyPress={handleKeyPress}
      role="button"
      tabIndex={0}
      aria-label={`Browse ${category.name} category`}
      aria-pressed={isSelected}
    >
      <div className="flex flex-col items-center text-center space-y-3">
        <motion.div
          whileHover={{ rotate: 10, scale: 1.1 }}  // Reduce rotation and scale for better performance
          transition={{ duration: 0.3, type: "spring", stiffness: 200 }}
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
        <p 
          className="text-xs sm:text-sm text-gray-600 
            group-hover:text-gray-800
            transition-all duration-200 
            line-clamp-2 max-w-[200px]"
        >
          {category.description}
        </p>
      </div>
    </motion.div>
  );
});

CategoryCard.displayName = 'CategoryCard';
