import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home, Search, Map, Bell, ShoppingCart, User } from "lucide-react";
import { useCart } from "@/contexts/CartContext";

export const Navigation = () => {
  const { items } = useCart();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-background border-t md:relative md:border-t-0 md:border-b z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-2 md:py-4">
          <Link to="/">
            <Button variant="ghost" size="sm" className="flex flex-col items-center gap-1">
              <Home className="h-5 w-5" />
              <span className="text-xs">Home</span>
            </Button>
          </Link>
          <Link to="/price-compare">
            <Button variant="ghost" size="sm" className="flex flex-col items-center gap-1">
              <Search className="h-5 w-5" />
              <span className="text-xs">Compare</span>
            </Button>
          </Link>
          <Link to="/store-map">
            <Button variant="ghost" size="sm" className="flex flex-col items-center gap-1">
              <Map className="h-5 w-5" />
              <span className="text-xs">Stores</span>
            </Button>
          </Link>
          <Link to="/notifications">
            <Button variant="ghost" size="sm" className="flex flex-col items-center gap-1 relative">
              <Bell className="h-5 w-5" />
              <span className="text-xs">Alerts</span>
            </Button>
          </Link>
          <Link to="/cart">
            <Button variant="ghost" size="sm" className="flex flex-col items-center gap-1 relative">
              <ShoppingCart className="h-5 w-5" />
              {items.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground rounded-full w-4 h-4 text-xs flex items-center justify-center">
                  {items.length}
                </span>
              )}
              <span className="text-xs">Cart</span>
            </Button>
          </Link>
          <Link to="/profile">
            <Button variant="ghost" size="sm" className="flex flex-col items-center gap-1">
              <User className="h-5 w-5" />
              <span className="text-xs">Profile</span>
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
};