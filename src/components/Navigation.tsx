import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Bell, ShoppingCart, User, Search, MessageCircle } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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
      console.log("Searching for:", searchQuery);
    }
  };

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-neutral-light/20"
    >
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center gap-4">
          <form onSubmit={handleSearch} className="flex-1">
            <div className="relative">
              <Input
                type="search"
                placeholder="Search products..."
                className="w-full pl-10 pr-4 py-2 bg-muted border-0 rounded-xl focus:ring-2 focus:ring-primary/20 transition-all duration-300"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-neutral" />
            </div>
          </form>
          
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
        </div>

        <div className="relative mt-2">
          <div className="flex items-center gap-6 overflow-x-auto pb-2 scrollbar-hide -mx-4 px-4">
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
                className="text-sm text-neutral hover:text-primary whitespace-nowrap transition-colors duration-300"
              >
                {name}
              </Link>
            ))}
          </div>
          <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-background to-transparent pointer-events-none" />
        </div>
      </div>
    </motion.nav>
  );
};