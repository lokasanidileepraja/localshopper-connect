
import { useState, useEffect } from "react";
import { ELECTRONICS_SHOPS } from "@/data/shops";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Phone, ShoppingBag, ExternalLink, Star, Search, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { StoreMap } from "@/components/store/StoreMap";
import { Shop, Product } from "@/types/shop";
import { StoreInfo } from "@/components/store/StoreInfo";
import { 
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { analytics } from "@/lib/analytics";

interface MapViewProps {
  searchQuery: string;
  filters: {
    priceRange: [number, number];
    storeTypes: string[];
    proximity: number;
    inStock: boolean;
  };
}

export const MapView = ({ searchQuery, filters }: MapViewProps) => {
  const { toast } = useToast();
  const [selectedShopId, setSelectedShopId] = useState<string | null>(null);
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [mapLocationSearch, setMapLocationSearch] = useState<string>("");
  
  // Filter shops based on search query, filters, and category
  const filteredShops = ELECTRONICS_SHOPS.filter((shop) => {
    // Filter by search query (store name or product)
    if (searchQuery && 
        !shop.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !shop.products.some(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()))) {
      return false;
    }
    
    // Filter by in-stock
    if (filters.inStock && !shop.products.some(p => p.inStock)) {
      return false;
    }
    
    // Filter by proximity (using the numerical value from the distance string)
    const distanceValue = parseFloat(shop.distance);
    if (!isNaN(distanceValue) && distanceValue > filters.proximity) {
      return false;
    }
    
    // Filter by category (if not "all")
    if (categoryFilter !== "all") {
      const hasProductsInCategory = shop.products.some(
        product => product.category.toLowerCase() === categoryFilter.toLowerCase()
      );
      if (!hasProductsInCategory) return false;
    }
    
    // Filter by map location search (very basic implementation)
    if (mapLocationSearch && 
        !shop.address.toLowerCase().includes(mapLocationSearch.toLowerCase())) {
      return false;
    }
    
    return true;
  });

  // Get the selected shop data
  const selectedShop = selectedShopId ? 
    ELECTRONICS_SHOPS.find(shop => shop.id === selectedShopId) : null;

  const handleGetDirections = (address: string) => {
    window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`, '_blank');
    toast({
      title: "Opening Maps",
      description: "Redirecting to Google Maps for directions",
    });
    
    analytics.trackEvent('map_get_directions', { 
      address,
      shopId: selectedShopId
    });
  };
  
  const handleSelectShop = (shopId: string) => {
    setSelectedShopId(shopId === selectedShopId ? null : shopId);
  };

  useEffect(() => {
    // Track when map view is loaded
    analytics.trackEvent('map_view_loaded', { 
      filterCount: filteredShops.length,
      hasSearchQuery: !!searchQuery,
      categoryFilter
    });
  }, []);

  return (
    <div className="grid md:grid-cols-3 gap-4">
      {/* Search and Filters Panel */}
      <div className="md:col-span-1">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <Search className="h-5 w-5 text-primary" />
              Find Stores
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Location Search */}
            <div className="space-y-2">
              <Label htmlFor="location-search">Search by Location</Label>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  id="location-search"
                  placeholder="Address, landmark, area..."
                  className="pl-9"
                  value={mapLocationSearch}
                  onChange={(e) => setMapLocationSearch(e.target.value)}
                />
              </div>
            </div>
            
            {/* Category filters */}
            <div className="space-y-2">
              <Label>Filter by Category</Label>
              <div className="grid grid-cols-2 gap-2">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="category-all" 
                    checked={categoryFilter === "all"}
                    onCheckedChange={() => setCategoryFilter("all")}
                  />
                  <Label htmlFor="category-all">All Categories</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="category-mobile" 
                    checked={categoryFilter === "mobile"}
                    onCheckedChange={() => setCategoryFilter(categoryFilter === "mobile" ? "all" : "mobile")}
                  />
                  <Label htmlFor="category-mobile">Mobiles</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="category-accessories" 
                    checked={categoryFilter === "accessories"}
                    onCheckedChange={() => setCategoryFilter(categoryFilter === "accessories" ? "all" : "accessories")}
                  />
                  <Label htmlFor="category-accessories">Accessories</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="category-audio" 
                    checked={categoryFilter === "audio"}
                    onCheckedChange={() => setCategoryFilter(categoryFilter === "audio" ? "all" : "audio")}
                  />
                  <Label htmlFor="category-audio">Audio</Label>
                </div>
              </div>
            </div>
            
            {/* Store list */}
            <div className="border-t pt-4">
              <h3 className="text-sm font-medium mb-2">
                {filteredShops.length} {filteredShops.length === 1 ? 'Store' : 'Stores'} Found
              </h3>
              <div className="space-y-2 max-h-[300px] overflow-y-auto pr-2">
                {filteredShops.map((shop) => (
                  <div 
                    key={shop.id}
                    className={`
                      p-2 border rounded-md cursor-pointer transition-colors
                      ${selectedShopId === shop.id ? 'border-primary bg-primary/5' : 'hover:bg-gray-50'}
                    `}
                    onClick={() => handleSelectShop(shop.id)}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium">{shop.name}</h4>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          <span>{shop.rating}</span>
                          <span className="mx-1">•</span>
                          <span>{shop.distance}</span>
                        </div>
                      </div>
                      <Badge variant={shop.isOpen ? "default" : "secondary"} className="text-[10px]">
                        {shop.isOpen ? "Open" : "Closed"}
                      </Badge>
                    </div>
                  </div>
                ))}
                {filteredShops.length === 0 && (
                  <div className="text-center py-4 text-muted-foreground">
                    No stores match your search criteria
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Map Panel */}
      <div className="md:col-span-2">
        <Card className="overflow-hidden">
          <CardContent className="p-0">
            <div className="h-[600px] relative">
              <StoreMap 
                shops={filteredShops}
                selectedShopId={selectedShopId}
                onShopSelect={handleSelectShop}
              />
              
              {/* Selected Store Sheet for Mobile */}
              {selectedShop && (
                <Sheet>
                  <SheetTrigger asChild>
                    <Button
                      className="absolute bottom-4 left-1/2 transform -translate-x-1/2 shadow-lg md:hidden z-10"
                      size="sm"
                    >
                      View {selectedShop.name} Details
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="bottom" className="h-[85vh] rounded-t-xl">
                    <SheetHeader>
                      <SheetTitle>{selectedShop.name}</SheetTitle>
                      <SheetDescription>{selectedShop.address}</SheetDescription>
                    </SheetHeader>
                    <div className="mt-4">
                      <StoreInfo
                        id={selectedShop.id}
                        name={selectedShop.name}
                        address={selectedShop.address}
                        phone={selectedShop.phone}
                        hours={selectedShop.isOpen ? "Open Now" : "Currently Closed"}
                        rating={selectedShop.rating}
                        isOpen={selectedShop.isOpen}
                      />
                    </div>
                  </SheetContent>
                </Sheet>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Selected Store Details (Desktop) */}
      {selectedShop && (
        <div className="md:col-span-1 hidden md:block">
          <StoreInfo
            id={selectedShop.id}
            name={selectedShop.name}
            address={selectedShop.address}
            phone={selectedShop.phone}
            hours={selectedShop.isOpen ? "Open Now" : "Currently Closed"}
            rating={selectedShop.rating}
            isOpen={selectedShop.isOpen}
          />
        </div>
      )}
    </div>
  );
};
