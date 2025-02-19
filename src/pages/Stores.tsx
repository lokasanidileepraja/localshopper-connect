
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, MapPin, Clock, Phone, Globe } from "lucide-react";
import { ELECTRONICS_SHOPS } from "@/data/shops";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

const Stores = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleStoreView = (shopId: string) => {
    // Navigate to the store's product listing page
    navigate(`/category/electronics?store=${shopId}`);
  };

  const handleContact = (phone: string) => {
    window.location.href = `tel:${phone}`;
    toast({
      title: "Contact Store",
      description: "Initiating call to store...",
    });
  };

  const handleDirections = (address: string) => {
    // Open in Google Maps
    window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`, '_blank');
    toast({
      title: "Get Directions",
      description: "Opening store location in maps...",
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Nearby Electronics Stores</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {ELECTRONICS_SHOPS.map((shop) => (
          <Card key={shop.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle className="text-xl">{shop.name}</CardTitle>
                <Badge variant={shop.isOpen ? "default" : "secondary"}>
                  {shop.isOpen ? "Open" : "Closed"}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <MapPin className="h-4 w-4" />
                  <span>{shop.distance}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span>{shop.rating} / 5.0</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Clock className="h-4 w-4" />
                  <span>{shop.isOpen ? "Open Now" : "Currently Closed"}</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <Button 
                    variant="outline"
                    onClick={() => handleDirections(shop.address)}
                  >
                    <MapPin className="h-4 w-4 mr-2" />
                    Directions
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => handleContact(shop.phone)}
                  >
                    <Phone className="h-4 w-4 mr-2" />
                    Contact
                  </Button>
                </div>
                <Button 
                  className="w-full" 
                  onClick={() => handleStoreView(shop.id)}
                >
                  View Products
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Stores;
