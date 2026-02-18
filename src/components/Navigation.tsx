import { memo } from "react";
import { motion } from "framer-motion";
import { ShoppingBag, Search, Bell } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "./ui/button";
import { ThemeToggle } from "./ThemeToggle";
import { useCartStore } from "@/store/cartStore";
import { useIsMobile } from "@/hooks/use-mobile";
import { CategoryNav } from "./navigation/CategoryNav";

export const Navigation = memo(() => {
  const location = useLocation();
  const { totalItems } = useCartStore();
  const isMobile = useIsMobile();

  return (
    <motion.nav 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border"
    >
      {/* Main Header Bar - Compact for mobile */}
      <div className="flex items-center justify-between px-4 h-12 md:h-14">
        <Link to="/" className="flex items-center gap-1.5" aria-label="TechLocator home">
          <ShoppingBag className="h-5 w-5 text-primary" />
          <span className="font-bold text-base text-foreground">TechLocator</span>
        </Link>

        <div className="flex items-center gap-1">
          {/* Search - mobile gets icon only */}
          <Button variant="ghost" size="icon" asChild className="h-9 w-9 rounded-full">
            <Link to="/search" aria-label="Search">
              <Search className="h-[18px] w-[18px] text-muted-foreground" />
            </Link>
          </Button>

          <Button variant="ghost" size="icon" asChild className="h-9 w-9 rounded-full relative">
            <Link to="/notifications" aria-label="Notifications">
              <Bell className="h-[18px] w-[18px] text-muted-foreground" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-destructive rounded-full" />
            </Link>
          </Button>

          {!isMobile && <ThemeToggle />}
        </div>
      </div>

      {/* Category Pills - horizontal scroll */}
      <CategoryNav />
    </motion.nav>
  );
});

Navigation.displayName = "Navigation";
