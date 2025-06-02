
import { useState } from "react";
import { EnhancedPriceComparisonSearch } from "@/components/price-compare/EnhancedPriceComparisonSearch";
import { PriceCompareTabs } from "@/components/price-compare/PriceCompareTabs";
import { Navigation } from "@/components/Navigation";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { TrendingUp } from "lucide-react";

type Filters = {
  priceRange: [number, number];
  storeTypes: string[];
  proximity: number;
  inStock: boolean;
  emiAvailable?: boolean;
  verifiedOnly?: boolean;
  location?: string;
};

const PriceComparePage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilters, setSelectedFilters] = useState<Filters>({
    priceRange: [0, 200000] as [number, number],
    storeTypes: [],
    proximity: 5,
    inStock: false,
    emiAvailable: false,
    verifiedOnly: false,
    location: "",
  });

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleFilterChange = (filters: Filters) => {
    setSelectedFilters(filters);
  };

  const activeFiltersCount = [
    selectedFilters.inStock,
    selectedFilters.emiAvailable,
    selectedFilters.verifiedOnly,
    selectedFilters.storeTypes.length > 0,
    selectedFilters.proximity !== 5,
    selectedFilters.priceRange[0] > 0 || selectedFilters.priceRange[1] < 200000,
    selectedFilters.location
  ].filter(Boolean).length;

  return (
    <div className="min-h-screen pb-16 md:pb-0">
      <Navigation />
      <motion.div 
        className="container py-8 space-y-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold">Compare Prices Nearby</h1>
              <p className="text-muted-foreground">
                Find the best deals from local stores with enhanced search and real-time updates
              </p>
            </div>
            {activeFiltersCount > 0 && (
              <Badge variant="secondary" className="flex items-center gap-1">
                <TrendingUp className="h-3 w-3" />
                {activeFiltersCount} filters active
              </Badge>
            )}
          </div>
        </div>

        <EnhancedPriceComparisonSearch 
          onSearch={handleSearch}
          filters={selectedFilters}
          onFilterChange={handleFilterChange}
        />

        <PriceCompareTabs 
          searchQuery={searchQuery}
          filters={selectedFilters}
        />
      </motion.div>
    </div>
  );
};

export default PriceComparePage;
