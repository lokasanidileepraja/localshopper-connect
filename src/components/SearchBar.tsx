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
    handleSearch(searchQuery, filters);
    setFiltersOpen(false);
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 sm:py-12">
      <div className="flex gap-3">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <div className="flex flex-1 flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <SearchInput
                  value={searchQuery}
                  onChange={setSearchQuery}
                  onEnter={() => handleSearch(searchQuery)}
                  isMobile={isMobile}
                  className="w-full pl-12 pr-4 py-3 bg-neutral-50 border-0 rounded-full focus:ring-2 focus:ring-neutral-900/20 transition-all duration-300"
                />
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-neutral-400" />
              </div>
              <Button 
                onClick={() => handleSearch(searchQuery)}
                disabled={isLoading}
                className="w-full sm:w-auto bg-neutral-900 hover:bg-neutral-800 text-white rounded-full transition-all duration-300"
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
          <PopoverContent className="w-[calc(100vw-2rem)] sm:w-[600px] p-0 border-none shadow-xl rounded-xl">
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
              <Button variant="outline" size="icon" className="rounded-full border-2">
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
              <Button variant="outline" size="icon" className="rounded-full border-2">
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