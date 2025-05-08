
import { useState } from "react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Card } from "@/components/ui/card";
import { NearbyStoreFinder } from "@/components/store/NearbyStoreFinder";
import { StoreMap } from "@/components/store/StoreMap";
import { ELECTRONICS_SHOPS } from "@/data/shops";
import { Button } from "@/components/ui/button";
import { MapPin, List, Search, Phone } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";

const NearbyStores = () => {
  const [selectedStoreId, setSelectedStoreId] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"list" | "map">("list");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const { toast } = useToast();
  
  // Transform shop data to the format expected by NearbyStoreFinder
  const storeList = ELECTRONICS_SHOPS.map(shop => ({
    id: shop.id,
    name: shop.name,
    distance: shop.distance,
    address: shop.address
  }));

  // Filter shops by search term
  const filteredShops = ELECTRONICS_SHOPS.filter(shop => 
    !searchTerm || shop.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle store selection
  const handleStoreSelect = (storeId: string) => {
    setSelectedStoreId(storeId);
    
    if (viewMode === "list") {
      // Switch to map view when a store is selected in list mode
      setViewMode("map");
      toast({
        title: "Store selected",
        description: "Switching to map view to show location",
      });
    }
  };

  // Handle quick actions
  const handleDirections = (address: string) => {
    window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`, '_blank');
  };
  
  const handleContact = (phone: string) => {
    window.location.href = `tel:${phone}`;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumbs />
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <h1 className="text-3xl font-bold">Nearby Stores</h1>
        <div className="w-full md:w-auto flex flex-col sm:flex-row gap-2">
          <div className="relative flex-1 sm:max-w-xs">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input 
              placeholder="Search stores..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            <Button
              variant={viewMode === "list" ? "default" : "outline"}
              onClick={() => setViewMode("list")}
              size="sm"
            >
              <List className="h-4 w-4 mr-2" />
              List View
            </Button>
            <Button
              variant={viewMode === "map" ? "default" : "outline"}
              onClick={() => setViewMode("map")}
              size="sm"
            >
              <MapPin className="h-4 w-4 mr-2" />
              Map View
            </Button>
          </div>
        </div>
      </div>
      
      <AnimatePresence mode="wait">
        {viewMode === "list" ? (
          <motion.div 
            key="list-view"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-6"
          >
            <div className="lg:col-span-1">
              <Card className="p-4">
                <NearbyStoreFinder 
                  stores={storeList}
                  onStoreSelect={(storeId) => handleStoreSelect(storeId)} 
                />
              </Card>
            </div>
            <div className="lg:col-span-2">
              <Card className="p-4 h-[500px]">
                <StoreMap shops={filteredShops} selectedShopId={selectedStoreId} />
              </Card>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="map-view"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Card className="p-4">
              <div className="h-[650px]">
                <StoreMap shops={filteredShops} selectedShopId={selectedStoreId} />
              </div>
            </Card>
            <div className="mt-6">
              <Card className="p-4">
                <h2 className="text-lg font-semibold mb-4">Store Quick List</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {filteredShops.map(store => (
                    <div key={store.id} className="border rounded-lg p-3 hover:border-primary hover:shadow-sm transition-all">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-medium text-sm truncate">{store.name}</h3>
                        <Badge variant={store.isOpen ? "default" : "secondary"} className="text-xs">
                          {store.isOpen ? 'Open' : 'Closed'}
                        </Badge>
                      </div>
                      <p className="text-xs text-gray-500 mb-2">{store.distance}</p>
                      <div className="flex gap-1">
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="flex-1 h-8 text-xs px-2"
                          onClick={() => handleDirections(store.address)}
                        >
                          <MapPin className="h-3 w-3 mr-1" />
                          Map
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="flex-1 h-8 text-xs px-2"
                          onClick={() => handleContact(store.phone)}
                        >
                          <Phone className="h-3 w-3 mr-1" />
                          Call
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NearbyStores;
