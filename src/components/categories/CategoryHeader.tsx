import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";

interface CategoryHeaderProps {
  filter: string;
  setFilter: (value: string) => void;
}

export const CategoryHeader = ({ filter, setFilter }: CategoryHeaderProps) => {
  return (
    <>
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
    </>
  );
};