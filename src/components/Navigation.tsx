
import { motion } from "framer-motion";
import { NavigationSearchBar } from "./navigation/SearchBar";
import { UserActions } from "./navigation/UserActions";
import { CategoryNav } from "./navigation/CategoryNav";
import { ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";

export const Navigation = () => {
  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-b shadow-sm"
    >
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center gap-4">
          <Link to="/" className="flex items-center gap-2 mr-4">
            <ShoppingBag className="h-6 w-6 text-primary" />
            <span className="font-semibold text-lg hidden sm:block">TechLocator</span>
          </Link>
          <NavigationSearchBar />
          <UserActions />
        </div>
        <CategoryNav />
      </div>
    </motion.nav>
  );
};
