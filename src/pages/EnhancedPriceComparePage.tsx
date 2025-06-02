
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useSearchParams } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { EnhancedPriceComparisonSearch } from "@/components/price-compare/EnhancedPriceComparisonSearch";
import { PriceCompareTabs } from "@/components/price-compare/PriceCompareTabs";
import { RealTimePriceUpdates } from "@/components/price-compare/RealTimePriceUpdates";
import { EnhancedMapView } from "@/components/price-compare/EnhancedMapView";
import { EnhancedPriceAlerts } from "@/components/price-compare/EnhancedPriceAlerts";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, MapPin, Bell, BarChart3, Zap, Store } from "lucide-react";

type Filters = {
  priceRange: [number, number];
  storeTypes: string[];
  proximity: number;
  inStock: boolean;
  emiAvailable?: boolean;
  verifiedOnly?: boolean;
  location?: string;
};

const EnhancedPriceComparePage = () => {
  const [searchParams] = useSearchParams();
  const initialQuery = searchParams.get("q") || "";
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [selectedFilters, setSelectedFilters] = useState<Filters>({
    priceRange: [0, 200000] as [number, number],
    storeTypes: [],
    proximity: 5,
    inStock: false,
    emiAvailable: false,
    verifiedOnly: false,
    location: "",
  });

  useEffect(() => {
    setSearchQuery(initialQuery);
  }, [initialQuery]);

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
              <h1 className="text-4xl font-bold">Enhanced Price Compare</h1>
              <p className="text-muted-foreground">
                Find the best deals with advanced search, real-time updates, and smart alerts
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

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3">
            <Tabs defaultValue="comparison" className="w-full">
              <TabsList className="grid w-full grid-cols-6">
                <TabsTrigger value="comparison" className="flex items-center gap-1">
                  <BarChart3 className="h-4 w-4" />
                  <span className="hidden sm:inline">Compare</span>
                </TabsTrigger>
                <TabsTrigger value="map" className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  <span className="hidden sm:inline">Map</span>
                </TabsTrigger>
                <TabsTrigger value="alerts" className="flex items-center gap-1">
                  <Bell className="h-4 w-4" />
                  <span className="hidden sm:inline">Alerts</span>
                </TabsTrigger>
                <TabsTrigger value="history" className="flex items-center gap-1">
                  <TrendingUp className="h-4 w-4" />
                  <span className="hidden sm:inline">History</span>
                </TabsTrigger>
                <TabsTrigger value="live" className="flex items-center gap-1">
                  <Zap className="h-4 w-4" />
                  <span className="hidden sm:inline">Live</span>
                </TabsTrigger>
                <TabsTrigger value="stores" className="flex items-center gap-1">
                  <Store className="h-4 w-4" />
                  <span className="hidden sm:inline">Stores</span>
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="comparison" className="mt-6">
                <PriceCompareTabs 
                  searchQuery={searchQuery}
                  filters={selectedFilters}
                />
              </TabsContent>

              <TabsContent value="map" className="mt-6">
                <EnhancedMapView 
                  searchQuery={searchQuery}
                  filters={selectedFilters}
                />
              </TabsContent>

              <TabsContent value="alerts" className="mt-6">
                <EnhancedPriceAlerts 
                  searchQuery={searchQuery}
                  filters={selectedFilters}
                />
              </TabsContent>

              <TabsContent value="history" className="mt-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="text-center py-8">
                      <TrendingUp className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                      <h3 className="text-lg font-semibold mb-2">Price History & Trends</h3>
                      <p className="text-muted-foreground">
                        {searchQuery ? 
                          `Price history for "${searchQuery}" will be shown here` : 
                          "Search for a product to see its price history"}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="live" className="mt-6">
                <RealTimePriceUpdates searchQuery={searchQuery} />
              </TabsContent>

              <TabsContent value="stores" className="mt-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="text-center py-8">
                      <Store className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                      <h3 className="text-lg font-semibold mb-2">Store Directory</h3>
                      <p className="text-muted-foreground">
                        Browse stores by category, ratings, and location
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          <div className="space-y-4">
            <RealTimePriceUpdates searchQuery={searchQuery} />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default EnhancedPriceComparePage;
