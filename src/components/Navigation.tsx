
import { memo } from "react";
import { motion } from "framer-motion";
import { NavigationSearchBar } from "./navigation/SearchBar";
import { UserActions } from "./navigation/UserActions";
import { CategoryNav } from "./navigation/CategoryNav";
import { ShoppingBag, Home, Smartphone, ShoppingCart, Star, Tags } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "./ui/button";
import { TooltipWrapper } from "./common/TooltipWrapper";

export const Navigation = memo(() => {
  const location = useLocation();

  // Determine if a link is active
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-b shadow-sm"
    >
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center gap-2 md:gap-4" role="navigation" aria-label="Main Navigation">
          <TooltipWrapper content="LocalShopper Connect">
            <Link to="/" className="flex items-center gap-2 mr-2 md:mr-4" aria-label="LocalShopper Connect home">
              <ShoppingBag className="h-6 w-6 text-primary" />
              <span className="font-semibold text-lg hidden sm:block">TechLocator</span>
            </Link>
          </TooltipWrapper>
          
          <NavigationSearchBar />
          
          <TooltipWrapper content="Home">
            <Button 
              variant={isActive("/") || isActive("/home") ? "default" : "ghost"} 
              size="icon" 
              asChild
              className="rounded-full text-foreground hover:text-primary hover:bg-secondary"
              aria-label="Home"
            >
              <Link to="/">
                <Home className="h-5 w-5" />
              </Link>
            </Button>
          </TooltipWrapper>
          
          <TooltipWrapper content="Electronics">
            <Button 
              variant={isActive("/category/electronics") ? "default" : "ghost"} 
              size="icon" 
              asChild
              className="rounded-full text-foreground hover:text-primary hover:bg-secondary"
              aria-label="Electronics"
            >
              <Link to="/category/electronics">
                <Smartphone className="h-5 w-5" />
              </Link>
            </Button>
          </TooltipWrapper>
          
          <TooltipWrapper content="Compare Prices">
            <Button 
              variant={isActive("/enhanced-price-compare") ? "default" : "ghost"} 
              size="icon" 
              asChild
              className="rounded-full text-foreground hover:text-primary hover:bg-secondary"
              aria-label="Compare prices"
            >
              <Link to="/enhanced-price-compare">
                <Tags className="h-5 w-5" />
              </Link>
            </Button>
          </TooltipWrapper>
          
          <TooltipWrapper content="Stores">
            <Button 
              variant={isActive("/stores") ? "default" : "ghost"} 
              size="icon" 
              asChild
              className="rounded-full text-foreground hover:text-primary hover:bg-secondary"
              aria-label="Stores"
            >
              <Link to="/stores">
                <ShoppingCart className="h-5 w-5" />
              </Link>
            </Button>
          </TooltipWrapper>
          
          <TooltipWrapper content="Rewards">
            <Button 
              variant={isActive("/rewards") ? "default" : "ghost"}
              asChild
              size="icon"
              className="rounded-full text-accent hover:text-foreground hover:bg-[#ffd70026]"
              aria-label="Rewards"
            >
              <Link to="/rewards">
                <Star className="h-5 w-5" />
              </Link>
            </Button>
          </TooltipWrapper>
          
          <UserActions />
        </div>
        <CategoryNav />
      </div>
    </motion.nav>
  );
});

Navigation.displayName = "Navigation";
