
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MapPin, Navigation } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface LocationSearchInputProps {
  value: string;
  onChange: (location: string) => void;
  placeholder?: string;
}

export const LocationSearchInput = ({ 
  value, 
  onChange, 
  placeholder = "Enter your location" 
}: LocationSearchInputProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleCurrentLocation = async () => {
    if (!navigator.geolocation) {
      toast({
        title: "Location not supported",
        description: "Your browser doesn't support location services",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    
    navigator.geolocation.getCurrentPosition(
      (position) => {
        // In a real app, you would reverse geocode these coordinates
        const { latitude, longitude } = position.coords;
        onChange(`Current Location (${latitude.toFixed(2)}, ${longitude.toFixed(2)})`);
        setIsLoading(false);
        
        toast({
          title: "Location detected",
          description: "Using your current location for search",
        });
      },
      (error) => {
        setIsLoading(false);
        toast({
          title: "Location access denied",
          description: "Please enter your location manually",
          variant: "destructive"
        });
      }
    );
  };

  return (
    <div className="flex gap-2">
      <div className="relative flex-1">
        <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="pl-10"
        />
      </div>
      <Button
        type="button"
        variant="outline"
        size="icon"
        onClick={handleCurrentLocation}
        disabled={isLoading}
        title="Use current location"
      >
        <Navigation className="h-4 w-4" />
      </Button>
    </div>
  );
};
