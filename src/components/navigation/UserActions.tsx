import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Bell, ShoppingCart, User, MessageCircle } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
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
      <Link to="/qa">
        <Button 
          variant="ghost" 
          size="icon" 
          className="relative text-neutral-dark hover:text-primary hover:bg-primary-100 rounded-xl transition-colors duration-300"
        >
          <MessageCircle className="h-5 w-5" />
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
            <Link to="/profile" className="w-full">Profile</Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link to="/notifications" className="w-full">Notifications</Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link to="/cart" className="w-full">Cart</Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link to="/qa" className="w-full">Q&A Community</Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};