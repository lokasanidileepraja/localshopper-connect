import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Bell, ShoppingCart, User, Search } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export const Navigation = () => {
  const { items } = useCart();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle search functionality
    console.log("Searching for:", searchQuery);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-primary">
      <div className="container mx-auto px-4 py-2">
        {/* Top bar with search */}
        <div className="flex items-center gap-2 mb-2">
          <form onSubmit={handleSearch} className="flex-1">
            <div className="relative">
              <Input
                type="search"
                placeholder="Search products..."
                className="w-full pl-8 pr-4 py-1.5 bg-white rounded-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
            </div>
          </form>
          <div className="flex items-center gap-2">
            <Link to="/notifications">
              <Button variant="ghost" size="icon" className="relative text-white hover:text-white/90">
                <Bell className="h-5 w-5" />
              </Button>
            </Link>
            <Link to="/cart">
              <Button variant="ghost" size="icon" className="relative text-white hover:text-white/90">
                <ShoppingCart className="h-5 w-5" />
                {items.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-secondary text-secondary-foreground rounded-full w-4 h-4 text-xs flex items-center justify-center">
                    {items.length}
                  </span>
                )}
              </Button>
            </Link>
            <Link to="/profile">
              <Button variant="ghost" size="icon" className="text-white hover:text-white/90">
                <User className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Categories row */}
        <div className="flex items-center gap-4 overflow-x-auto pb-2 text-white text-sm">
          <Link to="/category/electronics" className="whitespace-nowrap hover:text-white/90">
            Electronics
          </Link>
          <Link to="/category/mobiles" className="whitespace-nowrap hover:text-white/90">
            Mobiles
          </Link>
          <Link to="/category/laptops" className="whitespace-nowrap hover:text-white/90">
            Laptops
          </Link>
          <Link to="/category/accessories" className="whitespace-nowrap hover:text-white/90">
            Accessories
          </Link>
          <Link to="/category/audio" className="whitespace-nowrap hover:text-white/90">
            Audio
          </Link>
        </div>
      </div>
    </nav>
  );
};