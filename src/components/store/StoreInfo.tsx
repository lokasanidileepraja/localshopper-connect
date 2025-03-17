
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, MapPin, Phone, Star, Shield, Calendar } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { StoreRatingForm } from "./StoreRatingForm";

interface StoreInfoProps {
  id: string;
  name: string;
  address: string;
  phone: string;
  hours: string;
  rating: number;
  isOpen: boolean;
  isVerified?: boolean;
  lastUpdated?: string;
}

export const StoreInfo = ({ 
  id,
  name, 
  address, 
  phone, 
  hours, 
  rating, 
  isOpen, 
  isVerified = false,
  lastUpdated 
}: StoreInfoProps) => {
  const [showRatingForm, setShowRatingForm] = useState(false);

  const formattedLastUpdated = lastUpdated 
    ? new Date(lastUpdated).toLocaleString('en-IN', { 
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    : 'No data';

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span>{name}</span>
            {isVerified && (
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                <Shield className="h-3 w-3 mr-1 fill-green-500" /> Verified Retailer
              </Badge>
            )}
          </div>
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
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
              <span>{rating.toFixed(1)} / 5.0</span>
            </div>
            <Button variant="outline" size="sm" onClick={() => setShowRatingForm(!showRatingForm)}>
              {showRatingForm ? "Cancel" : "Rate Store"}
            </Button>
          </div>
          
          {lastUpdated && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground pt-1">
              <Calendar className="h-4 w-4" />
              <span>Prices last updated: {formattedLastUpdated}</span>
            </div>
          )}
          
          {showRatingForm && (
            <StoreRatingForm 
              storeId={id} 
              storeName={name} 
              onRatingSubmitted={() => setShowRatingForm(false)}
            />
          )}
        </motion.div>
      </CardContent>
    </Card>
  );
};
