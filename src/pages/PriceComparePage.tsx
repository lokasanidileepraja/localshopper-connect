import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PriceComparisonSearch } from "@/components/price-compare/PriceComparisonSearch";
import { PriceComparisonResults } from "@/components/price-compare/PriceComparisonResults";
import { PriceHistory } from "@/components/price/PriceHistory";
import { StoreMap } from "@/components/store/StoreMap";
import { PriceAlerts } from "@/components/price/PriceAlerts";
import { ComparisonTable } from "@/components/price/ComparisonTable";
import { NearbyStoreFinder } from "@/components/store/NearbyStoreFinder";
import { StoreInfo } from "@/components/store/StoreInfo";
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

  // Mock data for demonstration
  const nearbyStores = [
    {
      id: "1",
      name: "TechHub Electronics",
      distance: "0.8 km",
      address: "123 Tech Street, Digital City"
    },
    {
      id: "2",
      name: "Digital World",
      distance: "1.2 km",
      address: "456 Gadget Avenue, Circuit Town"
    }
  ];

  const selectedStore = {
    name: "TechHub Electronics",
    address: "123 Tech Street, Digital City",
    phone: "+1 234 567 890",
    hours: "9:00 AM - 9:00 PM",
    rating: 4.5,
    isOpen: true
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

      <Tabs defaultValue="comparison" className="w-full">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="comparison">Comparison</TabsTrigger>
          <TabsTrigger value="table">Table View</TabsTrigger>
          <TabsTrigger value="map">Map View</TabsTrigger>
          <TabsTrigger value="history">Price History</TabsTrigger>
          <TabsTrigger value="alerts">Price Alerts</TabsTrigger>
          <TabsTrigger value="stores">Nearby Stores</TabsTrigger>
        </TabsList>
        
        <TabsContent value="comparison">
          <PriceComparisonResults 
            searchQuery={searchQuery}
            filters={selectedFilters}
          />
        </TabsContent>

        <TabsContent value="table">
          <ComparisonTable />
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

        <TabsContent value="stores">
          <div className="grid gap-6 md:grid-cols-2">
            <NearbyStoreFinder 
              stores={nearbyStores}
              onStoreSelect={(id) => console.log("Selected store:", id)}
            />
            <StoreInfo {...selectedStore} />
          </div>
        </TabsContent>
      </Tabs>
    </motion.div>
  );
};

export default PriceComparePage;