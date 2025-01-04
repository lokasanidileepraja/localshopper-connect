import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, MapPin, Phone, Star } from "lucide-react";
import { motion } from "framer-motion";

interface StoreInfoProps {
  name: string;
  address: string;
  phone: string;
  hours: string;
  rating: number;
  isOpen: boolean;
}

export const StoreInfo = ({ name, address, phone, hours, rating, isOpen }: StoreInfoProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>{name}</span>
          <Badge variant={isOpen ? "default" : "secondary"}>
            {isOpen ? "Open Now" : "Closed"}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-4"
        >
          <div className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-primary" />
            <span>{address}</span>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="h-5 w-5 text-primary" />
            <span>{phone}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-primary" />
            <span>{hours}</span>
          </div>
          <div className="flex items-center gap-2">
            <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
            <span>{rating} / 5.0</span>
          </div>
        </motion.div>
      </CardContent>
    </Card>
  );
};