
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PriceComparisonResults } from "./PriceComparisonResults";
import { ComparisonTableView } from "./ComparisonTableView";
import { MapView } from "./MapView";
import { PriceHistoryView } from "./PriceHistoryView";
import { PriceAlertView } from "./PriceAlertView";
import { MapPin, BarChart3, TableProperties, Clock, BellRing, Store } from "lucide-react";
import { useEffect } from "react";
import { analytics } from "@/lib/analytics";
import { BulkPurchaseView } from "./BulkPurchaseView";

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
  // Track tab changes for analytics
  const handleTabChange = (value: string) => {
    analytics.trackEvent('price_compare_tab_change', { 
      tabValue: value,
      searchQuery: searchQuery || 'none'
    });
  };

  return (
    <Tabs defaultValue="comparison" className="w-full" onValueChange={handleTabChange}>
      <TabsList className="grid w-full grid-cols-6">
        <TabsTrigger value="comparison" className="flex items-center gap-1">
          <BarChart3 className="h-4 w-4" />
          <span className="hidden sm:inline">Comparison</span>
        </TabsTrigger>
        <TabsTrigger value="table" className="flex items-center gap-1">
          <TableProperties className="h-4 w-4" />
          <span className="hidden sm:inline">Table</span>
        </TabsTrigger>
        <TabsTrigger value="map" className="flex items-center gap-1">
          <MapPin className="h-4 w-4" />
          <span className="hidden sm:inline">Map</span>
        </TabsTrigger>
        <TabsTrigger value="history" className="flex items-center gap-1">
          <Clock className="h-4 w-4" />
          <span className="hidden sm:inline">History</span>
        </TabsTrigger>
        <TabsTrigger value="alerts" className="flex items-center gap-1">
          <BellRing className="h-4 w-4" />
          <span className="hidden sm:inline">Alerts</span>
        </TabsTrigger>
        <TabsTrigger value="stores" className="flex items-center gap-1">
          <Store className="h-4 w-4" />
          <span className="hidden sm:inline">Stores</span>
        </TabsTrigger>
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
        <BulkPurchaseView 
          searchQuery={searchQuery}
          filters={filters}
        />
      </TabsContent>
    </Tabs>
  );
};
