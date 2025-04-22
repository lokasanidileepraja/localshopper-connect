
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cartStore";
import { 
  ShoppingCart, 
  User, 
  Bell, 
  HelpCircle,
  MapPin,
  Store,
  Heart
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { motion } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";
import { TooltipWrapper } from "@/components/common/TooltipWrapper";

export const UserActions = () => {
  const { totalItems } = useCartStore();
  const isMobile = useIsMobile();

  return (
    <div className="flex items-center gap-1">
      <TooltipWrapper content="Find nearby stores">
        <Link to="/stores">
          <Button 
            variant="ghost" 
            size="icon"
            className="relative rounded-full text-foreground hover:text-primary hover:bg-secondary"
            aria-label="Find nearby stores"
          >
            <MapPin className="h-5 w-5" />
          </Button>
        </Link>
      </TooltipWrapper>

      <TooltipWrapper content={`Shopping cart${totalItems > 0 ? ` (${totalItems} items)` : ''}`}>
        <Link to="/cart">
          <Button 
            variant="ghost" 
            size="icon"
            className="relative rounded-full text-foreground hover:text-primary hover:bg-secondary"
            aria-label="Shopping cart"
          >
            <ShoppingCart className="h-5 w-5" />
            {totalItems > 0 && (
              <motion.span 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-1 -right-1 bg-primary text-white rounded-full w-5 h-5 text-xs flex items-center justify-center"
              >
                {totalItems}
              </motion.span>
            )}
          </Button>
        </Link>
      </TooltipWrapper>
      
      <TooltipWrapper content="Your wishlist">
        <Link to="/wishlist">
          <Button 
            variant="ghost" 
            size="icon"
            className="relative rounded-full text-foreground hover:text-primary hover:bg-secondary"
            aria-label="Your wishlist"
          >
            <Heart className="h-5 w-5" />
          </Button>
        </Link>
      </TooltipWrapper>
      
      <TooltipWrapper content="Notifications">
        <Link to="/notifications">
          <Button 
            variant="ghost" 
            size="icon"
            className="relative rounded-full text-foreground hover:text-primary hover:bg-secondary"
            aria-label="Notifications"
          >
            <Bell className="h-5 w-5" />
          </Button>
        </Link>
      </TooltipWrapper>

      <TooltipWrapper content="Retailer dashboard">
        <Link to="/retailer">
          <Button 
            variant={isMobile ? "ghost" : "outline"}
            size={isMobile ? "icon" : "sm"}
            className={`relative ${isMobile ? 'rounded-full' : 'rounded-md'} hover:bg-primary hover:text-primary-foreground`}
            aria-label="Retailer dashboard"
          >
            <Store className="h-5 w-5" />
            {!isMobile && <span className="ml-1">Retailer</span>}
          </Button>
        </Link>
      </TooltipWrapper>

      <DropdownMenu>
        <TooltipWrapper content="Account menu">
          <DropdownMenuTrigger asChild>
            <Button 
              variant="ghost" 
              size="icon"
              className="rounded-full text-foreground hover:text-primary hover:bg-secondary"
              aria-label="Account menu"
            >
              <User className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
        </TooltipWrapper>
        <DropdownMenuContent align="end" className="w-48 mt-2">
          <DropdownMenuItem asChild>
            <Link to="/profile" className="w-full">
              <User className="h-4 w-4 mr-2" />
              Profile
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link to="/qa" className="w-full">
              <HelpCircle className="h-4 w-4 mr-2" />
              Help & FAQ
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
