
import { ELECTRONICS_SHOPS } from "@/data/shops";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Phone, ShoppingBag, ExternalLink, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";

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

  const handleGetDirections = (address: string) => {
    window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`, '_blank');
    toast({
      title: "Opening Maps",
      description: "Redirecting to Google Maps for directions",
    });
  };
  
  // Filter shops based on search query and filters
  const filteredShops = ELECTRONICS_SHOPS.filter((shop) => {
    // Filter by search query
    if (searchQuery && !shop.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !shop.products.some(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()))) {
      return false;
    }
    
    // Filter by in-stock
    if (filters.inStock) {
      return shop.products.some((p) => p.inStock);
    }
    
    // Filter by proximity (using the numerical value from the distance string)
    const distanceValue = parseFloat(shop.distance);
    if (!isNaN(distanceValue) && distanceValue > filters.proximity) {
      return false;
    }
    
    return true;
  });

  if (filteredShops.length === 0) {
    return (
      <div className="text-center py-8">
        <h3 className="text-lg font-semibold mb-2">No shops found</h3>
        <p className="text-gray-600">Try adjusting your search or filters</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-gray-100 p-6 rounded-lg mb-4">
        <h2 className="text-lg font-semibold mb-2">Showing {filteredShops.length} nearby stores</h2>
        <p className="text-gray-600">
          {searchQuery ? `Search results for "${searchQuery}"` : "All available stores"}
          {filters.inStock ? " with products in stock" : ""}
        </p>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredShops.map((shop) => {
          // Count how many products match the search query and filters
          const matchingProducts = shop.products.filter(p => 
            (!searchQuery || p.name.toLowerCase().includes(searchQuery.toLowerCase())) &&
            p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1] &&
            (!filters.inStock || p.inStock)
          );
          
          return (
            <Card key={shop.id} className="overflow-hidden">
              <div className="h-32 bg-gradient-to-r from-blue-500 to-purple-500 relative">
                <div className="absolute inset-0 flex flex-col justify-end p-4 text-white">
                  <Badge className="absolute top-2 right-2" variant={shop.isOpen ? "default" : "secondary"}>
                    {shop.isOpen ? "Open" : "Closed"}
                  </Badge>
                  <h3 className="text-xl font-bold drop-shadow-md">{shop.name}</h3>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span>{shop.rating}/5.0</span>
                  </div>
                </div>
              </div>
              
              <CardContent className="p-4">
                <div className="space-y-3">
                  <div className="flex items-start gap-2">
                    <MapPin className="h-4 w-4 text-gray-500 mt-1" />
                    <div>
                      <p className="text-sm text-gray-700">{shop.address}</p>
                      <p className="text-sm font-semibold">{shop.distance}</p>
                    </div>
                  </div>
                  
                  {matchingProducts.length > 0 && (
                    <div className="mt-2">
                      <h4 className="text-sm font-semibold mb-1">Products ({matchingProducts.length})</h4>
                      <div className="text-sm text-gray-600 space-y-1">
                        {matchingProducts.slice(0, 2).map(product => (
                          <div key={product.id} className="flex justify-between">
                            <span>{product.name}</span>
                            <span className="font-medium">₹{product.price.toLocaleString()}</span>
                          </div>
                        ))}
                        {matchingProducts.length > 2 && (
                          <p className="text-xs text-primary">+{matchingProducts.length - 2} more products</p>
                        )}
                      </div>
                    </div>
                  )}
                  
                  <div className="flex gap-2 mt-4">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1"
                      onClick={() => handleGetDirections(shop.address)}
                    >
                      <MapPin className="w-4 h-4 mr-1" />
                      Directions
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1"
                      onClick={() => window.location.href = `tel:${shop.phone}`}
                    >
                      <Phone className="w-4 h-4 mr-1" />
                      Call
                    </Button>
                  </div>
                  
                  <Button className="w-full" onClick={() => window.location.href = `/shop/${shop.id}`}>
                    <ShoppingBag className="w-4 h-4 mr-2" />
                    Shop Now
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
