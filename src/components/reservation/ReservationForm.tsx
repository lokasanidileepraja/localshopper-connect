
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Clock, Phone, ShoppingBag } from "lucide-react";
import { motion } from "framer-motion";

interface ReservationFormProps {
  productName: string;
  storeName: string;
  storeAddress: string;
  storePhone: string;
  productPrice: number;
  productImage?: string;
}

export const ReservationForm = ({
  productName,
  storeName,
  storeAddress,
  storePhone,
  productPrice,
  productImage,
}: ReservationFormProps) => {
  const { toast } = useToast();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [pickupTime, setPickupTime] = useState("");
  const [isReserving, setIsReserving] = useState(false);
  const [isReserved, setIsReserved] = useState(false);
  const [reservationId, setReservationId] = useState("");

  const handleReservation = () => {
    if (!name || !phone || !pickupTime) {
      toast({
        title: "Missing information",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    setIsReserving(true);

    // Simulate API call
    setTimeout(() => {
      const resId = `RES-${Math.floor(Math.random() * 10000)}`;
      setReservationId(resId);
      setIsReserved(true);
      setIsReserving(false);

      toast({
        title: "Product Reserved!",
        description: `Reservation ID: ${resId}. The store will hold this item for 6 hours.`,
      });
    }, 1500);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl font-bold">Reserve for Pickup</CardTitle>
      </CardHeader>
      <CardContent>
        {!isReserved ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            <div className="flex flex-col md:flex-row gap-4 p-4 rounded-lg bg-secondary/30">
              <div className="md:w-1/3">
                {productImage && (
                  <img 
                    src={productImage} 
                    alt={productName} 
                    className="w-full h-32 object-contain"
                  />
                )}
              </div>
              <div className="md:w-2/3 space-y-2">
                <h3 className="font-semibold">{productName}</h3>
                <p className="text-muted-foreground">at {storeName}</p>
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="h-4 w-4 text-primary" />
                  <span>{storeAddress}</span>
                </div>
                <p className="text-xl font-bold text-primary">₹{productPrice.toLocaleString()}</p>
                <div className="flex items-center">
                  <span className="text-sm font-medium bg-primary/20 text-primary px-2 py-1 rounded-full">
                    ₹99 refundable deposit
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="space-y-1">
                <label className="text-sm font-medium">Your Name</label>
                <Input 
                  type="text" 
                  value={name} 
                  onChange={(e) => setName(e.target.value)} 
                  placeholder="Enter your full name"
                />
              </div>
              
              <div className="space-y-1">
                <label className="text-sm font-medium">Your Phone Number</label>
                <Input 
                  type="tel" 
                  value={phone} 
                  onChange={(e) => setPhone(e.target.value)} 
                  placeholder="Enter your phone number"
                />
              </div>
              
              <div className="space-y-1">
                <label className="text-sm font-medium">Pickup Time</label>
                <Input 
                  type="time" 
                  value={pickupTime} 
                  onChange={(e) => setPickupTime(e.target.value)} 
                  min={(new Date()).toISOString().split('T')[0]}
                />
                <p className="text-xs text-muted-foreground">
                  Store will hold your item for 6 hours from reservation time
                </p>
              </div>
            </div>

            <Button 
              onClick={handleReservation} 
              className="w-full" 
              disabled={isReserving}
            >
              {isReserving ? "Processing..." : "Pay ₹99 Deposit & Reserve"}
            </Button>
            
            <p className="text-xs text-center text-muted-foreground">
              By reserving, you agree to our Terms & Conditions.
              The ₹99 deposit is fully refundable if you decide not to purchase.
            </p>
          </motion.div>
        ) : (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="space-y-4 p-4 rounded-lg bg-green-50 border border-green-200"
          >
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-green-100 mb-4">
                <ShoppingBag className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-green-800">Reservation Confirmed!</h3>
              <p className="text-sm text-green-700 mb-4">Your item is being held for you</p>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="font-medium">Reservation ID:</span>
                <span>{reservationId}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Product:</span>
                <span>{productName}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Store:</span>
                <span>{storeName}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Pickup By:</span>
                <span>6 hours from now</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Deposit:</span>
                <span>₹99 (Refundable)</span>
              </div>
            </div>
            
            <div className="space-y-2 pt-4 border-t">
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-primary" />
                <div>
                  <h4 className="font-medium">Store Address</h4>
                  <p className="text-sm">{storeAddress}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-5 w-5 text-primary" />
                <div>
                  <h4 className="font-medium">Store Contact</h4>
                  <p className="text-sm">{storePhone}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-primary" />
                <div>
                  <h4 className="font-medium">Reservation Period</h4>
                  <p className="text-sm">6 hours from confirmation</p>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-3 pt-2">
              <Button 
                variant="outline"
                onClick={() => window.open(`tel:${storePhone}`)}
              >
                <Phone className="h-4 w-4 mr-2" />
                Call Store
              </Button>
              <Button
                onClick={() => window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(storeAddress)}`, '_blank')}
              >
                <MapPin className="h-4 w-4 mr-2" />
                Get Directions
              </Button>
            </div>
          </motion.div>
        )}
      </CardContent>
    </Card>
  );
};
