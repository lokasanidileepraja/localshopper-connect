import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Bell, ShoppingCart, User } from "lucide-react";
import { useCart } from "@/contexts/CartContext";

export const Navigation = () => {
  const { items } = useCart();

  return (
    <nav className="fixed top-0 right-0 z-50 p-4">
      <div className="flex items-center gap-2">
        <Link to="/notifications">
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
          </Button>
        </Link>
        <Link to="/cart">
          <Button variant="ghost" size="icon" className="relative">
            <ShoppingCart className="h-5 w-5" />
            {items.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground rounded-full w-4 h-4 text-xs flex items-center justify-center">
                {items.length}
              </span>
            )}
          </Button>
        </Link>
        <Link to="/profile">
          <Button variant="ghost" size="icon">
            <User className="h-5 w-5" />
          </Button>
        </Link>
      </div>
    </nav>
  );
};