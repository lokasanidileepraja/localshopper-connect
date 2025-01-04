import { useState } from "react";
import { PriceComparisonSearch } from "@/components/price-compare/PriceComparisonSearch";
import { PriceCompareTabs } from "@/components/price-compare/PriceCompareTabs";
import { motion } from "framer-motion";

type Filters = {
  priceRange: [number, number];
  storeTypes: string[];
  proximity: number;
  inStock: boolean;
};

const PriceComparePage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilters, setSelectedFilters] = useState<Filters>({
    priceRange: [0, 200000] as [number, number],
    storeTypes: [],
    proximity: 5,
    inStock: false
  });

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleFilterChange = (filters: Filters) => {
    setSelectedFilters(filters);
  };

  return (
    <motion.div 
      className="container py-8 space-y-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col gap-4">
        <h1 className="text-4xl font-bold">Compare Prices Nearby</h1>
        <p className="text-muted-foreground">
          Find the best deals from local stores and compare prices in real-time
        </p>
      </div>

      <PriceComparisonSearch 
        onSearch={handleSearch}
        filters={selectedFilters}
        onFilterChange={handleFilterChange}
      />

      <PriceCompareTabs 
        searchQuery={searchQuery}
        filters={selectedFilters}
      />
    </motion.div>
  );
};

export default PriceComparePage;