import { Button } from "@/components/ui/button";
import { Search, Loader2, SlidersHorizontal } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useIsMobile } from "@/hooks/use-mobile";
import { useState } from "react";
import { SearchInput } from "./search/SearchInput";
import { SearchResults } from "./search/SearchResults";
import { SearchFilters, type SearchFilters as SearchFiltersType } from "./search/SearchFilters";
import { useSearch } from "@/hooks/useSearch";

export const SearchBar = () => {
  const [open, setOpen] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const isMobile = useIsMobile();
  const { searchQuery, setSearchQuery, isLoading, recentSearches, handleSearch } = useSearch();

  const handleFilters = (filters: SearchFiltersType) => {
    // Apply filters to search results
    handleSearch(searchQuery, filters);
    setFiltersOpen(false);
  };

  return (
    <div className={`max-w-2xl mx-auto px-4 py-4 ${isMobile ? 'sm:py-6' : 'sm:py-8'}`}>
      <div className="flex gap-2">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <div className="flex flex-1 flex-col sm:flex-row gap-2">
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

        {isMobile ? (
          <Sheet open={filtersOpen} onOpenChange={setFiltersOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <SlidersHorizontal className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SearchFilters onFilterChange={handleFilters} />
            </SheetContent>
          </Sheet>
        ) : (
          <Popover open={filtersOpen} onOpenChange={setFiltersOpen}>
            <PopoverTrigger asChild>
              <Button variant="outline" size="icon">
                <SlidersHorizontal className="h-4 w-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <SearchFilters onFilterChange={handleFilters} />
            </PopoverContent>
          </Popover>
        )}
      </div>
    </div>
  );
};