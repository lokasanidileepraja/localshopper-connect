import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Bell, ShoppingCart, User, Search } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export const Navigation = () => {
  const { items } = useCart();
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      toast({
        title: "Searching",
        description: `Looking for "${searchQuery}"...`,
      });
      // Handle search functionality
      console.log("Searching for:", searchQuery);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-primary shadow-md">
      <div className="container mx-auto px-4 py-2">
        {/* Top bar with search */}
        <div className="flex items-center gap-2 mb-2">
          <form onSubmit={handleSearch} className="flex-1">
            <div className="relative">
              <Input
                type="search"
                placeholder="Search products..."
                className="w-full pl-8 pr-4 py-1.5 bg-white rounded-full focus:ring-2 focus:ring-secondary"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500 pointer-events-none" />
            </div>
          </form>
          <div className="flex items-center gap-1 sm:gap-2">
            <Link to="/notifications">
              <Button 
                variant="ghost" 
                size="icon" 
                className="relative text-white hover:text-white/90 hover:bg-primary-700 active:bg-primary-800"
              >
                <Bell className="h-5 w-5" />
              </Button>
            </Link>
            <Link to="/cart">
              <Button 
                variant="ghost" 
                size="icon" 
                className="relative text-white hover:text-white/90 hover:bg-primary-700 active:bg-primary-800"
              >
                <ShoppingCart className="h-5 w-5" />
                {items.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-secondary text-secondary-foreground rounded-full w-4 h-4 text-xs flex items-center justify-center">
                    {items.length}
                  </span>
                )}
              </Button>
            </Link>
            <Link to="/profile">
              <Button 
                variant="ghost" 
                size="icon" 
                className="text-white hover:text-white/90 hover:bg-primary-700 active:bg-primary-800"
              >
                <User className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Categories row with improved scrolling */}
        <div className="relative">
          <div className="flex items-center gap-6 overflow-x-auto pb-2 text-white text-sm scrollbar-hide -mx-4 px-4">
            {[
              ["Electronics", "/category/electronics"],
              ["Mobiles", "/category/mobiles"],
              ["Laptops", "/category/laptops"],
              ["Accessories", "/category/accessories"],
              ["Audio", "/category/audio"],
              ["Gaming", "/category/gaming"],
              ["Wearables", "/category/wearables"]
            ].map(([name, path]) => (
              <Link
                key={path}
                to={path}
                className="whitespace-nowrap hover:text-white/90 transition-colors duration-200 min-w-max"
              >
                {name}
              </Link>
            ))}
          </div>
          <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-primary to-transparent pointer-events-none" />
        </div>
      </div>
    </nav>
  );
};