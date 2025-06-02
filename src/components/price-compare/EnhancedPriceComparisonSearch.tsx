
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AutocompleteSearch } from "@/components/search/AutocompleteSearch";
import { PriceComparisonFilters } from "./PriceComparisonFilters";
import { Filter, MapPin, Zap, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

interface EnhancedPriceComparisonSearchProps {
  onSearch: (query: string) => void;
  filters: {
    priceRange: [number, number];
    storeTypes: string[];
    proximity: number;
    inStock: boolean;
    emiAvailable?: boolean;
    verifiedOnly?: boolean;
    location?: string;
  };
  onFilterChange: (filters: any) => void;
}

export const EnhancedPriceComparisonSearch = ({
  onSearch,
  filters,
  onFilterChange,
}: EnhancedPriceComparisonSearchProps) => {
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [quickFilters, setQuickFilters] = useState<string[]>([]);

  const activeFiltersCount = [
    filters.inStock,
    filters.emiAvailable,
    filters.verifiedOnly,
    filters.storeTypes.length > 0,
    filters.proximity !== 5,
    filters.priceRange[0] > 0 || filters.priceRange[1] < 200000,
    filters.location
  ].filter(Boolean).length;

  const handleCategoryFilter = (category: string) => {
    setSelectedCategory(category);
    onSearch(category);
  };

  const toggleQuickFilter = (filter: string) => {
    const newQuickFilters = quickFilters.includes(filter)
      ? quickFilters.filter(f => f !== filter)
      : [...quickFilters, filter];
    
    setQuickFilters(newQuickFilters);
    
    // Apply quick filter logic
    const updatedFilters = { ...filters };
    if (filter === "in-stock") {
      updatedFilters.inStock = newQuickFilters.includes(filter);
    } else if (filter === "emi") {
      updatedFilters.emiAvailable = newQuickFilters.includes(filter);
    } else if (filter === "verified") {
      updatedFilters.verifiedOnly = newQuickFilters.includes(filter);
    }
    
    onFilterChange(updatedFilters);
  };

  const clearAllFilters = () => {
    setQuickFilters([]);
    setSelectedCategory(null);
    onFilterChange({
      priceRange: [0, 200000] as [number, number],
      storeTypes: [],
      proximity: 5,
      inStock: false,
      emiAvailable: false,
      verifiedOnly: false,
      location: "",
    });
  };

  return (
    <motion.div 
      className="space-y-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <AutocompleteSearch
            onSearch={onSearch}
            onCategoryFilter={handleCategoryFilter}
          />
        </div>
        
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2"
          >
            <Filter className="h-4 w-4" />
            Filters
            {activeFiltersCount > 0 && (
              <Badge variant="secondary" className="ml-1">
                {activeFiltersCount}
              </Badge>
            )}
          </Button>
          
          <Button
            variant="outline"
            size="icon"
            onClick={() => {/* TODO: Add location detection */}}
            title="Use current location"
          >
            <MapPin className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Active category and quick filters */}
      <AnimatePresence>
        {(selectedCategory || quickFilters.length > 0 || activeFiltersCount > 0) && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="flex flex-wrap items-center gap-2"
          >
            {selectedCategory && (
              <Badge variant="default" className="flex items-center gap-1">
                Category: {selectedCategory}
                <X 
                  className="h-3 w-3 cursor-pointer" 
                  onClick={() => setSelectedCategory(null)}
                />
              </Badge>
            )}
            
            {quickFilters.map((filter) => (
              <Badge key={filter} variant="secondary" className="flex items-center gap-1">
                {filter === "in-stock" && "In Stock"}
                {filter === "emi" && "EMI Available"}
                {filter === "verified" && "Verified Only"}
                <X 
                  className="h-3 w-3 cursor-pointer" 
                  onClick={() => toggleQuickFilter(filter)}
                />
              </Badge>
            ))}
            
            {activeFiltersCount > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearAllFilters}
                className="text-muted-foreground hover:text-foreground"
              >
                Clear all
              </Button>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Quick filter buttons */}
      <div className="flex flex-wrap gap-2">
        <Button
          variant={quickFilters.includes("in-stock") ? "default" : "outline"}
          size="sm"
          onClick={() => toggleQuickFilter("in-stock")}
          className="flex items-center gap-1"
        >
          <Zap className="h-3 w-3" />
          In Stock
        </Button>
        
        <Button
          variant={quickFilters.includes("emi") ? "default" : "outline"}
          size="sm"
          onClick={() => toggleQuickFilter("emi")}
        >
          EMI Available
        </Button>
        
        <Button
          variant={quickFilters.includes("verified") ? "default" : "outline"}
          size="sm"
          onClick={() => toggleQuickFilter("verified")}
        >
          Verified Stores
        </Button>
      </div>

      {/* Advanced filters collapsible */}
      <Collapsible open={showFilters} onOpenChange={setShowFilters}>
        <CollapsibleContent>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="border rounded-lg p-4 bg-muted/30"
          >
            <PriceComparisonFilters
              filters={filters}
              onFilterChange={onFilterChange}
            />
          </motion.div>
        </CollapsibleContent>
      </Collapsible>
    </motion.div>
  );
};
