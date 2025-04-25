
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";

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
    <motion.form
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      onSubmit={handleSearch}
      className="flex flex-1 items-center w-full"
      role="search"
      aria-label="Main site search"
    >
      <div className="relative w-full">
        <Input
          type="search"
          placeholder="Search products, brands..."
          className="w-full pl-9 pr-3 py-2 h-10 rounded-full shadow-sm bg-white/70 dark:bg-gray-800/50 backdrop-blur-sm border border-white/20 dark:border-gray-700/30 text-foreground text-sm"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 dark:text-gray-500 pointer-events-none" />
      </div>
    </motion.form>
  );
};
