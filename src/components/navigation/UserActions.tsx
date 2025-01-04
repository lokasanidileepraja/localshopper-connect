import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  ShoppingCart, 
  User, 
  Bell, 
  HelpCircle,
  Menu 
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const UserActions = () => {
  return (
    <div className="flex items-center gap-2">
      <Link to="/cart">
        <Button variant="ghost" size="icon">
          <ShoppingCart className="h-5 w-5" />
        </Button>
      </Link>
      
      <Link to="/notifications">
        <Button variant="ghost" size="icon">
          <Bell className="h-5 w-5" />
        </Button>
      </Link>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <Menu className="h-5 w-5" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
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