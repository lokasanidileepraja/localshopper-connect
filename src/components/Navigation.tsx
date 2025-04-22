
import { memo } from "react";
import { motion } from "framer-motion";
import { NavigationSearchBar } from "./navigation/SearchBar";
import { UserActions } from "./navigation/UserActions";
import { CategoryNav } from "./navigation/CategoryNav";
import { 
  ShoppingBag, 
  Home, 
  Smartphone, 
  ShoppingCart, 
  Star, 
  Tags, 
  Store,
  MapPin,
  User,
  Bell,
  HeartIcon,
  BookOpen
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "./ui/button";
import { TooltipWrapper } from "./common/TooltipWrapper";
import { ThemeToggle } from "./ThemeToggle";

export const Navigation = memo(() => {
  const location = useLocation();

  // Determine if a link is active
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  // Main navigation items
  const mainNavItems = [
    { path: "/home", label: "Home", icon: Home },
    { path: "/category/electronics", label: "Electronics", icon: Smartphone },
    { path: "/enhanced-price-compare", label: "Compare Prices", icon: Tags },
    { path: "/stores", label: "Stores", icon: Store },
    { path: "/nearby-stores", label: "Nearby", icon: MapPin },
    { path: "/wishlist", label: "Wishlist", icon: HeartIcon },
    { path: "/rewards", label: "Rewards", icon: Star },
  ];

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-b shadow-sm"
    >
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center gap-2 md:gap-4" role="navigation" aria-label="Main Navigation">
          <TooltipWrapper content="TechLocator">
            <Link to="/" className="flex items-center gap-2 mr-2 md:mr-4" aria-label="TechLocator home">
              <ShoppingBag className="h-6 w-6 text-primary" />
              <span className="font-semibold text-lg hidden sm:block">TechLocator</span>
            </Link>
          </TooltipWrapper>
          
          <NavigationSearchBar />
          
          {mainNavItems.map(({ path, label, icon: Icon }) => (
            <TooltipWrapper key={path} content={label}>
              <Button 
                variant={isActive(path) ? "default" : "ghost"} 
                size="icon" 
                asChild
                className="rounded-full text-foreground hover:text-primary hover:bg-secondary"
                aria-label={label}
              >
                <Link to={path}>
                  <Icon className="h-5 w-5" />
                </Link>
              </Button>
            </TooltipWrapper>
          ))}
          
          <TooltipWrapper content="Cart">
            <Button 
              variant={isActive("/cart") ? "default" : "ghost"}
              size="icon" 
              asChild
              className="rounded-full text-foreground hover:text-primary hover:bg-secondary relative"
              aria-label="Shopping cart"
            >
              <Link to="/cart">
                <ShoppingCart className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-4 h-4 text-xs flex items-center justify-center">
                  0
                </span>
              </Link>
            </Button>
          </TooltipWrapper>
          
          <TooltipWrapper content="Notifications">
            <Button 
              variant={isActive("/notifications") ? "default" : "ghost"}
              size="icon" 
              asChild
              className="rounded-full text-foreground hover:text-primary hover:bg-secondary relative"
              aria-label="Notifications"
            >
              <Link to="/notifications">
                <Bell className="h-5 w-5" />
              </Link>
            </Button>
          </TooltipWrapper>
          
          <TooltipWrapper content="Profile">
            <Button 
              variant={isActive("/profile") ? "default" : "ghost"}
              size="icon" 
              asChild
              className="rounded-full text-foreground hover:text-primary hover:bg-secondary"
              aria-label="Profile"
            >
              <Link to="/profile">
                <User className="h-5 w-5" />
              </Link>
            </Button>
          </TooltipWrapper>
          
          <ThemeToggle />
          
          <UserActions />
        </div>
        <CategoryNav />
      </div>
    </motion.nav>
  );
});

Navigation.displayName = "Navigation";
