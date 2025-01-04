import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PriceComparisonSearch } from "@/components/price-compare/PriceComparisonSearch";
import { PriceComparisonResults } from "@/components/price-compare/PriceComparisonResults";
import { PriceHistory } from "@/components/price/PriceHistory";
import { StoreMap } from "@/components/store/StoreMap";
import { PriceAlerts } from "@/components/price/PriceAlerts";

type Filters = {
  priceRange: [number, number];
  storeTypes: string[];
  proximity: number;
  inStock: boolean;
};

const PriceComparePage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilters, setSelectedFilters] = useState<Filters>({
    priceRange: [0, 200000] as [number, number], // Explicitly type as tuple
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
    <div className="container py-8 space-y-8">
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

      <Tabs defaultValue="comparison" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="comparison">Comparison</TabsTrigger>
          <TabsTrigger value="map">Map View</TabsTrigger>
          <TabsTrigger value="history">Price History</TabsTrigger>
          <TabsTrigger value="alerts">Price Alerts</TabsTrigger>
        </TabsList>
        
        <TabsContent value="comparison">
          <PriceComparisonResults 
            searchQuery={searchQuery}
            filters={selectedFilters}
          />
        </TabsContent>
        
        <TabsContent value="map">
          <StoreMap />
        </TabsContent>
        
        <TabsContent value="history">
          <PriceHistory />
        </TabsContent>
        
        <TabsContent value="alerts">
          <PriceAlerts />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PriceComparePage;