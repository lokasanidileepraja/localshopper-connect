
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
  Heart,
  Users
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuGroup,
  DropdownMenuLabel
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

      <TooltipWrapper content="Referral program">
        <Link to="/referral">
          <Button 
            variant="ghost" 
            size="icon"
            className="relative rounded-full text-foreground hover:text-primary hover:bg-secondary"
            aria-label="Referral program"
          >
            <Users className="h-5 w-5" />
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
        <DropdownMenuContent align="end" className="w-56 mt-2">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem asChild>
              <Link to="/profile" className="w-full cursor-pointer">
                <User className="h-4 w-4 mr-2" />
                Profile
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to="/orders" className="w-full cursor-pointer">
                <ShoppingCart className="h-4 w-4 mr-2" />
                Orders
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to="/location-settings" className="w-full cursor-pointer">
                <MapPin className="h-4 w-4 mr-2" />
                Location Settings
              </Link>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link to="/qa" className="w-full cursor-pointer">
              <HelpCircle className="h-4 w-4 mr-2" />
              Help & FAQ
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link to="/onboarding" className="w-full cursor-pointer">
              <Users className="h-4 w-4 mr-2" />
              App Tour
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
