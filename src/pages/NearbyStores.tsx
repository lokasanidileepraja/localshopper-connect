
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ELECTRONICS_SHOPS } from "@/data/shops";
import { StoreMap } from "@/components/store/StoreMap";
import { Shop } from "@/types/shop";
import { Search, MapPin, List } from "lucide-react";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

const NearbyStores = () => {
  const [shops, setShops] = useState<Shop[]>(ELECTRONICS_SHOPS);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedShopId, setSelectedShopId] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"list" | "map">("list");
  const { toast } = useToast();

  // Filter shops based on search query
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setShops(ELECTRONICS_SHOPS);
      return;
    }

    const filteredShops = ELECTRONICS_SHOPS.filter(
      (shop) =>
        shop.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        shop.category.toLowerCase().includes(searchQuery.toLowerCase())
    );

    setShops(filteredShops);
  }, [searchQuery]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    toast({
      title: "Searching for shops",
      description: searchQuery ? `Found ${shops.length} results for "${searchQuery}"` : "Showing all nearby shops",
    });
  };

  const handleShopSelect = (shopId: string) => {
    setSelectedShopId(shopId);
    const shop = shops.find(shop => shop.id === shopId);
    
    if (shop) {
      toast({
        title: `${shop.name} selected`,
        description: `${shop.isOpen ? "Open now" : "Currently closed"} • ${shop.distance} away`,
      });
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto"
      >
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Nearby Electronics Stores</h1>
          <p className="text-muted-foreground">
            Find and explore electronics stores near your location
          </p>
        </div>

        <div className="mb-6">
          <form onSubmit={handleSearchSubmit} className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                type="text"
                placeholder="Search by store name or category"
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button type="submit">Search</Button>
          </form>
        </div>

        <Tabs defaultValue="list" className="mb-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger 
              value="list" 
              onClick={() => setViewMode("list")}
              className="flex items-center gap-2"
            >
              <List className="h-4 w-4" />
              List View
            </TabsTrigger>
            <TabsTrigger 
              value="map" 
              onClick={() => setViewMode("map")}
              className="flex items-center gap-2"
            >
              <MapPin className="h-4 w-4" />
              Map View
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="list" className="mt-4">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {shops.length > 0 ? (
                shops.map((shop) => (
                  <Card
                    key={shop.id}
                    className={`cursor-pointer transition-all hover:shadow-md ${
                      selectedShopId === shop.id ? "ring-2 ring-primary" : ""
                    }`}
                    onClick={() => handleShopSelect(shop.id)}
                  >
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold">{shop.name}</h3>
                        <Badge variant={shop.isOpen ? "default" : "secondary"}>
                          {shop.isOpen ? "Open" : "Closed"}
                        </Badge>
                      </div>
                      <div className="text-sm text-muted-foreground space-y-1">
                        <div className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          <span>{shop.distance}</span>
                        </div>
                        <div>Rating: {shop.rating} ⭐</div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <div className="col-span-full text-center py-8">
                  <p className="text-muted-foreground">No stores found matching your search criteria</p>
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="map" className="mt-4">
            <Card>
              <CardContent className="p-0">
                <div className="h-[500px] w-full rounded-md overflow-hidden">
                  <StoreMap 
                    shops={shops} 
                    selectedShopId={selectedShopId} 
                    onShopSelect={handleShopSelect} 
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
};

export default NearbyStores;
