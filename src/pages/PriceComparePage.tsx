import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Scan, Bell, LineChart, MapPin, Filter } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { PriceHistory } from "@/components/price/PriceHistory";
import { PriceAlerts } from "@/components/price/PriceAlerts";
import { SearchFilters } from "@/components/search/SearchFilters";
import { ComparisonTable } from "@/components/price/ComparisonTable";
import { StoreMap } from "@/components/store/StoreMap";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const PriceComparePage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Searching Prices",
      description: "Comparing prices for " + searchTerm,
    });
  };

  return (
    <div className="container py-8 space-y-8">
      <div className="flex flex-col gap-4">
        <h1 className="text-4xl font-bold">Compare Prices Nearby</h1>
        <p className="text-muted-foreground">
          Find the best deals from local stores and compare prices in real-time
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <form onSubmit={handleSearch} className="flex-1 flex gap-4">
          <div className="relative flex-1">
            <Input
              type="text"
              placeholder="Search product or scan barcode"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pr-10"
            />
            <Button 
              size="icon"
              variant="ghost" 
              className="absolute right-0 top-0"
              onClick={() => toast({
                title: "Scanner",
                description: "Barcode scanner coming soon!"
              })}
            >
              <Scan className="h-4 w-4" />
            </Button>
          </div>
          <Button type="submit">Search Prices</Button>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SearchFilters onFilterChange={() => {}} />
            </SheetContent>
          </Sheet>
        </form>
      </div>

      <Tabs defaultValue="comparison" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="comparison">Comparison</TabsTrigger>
          <TabsTrigger value="map">Map View</TabsTrigger>
          <TabsTrigger value="history">Price History</TabsTrigger>
          <TabsTrigger value="alerts">Price Alerts</TabsTrigger>
        </TabsList>
        <TabsContent value="comparison">
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
      </Tabs>
    </div>
  );
};

export default PriceComparePage;