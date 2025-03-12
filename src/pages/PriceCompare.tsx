
import { useState } from "react";
import { motion } from "framer-motion";
import { PriceCompareTabs } from "@/components/price-compare/PriceCompareTabs";

type Filters = {
  priceRange: [number, number];
  storeTypes: string[];
  proximity: number;
  inStock: boolean;
};

const PriceCompare = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilters, setSelectedFilters] = useState<Filters>({
    priceRange: [0, 200000] as [number, number],
    storeTypes: [],
    proximity: 5,
    inStock: false
  });

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
            Use the navigation search bar to find products and compare their prices in real-time
          </p>
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
