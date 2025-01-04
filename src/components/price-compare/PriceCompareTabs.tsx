import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PriceComparisonResults } from "./PriceComparisonResults";
import { ComparisonTable } from "@/components/price/ComparisonTable";
import { StoreMap } from "@/components/store/StoreMap";
import { PriceHistory } from "@/components/price/PriceHistory";
import { PriceAlerts } from "@/components/price/PriceAlerts";
import { NearbyStoreFinder } from "@/components/store/NearbyStoreFinder";
import { StoreInfo } from "@/components/store/StoreInfo";

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
  );
};