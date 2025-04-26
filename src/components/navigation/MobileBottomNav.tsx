
import { Link, useLocation } from "react-router-dom";
import { Home, Search, ShoppingCart, Heart, User, ArrowUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { useCartStore } from "@/store/cartStore";
import { Badge } from "@/components/ui/badge";
import { PointsDisplay } from "@/components/gamification/PointsDisplay";

export const MobileBottomNav = () => {
  const location = useLocation();
  const { items } = useCartStore();
  const [showScrollToTop, setShowScrollToTop] = useState(false);
  
  // Track scroll position to show/hide scroll to top button
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollToTop(window.scrollY > 300);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  
  // Helper function to check if a path is active
  const isActive = (path: string) => {
    if (path === "/") {
      return location.pathname === "/" || location.pathname === "/home";
    }
    return location.pathname.startsWith(path);
  };

  return (
    <>
      {/* Main Navigation */}
      <motion.div
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-950 border-t border-gray-200 dark:border-gray-800 z-50 h-16 px-2"
      >
        <div className="flex items-center justify-around h-full">
          <NavItem 
            to="/"
            icon={Home}
            label="Home"
            isActive={isActive("/")}
          />
          <NavItem 
            to="/search"
            icon={Search}
            label="Search"
            isActive={isActive("/search")}
          />
          <NavItem 
            to="/cart"
            icon={ShoppingCart}
            label="Cart"
            isActive={isActive("/cart")}
            badge={items.length > 0 ? items.length : undefined}
          />
          <NavItem 
            to="/wishlist"
            icon={Heart}
            label="Wishlist"
            isActive={isActive("/wishlist")}
          />
          <NavItem 
            to="/profile"
            icon={User}
            label="Profile"
            isActive={isActive("/profile")}
            showPoints
          />
        </div>
      </motion.div>
      
      {/* Scroll to top button */}
      <AnimatePresence>
        {showScrollToTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            whileTap={{ scale: 0.9 }}
            className="fixed bottom-20 right-4 bg-primary text-primary-foreground rounded-full p-3 shadow-lg z-50"
            onClick={scrollToTop}
            aria-label="Scroll to top"
          >
            <ArrowUp className="h-5 w-5" />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
};

interface NavItemProps {
  to: string;
  icon: React.ElementType;
  label: string;
  isActive: boolean;
  badge?: number;
  showPoints?: boolean;
}

const NavItem = ({ to, icon: Icon, label, isActive, badge, showPoints }: NavItemProps) => {
  return (
    <Link
      to={to}
      className={cn(
        "flex flex-col items-center justify-center w-16 h-full transition-colors",
        isActive 
          ? "text-primary" 
          : "text-muted-foreground hover:text-foreground"
      )}
    >
      <div className="relative">
        <Icon className="h-5 w-5" />
        {badge !== undefined && (
          <Badge 
            className="absolute -top-2 -right-2 h-4 w-4 p-0 flex items-center justify-center text-[10px]" 
            variant="default"
          >
            {badge > 9 ? "9+" : badge}
          </Badge>
        )}
      </div>
      <span className="text-xs mt-1">{label}</span>
      {showPoints && isActive && (
        <div className="absolute -top-3">
          <PointsDisplay size="sm" showPopover={false} />
        </div>
      )}
    </Link>
  );
};
