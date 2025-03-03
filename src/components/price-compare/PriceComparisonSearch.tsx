
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Scan, Filter, X } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { PriceComparisonFilters } from "./PriceComparisonFilters";

interface PriceComparisonSearchProps {
  onSearch: (query: string) => void;
  filters: {
    priceRange: [number, number];
    storeTypes: string[];
    proximity: number;
    inStock: boolean;
  };
  onFilterChange: (filters: PriceComparisonSearchProps["filters"]) => void;
}

export const PriceComparisonSearch = ({
  onSearch,
  filters,
  onFilterChange,
}: PriceComparisonSearchProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();
  
  // Debounce search for better performance
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchTerm !== null) {
        onSearch(searchTerm);
      }
    }, 300);
    
    return () => clearTimeout(timer);
  }, [searchTerm, onSearch]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  const handleScanBarcode = () => {
    toast({
      title: "Scanner",
      description: "Barcode scanner coming soon!",
    });
  };
  
  const handleClearSearch = () => {
    setSearchTerm("");
    onSearch("");
  };

  // Count active filters
  const activeFilterCount = (
    (filters.inStock ? 1 : 0) +
    (filters.storeTypes.length > 0 ? 1 : 0) +
    ((filters.priceRange[0] > 0 || filters.priceRange[1] < 200000) ? 1 : 0) +
    (filters.proximity !== 5 ? 1 : 0)
  );

  return (
    <div className="flex flex-col md:flex-row gap-4">
      <form onSubmit={handleSubmit} className="flex-1 flex gap-4">
        <div className="relative flex-1">
          <Input
            type="text"
            placeholder="Search product or scan barcode"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pr-10"
          />
          {searchTerm && (
            <Button
              type="button"
              size="icon"
              variant="ghost"
              className="absolute right-8 top-0"
              onClick={handleClearSearch}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
          <Button
            type="button"
            size="icon"
            variant="ghost"
            className="absolute right-0 top-0"
            onClick={handleScanBarcode}
          >
            <Scan className="h-4 w-4" />
          </Button>
        </div>
        <Button type="submit">Search Prices</Button>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" className="relative">
              <Filter className="h-4 w-4 mr-2" />
              Filters
              {activeFilterCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground rounded-full w-5 h-5 text-xs flex items-center justify-center">
                  {activeFilterCount}
                </span>
              )}
            </Button>
          </SheetTrigger>
          <SheetContent>
            <PriceComparisonFilters
              filters={filters}
              onFilterChange={onFilterChange}
            />
          </SheetContent>
        </Sheet>
      </form>
    </div>
  );
};
