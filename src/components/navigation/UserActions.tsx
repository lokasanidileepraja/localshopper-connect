import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { 
  ShoppingCart, 
  User, 
  Bell, 
  HelpCircle,
  Home
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const UserActions = () => {
  const { items } = useCart();

  return (
    <div className="flex items-center gap-2">
      <Link to="/">
        <Button 
          variant="ghost" 
          size="icon"
          className="relative text-neutral-dark hover:text-primary hover:bg-primary-100 rounded-xl transition-colors duration-300"
        >
          <Home className="h-5 w-5" />
        </Button>
      </Link>

      <Link to="/cart">
        <Button 
          variant="ghost" 
          size="icon"
          className="relative text-neutral-dark hover:text-primary hover:bg-primary-100 rounded-xl transition-colors duration-300"
        >
          <ShoppingCart className="h-5 w-5" />
          {items.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-primary text-white rounded-full w-5 h-5 text-xs flex items-center justify-center animate-fadeIn">
              {items.length}
            </span>
          )}
        </Button>
      </Link>
      
      <Link to="/notifications">
        <Button 
          variant="ghost" 
          size="icon"
          className="relative text-neutral-dark hover:text-primary hover:bg-primary-100 rounded-xl transition-colors duration-300"
        >
          <Bell className="h-5 w-5" />
        </Button>
      </Link>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button 
            variant="ghost" 
            size="icon"
            className="text-neutral-dark hover:text-primary hover:bg-primary-100 rounded-xl transition-colors duration-300"
          >
            <User className="h-5 w-5" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
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