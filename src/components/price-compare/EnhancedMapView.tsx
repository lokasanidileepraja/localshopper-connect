import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { StoreMap } from "@/components/store/StoreMap";
import { ELECTRONICS_SHOPS } from "@/data/shops";
import { MapPin, Navigation, Phone, Clock, Star } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "@/hooks/use-toast";

interface EnhancedMapViewProps {
  searchQuery: string;
  filters: {
    priceRange: [number, number];
    storeTypes: string[];
    proximity: number;
    inStock: boolean;
  };
}

export const EnhancedMapView = ({ searchQuery, filters }: EnhancedMapViewProps) => {
  const [selectedShopId, setSelectedShopId] = useState<string | null>(null);
  const [showDirections, setShowDirections] = useState(false);
  const { toast } = useToast();

  const filteredShops = ELECTRONICS_SHOPS.filter((shop) => {
    if (searchQuery && !shop.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !shop.products.some(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()))) {
      return false;
    }
    
    if (filters.inStock && !shop.products.some(p => p.inStock)) {
      return false;
    }
    
    return true;
  });

  const selectedShop = selectedShopId ? 
    filteredShops.find(shop => shop.id === selectedShopId) : null;

  const handleGetDirections = (shop: any) => {
    toast({
      title: "Opening Directions",
      description: `Getting directions to ${shop.name}`,
    });
    
    // In a real app, this would open maps with directions
    const mapsUrl = `https://www.google.com/maps/search/${encodeURIComponent(shop.name + ' ' + shop.address)}`;
    window.open(mapsUrl, '_blank');
  };

  const handleCallStore = (phone: string) => {
    window.location.href = `tel:${phone}`;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[600px]">
      {/* Map Section */}
      <div className="lg:col-span-2">
        <Card className="h-full">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Store Locations
              <Badge variant="secondary">
                {filteredShops.length} stores
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="h-[500px] p-4">
            <StoreMap
              shops={filteredShops}
              selectedShopId={selectedShopId}
              onShopSelect={setSelectedShopId}
            />
          </CardContent>
        </Card>
      </div>

      {/* Store Details Sidebar */}
      <div className="space-y-4">
        <AnimatePresence mode="wait">
          {selectedShop ? (
            <motion.div
              key={selectedShop.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Card>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{selectedShop.name}</CardTitle>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm font-medium">{selectedShop.rating}</span>
                        </div>
                        <Badge variant={selectedShop.isOpen ? "default" : "secondary"}>
                          {selectedShop.isOpen ? "Open" : "Closed"}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                      <div className="text-sm">
                        <p>{selectedShop.address}</p>
                        <p className="text-muted-foreground">{selectedShop.distance}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{selectedShop.phone}</span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">
                        {selectedShop.isOpen ? "Open until 10:00 PM" : "Opens at 9:00 AM"}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleGetDirections(selectedShop)}
                      className="flex items-center gap-1"
                    >
                      <Navigation className="h-3 w-3" />
                      Directions
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleCallStore(selectedShop.phone)}
                      className="flex items-center gap-1"
                    >
                      <Phone className="h-3 w-3" />
                      Call
                    </Button>
                  </div>

                  {/* Available Products */}
                  <div>
                    <h4 className="font-medium mb-2">Available Products</h4>
                    <div className="space-y-2 max-h-40 overflow-y-auto">
                      {selectedShop.products
                        .filter(p => !searchQuery || 
                          p.name.toLowerCase().includes(searchQuery.toLowerCase()))
                        .slice(0, 5)
                        .map((product) => (
                        <div key={product.id} className="flex items-center justify-between p-2 border rounded">
                          <div>
                            <p className="text-sm font-medium">{product.name}</p>
                            <p className="text-xs text-muted-foreground">
                              ₹{product.price.toLocaleString()}
                            </p>
                          </div>
                          <Badge variant={product.inStock ? "outline" : "secondary"}>
                            {product.inStock ? "In Stock" : "Out of Stock"}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-8"
            >
              <MapPin className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">Select a Store</h3>
              <p className="text-muted-foreground">
                Click on a store marker to see details and directions
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Store List */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Nearby Stores</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {filteredShops.slice(0, 8).map((shop) => (
                <div
                  key={shop.id}
                  className={`p-2 border rounded cursor-pointer transition-colors ${
                    selectedShopId === shop.id ? 'border-primary bg-primary/5' : 'hover:bg-muted'
                  }`}
                  onClick={() => setSelectedShopId(shop.id)}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-sm">{shop.name}</p>
                      <p className="text-xs text-muted-foreground">{shop.distance}</p>
                    </div>
                    <Badge variant={shop.isOpen ? "outline" : "secondary"} className="text-xs">
                      {shop.isOpen ? "Open" : "Closed"}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
