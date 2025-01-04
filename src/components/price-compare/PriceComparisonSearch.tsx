import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Scan, Filter } from "lucide-react";
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
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
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