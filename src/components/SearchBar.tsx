import { Button } from "@/components/ui/button";
import { Search, Loader2 } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useIsMobile } from "@/hooks/use-mobile";
import { useState } from "react";
import { SearchInput } from "./search/SearchInput";
import { SearchResults } from "./search/SearchResults";
import { useSearch } from "@/hooks/useSearch";

export const SearchBar = () => {
  const [open, setOpen] = useState(false);
  const isMobile = useIsMobile();
  const { searchQuery, setSearchQuery, isLoading, recentSearches, handleSearch } = useSearch();

  return (
    <div className={`max-w-2xl mx-auto px-4 py-4 ${isMobile ? 'sm:py-6' : 'sm:py-8'}`}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <div className="flex flex-col sm:flex-row gap-2">
            <SearchInput
              value={searchQuery}
              onChange={setSearchQuery}
              onEnter={() => handleSearch(searchQuery)}
              isMobile={isMobile}
            />
            <Button 
              onClick={() => handleSearch(searchQuery)}
              disabled={isLoading}
              className={`w-full ${isMobile ? '' : 'sm:w-auto'}`}
            >
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Search className="mr-2 h-4 w-4" />
              )}
              Search
            </Button>
          </div>
        </PopoverTrigger>
        <PopoverContent className="w-[calc(100vw-2rem)] sm:w-[600px] p-0">
          <SearchResults 
            recentSearches={recentSearches}
            onSelectSearch={(search) => {
              setSearchQuery(search);
              handleSearch(search);
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};