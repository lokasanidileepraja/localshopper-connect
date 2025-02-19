
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, MapPin, Clock } from "lucide-react";
import { ELECTRONICS_SHOPS } from "@/data/shops";
import { Badge } from "@/components/ui/badge";

const Stores = () => {
  const navigate = useNavigate();

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
                <Button 
                  className="w-full" 
                  onClick={() => navigate(`/store/${shop.id}`)}
                >
                  View Store
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
