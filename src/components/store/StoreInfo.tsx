
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, MapPin, Clock, Phone, ExternalLink, Navigation, AlertTriangle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { analytics } from "@/lib/analytics";

interface StoreInfoProps {
  id: string;
  name: string;
  address: string;
  phone: string;
  hours?: string;
  rating: number;
  isOpen: boolean;
}

export const StoreInfo = ({
  id,
  name,
  address,
  phone,
  hours = "Not available",
  rating,
  isOpen,
}: StoreInfoProps) => {
  const { toast } = useToast();

  const handleContact = () => {
    window.location.href = `tel:${phone}`;
    toast({
      title: "Contact Store",
      description: "Initiating call to store...",
    });
    
    analytics.trackEvent('store_contact', { 
      storeId: id, 
      storeName: name 
    });
  };

  const handleDirections = () => {
    // Open in Google Maps
    window.open(
      `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        address
      )}`,
      "_blank"
    );
    toast({
      title: "Get Directions",
      description: "Opening store location in maps...",
    });
    
    analytics.trackEvent('store_directions', { 
      storeId: id, 
      storeName: name,
      address
    });
  };

  const handleWebsite = () => {
    // In a real app, we would have the actual website URL
    window.open(`https://www.example.com/store/${id}`, "_blank");
    toast({
      title: "Visit Website",
      description: "Opening store website...",
    });
    
    analytics.trackEvent('store_website_visit', { 
      storeId: id, 
      storeName: name 
    });
  };

  // Check if important data is missing
  const hasMissingData = !address || !phone;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-2xl">{name}</CardTitle>
          <Badge variant={isOpen ? "default" : "secondary"}>
            {isOpen ? "Open Now" : "Closed"}
          </Badge>
        </CardHeader>
        <CardContent className="space-y-6">
          {hasMissingData && (
            <div className="bg-yellow-50 border border-yellow-100 rounded-md p-3 flex items-center gap-2 text-yellow-700">
              <AlertTriangle className="h-4 w-4" />
              <p className="text-xs">Some store information may be incomplete</p>
            </div>
          )}
          
          <div className="space-y-3">
            <div className="flex items-center gap-3 text-sm">
              <MapPin className="h-4 w-4 text-gray-500" />
              <span>{address || "Address not available"}</span>
            </div>

            <div className="flex items-center gap-3 text-sm">
              <Phone className="h-4 w-4 text-gray-500" />
              <span>{phone || "Phone not available"}</span>
            </div>

            <div className="flex items-center gap-3 text-sm">
              <Clock className="h-4 w-4 text-gray-500" />
              <span>{hours}</span>
            </div>

            <div className="flex items-center gap-2 text-sm">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span>{rating.toFixed(1)} / 5.0</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Button 
              variant="outline" 
              className="w-full gap-2" 
              onClick={handleDirections}
              disabled={!address}
            >
              <Navigation className="h-4 w-4" />
              Directions
            </Button>
            <Button 
              variant="outline" 
              className="w-full gap-2" 
              onClick={handleContact}
              disabled={!phone}
            >
              <Phone className="h-4 w-4" />
              Call
            </Button>
          </div>
          
          <Button 
            className="w-full gap-2" 
            onClick={handleWebsite}
          >
            <ExternalLink className="h-4 w-4" />
            Visit Website
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
};
