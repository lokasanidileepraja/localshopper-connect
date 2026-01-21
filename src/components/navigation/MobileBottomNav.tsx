import { Link, useLocation } from "react-router-dom";
import { Home, Search, ShoppingCart, Heart, User, ArrowUp, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { useCartStore } from "@/store/cartStore";
import { Badge } from "@/components/ui/badge";
import { PointsDisplay } from "@/components/gamification/PointsDisplay";

export const MobileBottomNav = () => {
  const location = useLocation();
  const { items, cartTotal } = useCartStore();
  const [showScrollToTop, setShowScrollToTop] = useState(false);
  const [lastTap, setLastTap] = useState<string | null>(null);
  
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

  // Handle tap feedback
  const handleTap = (path: string) => {
    setLastTap(path);
    setTimeout(() => setLastTap(null), 200);
  };

  return (
    <>
      {/* Cart Preview Bar - Shows when cart has items */}
      <AnimatePresence>
        {items.length > 0 && !isActive("/cart") && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-16 left-0 right-0 z-40 px-4 pb-2"
          >
            <Link to="/cart">
              <div className="flex items-center justify-between p-3 rounded-xl bg-primary text-primary-foreground shadow-lg">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <ShoppingCart className="h-5 w-5" />
                    <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-background text-primary text-xs font-bold rounded-full flex items-center justify-center">
                      {items.length}
                    </span>
                  </div>
                  <span className="font-medium">{items.length} item{items.length > 1 ? 's' : ''}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-bold">₹{cartTotal.toLocaleString()}</span>
                  <ArrowUp className="h-4 w-4 rotate-90" />
                </div>
              </div>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Navigation */}
      <motion.div
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur-xl border-t border-border z-50 h-16 px-2 pb-safe"
      >
        <div className="flex items-center justify-around h-full max-w-md mx-auto">
          <NavItem 
            to="/"
            icon={Home}
            label="Home"
            isActive={isActive("/")}
            onTap={() => handleTap("/")}
            isTapped={lastTap === "/"}
          />
          <NavItem 
            to="/search"
            icon={Search}
            label="Search"
            isActive={isActive("/search")}
            onTap={() => handleTap("/search")}
            isTapped={lastTap === "/search"}
          />
          <NavItem 
            to="/cart"
            icon={ShoppingCart}
            label="Cart"
            isActive={isActive("/cart")}
            badge={items.length > 0 ? items.length : undefined}
            onTap={() => handleTap("/cart")}
            isTapped={lastTap === "/cart"}
          />
          <NavItem 
            to="/wishlist"
            icon={Heart}
            label="Wishlist"
            isActive={isActive("/wishlist")}
            onTap={() => handleTap("/wishlist")}
            isTapped={lastTap === "/wishlist"}
          />
          <NavItem 
            to="/profile"
            icon={User}
            label="Profile"
            isActive={isActive("/profile")}
            showPoints
            onTap={() => handleTap("/profile")}
            isTapped={lastTap === "/profile"}
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
            className={cn(
              "fixed right-4 z-50",
              items.length > 0 ? "bottom-36" : "bottom-20",
              "bg-primary text-primary-foreground rounded-full p-3 shadow-lg"
            )}
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
  onTap: () => void;
  isTapped: boolean;
}

const NavItem = ({ to, icon: Icon, label, isActive, badge, showPoints, onTap, isTapped }: NavItemProps) => {
  return (
    <Link
      to={to}
      onClick={onTap}
      className="relative flex flex-col items-center justify-center w-16 h-full"
    >
      <motion.div
        animate={{ 
          scale: isTapped ? 0.9 : 1,
        }}
        transition={{ duration: 0.1 }}
        className={cn(
          "flex flex-col items-center justify-center transition-colors",
          isActive ? "text-primary" : "text-muted-foreground"
        )}
      >
        <div className="relative">
          <Icon className="h-5 w-5" />
          {badge !== undefined && (
            <Badge 
              className="absolute -top-2 -right-3 h-4 min-w-4 p-0 flex items-center justify-center text-[10px] rounded-full" 
              variant="default"
            >
              {badge > 9 ? "9+" : badge}
            </Badge>
          )}
        </div>
        <span className={cn(
          "text-[10px] mt-1 font-medium transition-colors",
          isActive ? "text-primary" : "text-muted-foreground"
        )}>
          {label}
        </span>
        
        {/* Active Indicator */}
        {isActive && (
          <motion.div
            layoutId="activeTab"
            className="absolute -bottom-0 w-8 h-0.5 bg-primary rounded-full"
          />
        )}
      </motion.div>
      
      {showPoints && isActive && (
        <div className="absolute -top-3">
          <PointsDisplay size="sm" showPopover={false} />
        </div>
      )}
    </Link>
  );
};
