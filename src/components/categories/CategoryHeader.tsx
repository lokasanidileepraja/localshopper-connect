
import { motion } from "framer-motion";
import { Dispatch, SetStateAction } from "react";

interface CategoryHeaderProps {
  filter: string;
  setFilter: Dispatch<SetStateAction<string>>;
}

export const CategoryHeader = ({ filter, setFilter }: CategoryHeaderProps) => {
  const containerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6 mb-8"
    >
      <motion.h2 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-2xl sm:text-3xl font-bold text-center bg-gradient-to-r from-primary/80 to-secondary/80 
          bg-clip-text text-transparent"
      >
        Browse Categories
      </motion.h2>
    </motion.div>
  );
};
