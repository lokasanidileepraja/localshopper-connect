
import { useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Search, X, TrendingUp, Clock } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useSearchStore } from "@/store/searchStore";

interface AutocompleteSearchProps {
  onSearch: (query: string) => void;
  onCategoryFilter: (category: string) => void;
  className?: string;
}

const POPULAR_SEARCHES = [
  "iPhone 15", "Samsung Galaxy S24", "MacBook Pro", "AirPods Pro",
  "iPad", "Dell XPS", "Sony WH-1000XM5", "Gaming Laptop"
];

const CATEGORIES = [
  "Smartphones", "Laptops", "Audio", "Tablets", "Accessories", 
  "Gaming", "Cameras", "Wearables"
];

export const AutocompleteSearch = ({ 
  onSearch, 
  onCategoryFilter, 
  className 
}: AutocompleteSearchProps) => {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const { recentSearches, addRecentSearch } = useSearchStore();

  const suggestions = [
    ...recentSearches.map(search => ({ type: "recent", value: search })),
    ...POPULAR_SEARCHES
      .filter(search => search.toLowerCase().includes(query.toLowerCase()))
      .map(search => ({ type: "popular", value: search }))
  ].slice(0, 8);

  const handleSearch = (searchQuery: string) => {
    if (searchQuery.trim()) {
      addRecentSearch(searchQuery);
      onSearch(searchQuery);
      setQuery(searchQuery);
      setIsOpen(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex(prev => Math.min(prev + 1, suggestions.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex(prev => Math.max(prev - 1, -1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (selectedIndex >= 0) {
        handleSearch(suggestions[selectedIndex].value);
      } else {
        handleSearch(query);
      }
    } else if (e.key === "Escape") {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (inputRef.current && !inputRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={`relative w-full ${className}`}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          ref={inputRef}
          type="text"
          placeholder="Search products, brands, models..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
            setSelectedIndex(-1);
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          className="pl-10 pr-10"
        />
        {query && (
          <Button
            variant="ghost"
            size="sm"
            className="absolute right-1 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
            onClick={() => {
              setQuery("");
              setIsOpen(false);
            }}
          >
            <X className="h-3 w-3" />
          </Button>
        )}
      </div>

      <AnimatePresence>
        {isOpen && (query || recentSearches.length > 0) && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 right-0 z-50 mt-1"
          >
            <Card>
              <CardContent className="p-0">
                {suggestions.length > 0 && (
                  <div className="py-2">
                    {suggestions.map((suggestion, index) => (
                      <motion.div
                        key={suggestion.value}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: index * 0.05 }}
                        className={`flex items-center gap-3 px-4 py-2 cursor-pointer hover:bg-muted ${
                          selectedIndex === index ? "bg-muted" : ""
                        }`}
                        onClick={() => handleSearch(suggestion.value)}
                      >
                        {suggestion.type === "recent" ? (
                          <Clock className="h-4 w-4 text-muted-foreground" />
                        ) : (
                          <TrendingUp className="h-4 w-4 text-muted-foreground" />
                        )}
                        <span className="flex-1">{suggestion.value}</span>
                        <Badge variant="outline" className="text-xs">
                          {suggestion.type === "recent" ? "Recent" : "Popular"}
                        </Badge>
                      </motion.div>
                    ))}
                  </div>
                )}
                
                <div className="border-t p-3">
                  <h4 className="text-sm font-medium mb-2">Categories</h4>
                  <div className="flex flex-wrap gap-1">
                    {CATEGORIES.map((category) => (
                      <Badge
                        key={category}
                        variant="secondary"
                        className="cursor-pointer hover:bg-primary hover:text-primary-foreground text-xs"
                        onClick={() => {
                          onCategoryFilter(category);
                          setIsOpen(false);
                        }}
                      >
                        {category}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
