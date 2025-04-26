
import { useState } from "react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Card } from "@/components/ui/card";
import { NearbyStoreFinder } from "@/components/store/NearbyStoreFinder";
import { StoreMap } from "@/components/store/StoreMap";
import { ELECTRONICS_SHOPS } from "@/data/shops";
import { Button } from "@/components/ui/button";
import { MapPin, List } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const NearbyStores = () => {
  const [selectedStoreId, setSelectedStoreId] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"list" | "map">("list");
  
  // Transform shop data to the format expected by NearbyStoreFinder
  const storeList = ELECTRONICS_SHOPS.map(shop => ({
    id: shop.id,
    name: shop.name,
    distance: shop.distance,
    address: shop.address
  }));

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumbs />
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Nearby Stores</h1>
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
                  onStoreSelect={(storeId) => setSelectedStoreId(storeId)} 
                />
              </Card>
            </div>
            <div className="lg:col-span-2">
              <Card className="p-4 h-[500px]">
                <StoreMap shops={ELECTRONICS_SHOPS} selectedShopId={selectedStoreId} />
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
                <StoreMap shops={ELECTRONICS_SHOPS} selectedShopId={selectedStoreId} />
              </div>
            </Card>
            <div className="mt-6">
              <Card className="p-4">
                <h2 className="text-lg font-semibold mb-4">Store Quick List</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {storeList.map(store => (
                    <Button
                      key={store.id}
                      variant="outline"
                      className="justify-start overflow-hidden"
                      onClick={() => setSelectedStoreId(store.id)}
                    >
                      <div className="truncate">
                        {store.name}
                        <div className="text-xs text-gray-500">{store.distance}</div>
                      </div>
                    </Button>
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
