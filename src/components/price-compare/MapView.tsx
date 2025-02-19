
import { ELECTRONICS_SHOPS } from "@/data/shops";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

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

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {ELECTRONICS_SHOPS.map((shop) => (
        <Card key={shop.id}>
          <CardHeader>
            <CardTitle className="text-lg">{shop.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">{shop.address}</p>
              <p className="text-sm text-muted-foreground">{shop.distance}</p>
              <div className="flex gap-2 mt-4">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1"
                  onClick={() => handleGetDirections(shop.address)}
                >
                  <MapPin className="w-4 h-4 mr-2" />
                  Directions
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1"
                  onClick={() => window.location.href = `tel:${shop.phone}`}
                >
                  <Phone className="w-4 h-4 mr-2" />
                  Call
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
