import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PriceComparisonResults } from "./PriceComparisonResults";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();

  const handleTabChange = (value: string) => {
    switch (value) {
      case "comparison":
        navigate("/price-compare");
        break;
      case "table":
        navigate("/comparison-table");
        break;
      case "map":
        navigate("/store-map");
        break;
      case "history":
        navigate("/price-history");
        break;
      case "alerts":
        navigate("/price-alerts");
        break;
      default:
        navigate("/price-compare");
    }
  };

  return (
    <Tabs defaultValue="comparison" className="w-full" onValueChange={handleTabChange}>
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
    </Tabs>
  );
};