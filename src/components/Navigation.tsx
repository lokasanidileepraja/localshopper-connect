import { motion } from "framer-motion";
import { NavigationSearchBar } from "./navigation/SearchBar";
import { UserActions } from "./navigation/UserActions";
import { CategoryNav } from "./navigation/CategoryNav";

export const Navigation = () => {
  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-neutral-light/20"
    >
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center gap-4">
          <NavigationSearchBar />
          <UserActions />
        </div>
        <CategoryNav />
      </div>
    </motion.nav>
  );
};