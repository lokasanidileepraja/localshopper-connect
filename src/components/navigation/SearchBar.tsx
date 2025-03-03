
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

export const NavigationSearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      toast({
        title: "Searching",
        description: `Looking for "${searchQuery}"...`,
      });
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <form onSubmit={handleSearch} className="flex-1 max-w-xl">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search products, brands, and more..."
          className="w-full pl-10 pr-4 py-2 bg-secondary border-0 rounded-full focus:ring-2 focus:ring-primary/20 transition-all duration-300"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button 
          type="submit" 
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-primary text-white px-3 py-1 rounded-full text-xs font-medium"
        >
          Search
        </button>
      </div>
    </form>
  );
};
