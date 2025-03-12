
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";
import { PriceComparisonFilters } from "./PriceComparisonFilters";

interface PriceComparisonSearchProps {
  filters: {
    priceRange: [number, number];
    storeTypes: string[];
    proximity: number;
    inStock: boolean;
  };
  onFilterChange: (filters: PriceComparisonSearchProps["filters"]) => void;
}

export const PriceComparisonSearch = ({
  filters,
  onFilterChange,
}: PriceComparisonSearchProps) => {
  // Count active filters
  const activeFilterCount = (
    (filters.inStock ? 1 : 0) +
    (filters.storeTypes.length > 0 ? 1 : 0) +
    ((filters.priceRange[0] > 0 || filters.priceRange[1] < 200000) ? 1 : 0) +
    (filters.proximity !== 5 ? 1 : 0)
  );

  return (
    <div className="flex justify-end">
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
    </div>
  );
};
