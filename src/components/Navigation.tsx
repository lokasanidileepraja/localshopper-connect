import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home, Search, Map, Bell, ShoppingCart } from "lucide-react";

export const Navigation = () => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-background border-t md:relative md:border-t-0 md:border-b">
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
          <Link to="/price-alerts">
            <Button variant="ghost" size="sm" className="flex flex-col items-center gap-1">
              <Bell className="h-5 w-5" />
              <span className="text-xs">Alerts</span>
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
};