
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate, useSearchParams } from "react-router-dom";

export const NavigationSearchBar = () => {
  const [searchParams] = useSearchParams();
  const initialQuery = searchParams.get("q") || "";
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    setSearchQuery(initialQuery);
  }, [initialQuery]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      toast({
        title: "Searching",
        description: `Looking for "${searchQuery}"...`,
      });
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    } else {
      toast({
        title: "Search error",
        description: "Please enter a search term",
        variant: "destructive",
      });
    }
  };

  return (
    <form
      onSubmit={handleSearch}
      className="flex flex-1 items-center max-w-xl min-w-0 mx-2"
      role="search"
      aria-label="Main site search"
    >
      <div className="relative w-full">
        <Input
          type="search"
          placeholder="Search products, brands, stores…"
          className="w-full pl-10 pr-14 py-2 rounded-full shadow-sm"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground pointer-events-none" />
        <button
          type="submit"
          aria-label="Search"
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-primary text-primary-foreground px-4 py-1.5 rounded-full shadow hover:bg-primary/90 transition active:bg-primary/70 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-primary"
        >
          Search
        </button>
      </div>
    </form>
  );
};
