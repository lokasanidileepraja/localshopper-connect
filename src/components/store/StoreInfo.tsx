
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, MapPin, Clock, Phone, ExternalLink, Navigation } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

interface StoreInfoProps {
  id: string;
  name: string;
  address: string;
  phone: string;
  hours: string;
  rating: number;
  isOpen: boolean;
}

export const StoreInfo = ({
  id,
  name,
  address,
  phone,
  hours,
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
  };

  const handleWebsite = () => {
    // In a real app, we would have the actual website URL
    window.open(`https://www.example.com/store/${id}`, "_blank");
    toast({
      title: "Visit Website",
      description: "Opening store website...",
    });
  };

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
          <div className="space-y-3">
            <div className="flex items-center gap-3 text-sm">
              <MapPin className="h-4 w-4 text-gray-500" />
              <span>{address}</span>
            </div>

            <div className="flex items-center gap-3 text-sm">
              <Phone className="h-4 w-4 text-gray-500" />
              <span>{phone}</span>
            </div>

            <div className="flex items-center gap-3 text-sm">
              <Clock className="h-4 w-4 text-gray-500" />
              <span>{hours}</span>
            </div>

            <div className="flex items-center gap-2 text-sm">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span>{rating} / 5.0</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Button 
              variant="outline" 
              className="w-full gap-2" 
              onClick={handleDirections}
            >
              <Navigation className="h-4 w-4" />
              Directions
            </Button>
            <Button 
              variant="outline" 
              className="w-full gap-2" 
              onClick={handleContact}
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
