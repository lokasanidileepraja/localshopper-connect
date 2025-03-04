
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { 
  ShoppingCart, 
  User, 
  Bell, 
  HelpCircle,
  MapPin,
  Store
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { motion } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";

export const UserActions = () => {
  const { totalItems } = useCart();
  const isMobile = useIsMobile();

  return (
    <div className="flex items-center gap-1">
      <Link to="/stores">
        <Button 
          variant="ghost" 
          size="icon"
          className="relative rounded-full text-foreground hover:text-primary hover:bg-secondary"
        >
          <MapPin className="h-5 w-5" />
        </Button>
      </Link>

      <Link to="/cart">
        <Button 
          variant="ghost" 
          size="icon"
          className="relative rounded-full text-foreground hover:text-primary hover:bg-secondary"
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
      
      <Link to="/notifications">
        <Button 
          variant="ghost" 
          size="icon"
          className="relative rounded-full text-foreground hover:text-primary hover:bg-secondary"
        >
          <Bell className="h-5 w-5" />
        </Button>
      </Link>

      <Link to="/retailer">
        <Button 
          variant={isMobile ? "ghost" : "outline"}
          size={isMobile ? "icon" : "sm"}
          className={`relative ${isMobile ? 'rounded-full' : 'rounded-md'} hover:bg-primary hover:text-primary-foreground`}
        >
          <Store className="h-5 w-5" />
          {!isMobile && <span className="ml-1">Retailer</span>}
        </Button>
      </Link>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button 
            variant="ghost" 
            size="icon"
            className="rounded-full text-foreground hover:text-primary hover:bg-secondary"
          >
            <User className="h-5 w-5" />
          </Button>
        </DropdownMenuTrigger>
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
