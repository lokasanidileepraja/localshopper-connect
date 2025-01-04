import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Navigation } from "lucide-react";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";

interface Store {
  id: string;
  name: string;
  distance: string;
  address: string;
}

interface NearbyStoreFinderProps {
  stores: Store[];
  onStoreSelect: (storeId: string) => void;
}

export const NearbyStoreFinder = ({ stores, onStoreSelect }: NearbyStoreFinderProps) => {
  const { toast } = useToast();

  const handleGetDirections = (storeName: string) => {
    toast({
      title: "Opening Maps",
      description: `Getting directions to ${storeName}...`,
      duration: 3000,
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="h-5 w-5" />
          Nearby Stores
        </CardTitle>
      </CardHeader>
      <CardContent>
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="space-y-4"
        >
          {stores.map((store, index) => (
            <motion.div
              key={store.id}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center justify-between p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
            >
              <div>
                <h3 className="font-medium">{store.name}</h3>
                <p className="text-sm text-gray-500">{store.distance} away</p>
                <p className="text-sm text-gray-500">{store.address}</p>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleGetDirections(store.name)}
                >
                  <Navigation className="h-4 w-4 mr-2" />
                  Directions
                </Button>
                <Button
                  size="sm"
                  onClick={() => onStoreSelect(store.id)}
                >
                  View Store
                </Button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </CardContent>
    </Card>
  );
};