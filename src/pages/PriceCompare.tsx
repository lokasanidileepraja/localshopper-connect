
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { PriceCompareTabs } from "@/components/price-compare/PriceCompareTabs";
import { useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { ArrowDownUp, Filter } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

type Filters = {
  priceRange: [number, number];
  storeTypes: string[];
  proximity: number;
  inStock: boolean;
};

const PriceCompare = () => {
  const [searchParams] = useSearchParams();
  const initialQuery = searchParams.get("q") || "";
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState<Filters>({
    priceRange: [0, 200000] as [number, number],
    storeTypes: [],
    proximity: 5,
    inStock: false
  });

  useEffect(() => {
    // Update search query when URL parameter changes
    setSearchQuery(initialQuery);
  }, [initialQuery]);

  const handleFilterChange = (filters: Filters) => {
    setSelectedFilters(filters);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div 
        className="space-y-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col gap-4">
          <h1 className="text-4xl font-bold">Compare Prices Nearby</h1>
          <p className="text-muted-foreground">
            {searchQuery ? 
              `Comparing prices for "${searchQuery}"` : 
              "Use the navigation search bar to find products and compare their prices in real-time"}
          </p>
          
          <Collapsible
            open={isFilterOpen}
            onOpenChange={setIsFilterOpen}
            className="w-full border rounded-lg p-4 bg-white shadow-sm"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">Filters</h3>
              <CollapsibleTrigger asChild>
                <Button variant="ghost" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  {isFilterOpen ? "Hide Filters" : "Show Filters"}
                </Button>
              </CollapsibleTrigger>
            </div>
            
            <CollapsibleContent className="pt-4">
              <div className="space-y-6">
                <div className="space-y-3">
                  <Label>Price Range (₹{selectedFilters.priceRange[0].toLocaleString()} - ₹{selectedFilters.priceRange[1].toLocaleString()})</Label>
                  <Slider
                    value={[selectedFilters.priceRange[0], selectedFilters.priceRange[1]]}
                    min={0}
                    max={200000}
                    step={1000}
                    onValueChange={(value) => {
                      handleFilterChange({
                        ...selectedFilters,
                        priceRange: value as [number, number],
                      });
                    }}
                  />
                </div>
                
                <Separator />
                
                <div className="space-y-3">
                  <Label>Proximity (Within {selectedFilters.proximity} km)</Label>
                  <Slider
                    value={[selectedFilters.proximity]}
                    min={1}
                    max={20}
                    step={1}
                    onValueChange={(value) => {
                      handleFilterChange({
                        ...selectedFilters,
                        proximity: value[0],
                      });
                    }}
                  />
                </div>
                
                <Separator />
                
                <div className="flex items-center space-x-2">
                  <Switch
                    id="in-stock"
                    checked={selectedFilters.inStock}
                    onCheckedChange={(checked) => {
                      handleFilterChange({
                        ...selectedFilters,
                        inStock: checked,
                      });
                    }}
                  />
                  <Label htmlFor="in-stock">Show only in-stock items</Label>
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>
        </div>

        <PriceCompareTabs 
          searchQuery={searchQuery}
          filters={selectedFilters}
        />
      </motion.div>
    </div>
  );
};

export default PriceCompare;
