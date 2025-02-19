
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PriceComparisonResults } from "./PriceComparisonResults";
import { ComparisonTableView } from "./ComparisonTableView";
import { MapView } from "./MapView";
import { PriceHistoryView } from "./PriceHistoryView";
import { PriceAlertView } from "./PriceAlertView";

interface PriceCompareTabsProps {
  searchQuery: string;
  filters: {
    priceRange: [number, number];
    storeTypes: string[];
    proximity: number;
    inStock: boolean;
  };
}

export const PriceCompareTabs = ({ searchQuery, filters }: PriceCompareTabsProps) => {
  return (
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
          filters={filters}
        />
      </TabsContent>

      <TabsContent value="table">
        <ComparisonTableView 
          searchQuery={searchQuery}
          filters={filters}
        />
      </TabsContent>

      <TabsContent value="map">
        <MapView 
          searchQuery={searchQuery}
          filters={filters}
        />
      </TabsContent>

      <TabsContent value="history">
        <PriceHistoryView 
          searchQuery={searchQuery}
          filters={filters}
        />
      </TabsContent>

      <TabsContent value="alerts">
        <PriceAlertView 
          searchQuery={searchQuery}
          filters={filters}
        />
      </TabsContent>

      <TabsContent value="stores">
        <MapView 
          searchQuery={searchQuery}
          filters={filters}
        />
      </TabsContent>
    </Tabs>
  );
};
