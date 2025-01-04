import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Scan, Bell, LineChart } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { PriceHistory } from "@/components/price/PriceHistory";
import { PriceAlerts } from "@/components/price/PriceAlerts";

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
      <h1 className="text-4xl font-bold">Compare Prices Nearby</h1>

      <form onSubmit={handleSearch} className="flex gap-4">
        <Input
          type="text"
          placeholder="Search product or scan barcode"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
        <Button type="submit">
          <Scan className="mr-2 h-4 w-4" />
          Compare Prices
        </Button>
      </form>

      <Tabs defaultValue="history">
        <TabsList>
          <TabsTrigger value="history">Price History</TabsTrigger>
          <TabsTrigger value="alerts">Price Alerts</TabsTrigger>
        </TabsList>
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