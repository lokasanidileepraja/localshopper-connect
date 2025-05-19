
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
  Grid2x2
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "./ui/button";
import { TooltipWrapper } from "./common/TooltipWrapper";
import { ThemeToggle } from "./ThemeToggle";
import { useCartStore } from "@/store/cartStore";
import { useToast } from "@/hooks/use-toast";

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
      className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b shadow-sm"
    >
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center gap-2 md:gap-4" role="navigation" aria-label="Main Navigation">
          <Link to="/" className="flex items-center gap-2 mr-2 md:mr-4 hover:opacity-80 transition-opacity" aria-label="TechLocator home">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ShoppingBag className="h-6 w-6 text-primary" />
            </motion.div>
            <span className="font-semibold text-lg hidden sm:block text-gradient-primary">TechLocator</span>
          </Link>

          <div className="flex-1 flex justify-center items-center gap-2">
            {mainNavItems.map(({ path, label, icon: Icon }) => (
              <motion.div
                key={label}
                whileHover={{ y: -2 }}
                whileTap={{ y: 0 }}
              >
                <TooltipWrapper content={label}>
                  <Button 
                    variant={isActive(path) ? "default" : "ghost"} 
                    size="icon" 
                    asChild
                    className="rounded-full text-foreground hover:text-primary hover:bg-secondary transition-all duration-300"
                    aria-label={label}
                  >
                    <Link to={path}>
                      <Icon className="h-5 w-5" />
                    </Link>
                  </Button>
                </TooltipWrapper>
              </motion.div>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <TooltipWrapper content="Cart">
                <Button 
                  variant={isActive("/cart") ? "default" : "ghost"}
                  size="icon" 
                  asChild
                  className="rounded-full text-foreground hover:text-primary hover:bg-secondary relative transition-all duration-300"
                  aria-label="Shopping cart"
                >
                  <Link to="/cart">
                    <ShoppingCart className="h-5 w-5" />
                    {totalItems > 0 && (
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-4 h-4 text-xs flex items-center justify-center"
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
