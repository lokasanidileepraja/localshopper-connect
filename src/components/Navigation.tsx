
import { memo } from "react";
import { motion } from "framer-motion";
import { NavigationSearchBar } from "./navigation/SearchBar";
import { UserActions } from "./navigation/UserActions";
import { CategoryNav } from "./navigation/CategoryNav";
import { 
  ShoppingBag, 
  Smartphone, 
  ShoppingCart, 
  Star, 
  Tags, 
  Store,
  User,
  Bell,
  Grid2x2
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "./ui/button";
import { TooltipWrapper } from "./common/TooltipWrapper";
import { ThemeToggle } from "./ThemeToggle";
import { useCartStore } from "@/store/cartStore";

export const Navigation = memo(() => {
  const location = useLocation();
  const { totalItems } = useCartStore();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const mainNavItems = [
    { path: "/categories", label: "Browse Gadgets", icon: Smartphone },
    { path: "/enhanced-price-compare", label: "Compare Prices", icon: Tags },
    { path: "/stores", label: "Stores", icon: Store },
    { path: "/categories", label: "All Categories", icon: Grid2x2 },
    { path: "/rewards", label: "Rewards", icon: Star },
  ];

  return (
    <motion.nav 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ 
        duration: 0.5, 
        type: "spring",
        stiffness: 100,
        damping: 20
      }}
      className="fixed top-0 left-0 right-0 z-50 bg-white/70 dark:bg-gray-900/80 backdrop-blur-xl border-b border-white/10 dark:border-gray-800/30 shadow-sm"
    >
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center gap-2" role="navigation" aria-label="Main Navigation">
          <Link to="/" className="flex items-center gap-2 mr-2 md:mr-4 hover:opacity-80 transition-opacity" aria-label="TechLocator home">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center"
            >
              <ShoppingBag className="h-5 w-5 text-primary" />
              <span className="font-semibold text-lg hidden sm:block ml-2 bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent">TechLocator</span>
            </motion.div>
          </Link>

          <div className="flex-1 flex justify-center items-center">
            <div className="w-full max-w-sm">
              <NavigationSearchBar />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <TooltipWrapper content="Cart">
                <Button 
                  variant="ghost"
                  size="icon" 
                  asChild
                  className="rounded-full bg-white/10 backdrop-blur-sm border border-white/20 shadow-sm hover:bg-primary/20 hover:text-primary relative transition-all duration-300"
                  aria-label="Shopping cart"
                >
                  <Link to="/cart">
                    <ShoppingCart className="h-[18px] w-[18px]" />
                    {totalItems > 0 && (
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-4 h-4 text-[10px] flex items-center justify-center font-medium"
                      >
                        {totalItems}
                      </motion.span>
                    )}
                  </Link>
                </Button>
              </TooltipWrapper>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ThemeToggle />
            </motion.div>
            
            <UserActions />
          </div>
        </div>
        <CategoryNav />
      </div>
    </motion.nav>
  );
});

Navigation.displayName = "Navigation";
