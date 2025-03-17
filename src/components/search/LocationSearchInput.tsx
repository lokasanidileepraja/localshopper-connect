
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MapPin, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface LocationSearchInputProps {
  value: string;
  onChange: (location: string) => void;
  className?: string;
}

export const LocationSearchInput = ({ value, onChange, className }: LocationSearchInputProps) => {
  const { toast } = useToast();
  const [location, setLocation] = useState(value);
  const [isLocating, setIsLocating] = useState(false);

  const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocation(e.target.value);
  };

  const handleClearLocation = () => {
    setLocation("");
    onChange("");
  };

  const handleDetectLocation = () => {
    setIsLocating(true);
    
    if (!navigator.geolocation) {
      toast({
        title: "Geolocation not supported",
        description: "Your browser does not support geolocation",
        variant: "destructive",
      });
      setIsLocating(false);
      return;
    }
    
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          // In a real app, you'd use a service like Google Maps Geocoding API
          // For now, we'll simulate a location lookup
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          const simulatedLocation = "Connaught Place, New Delhi";
          setLocation(simulatedLocation);
          onChange(simulatedLocation);
          
          toast({
            title: "Location detected",
            description: `Located you at ${simulatedLocation}`,
          });
        } catch (error) {
          toast({
            title: "Location detection failed",
            description: "Could not determine your location",
            variant: "destructive",
          });
        } finally {
          setIsLocating(false);
        }
      },
      (error) => {
        toast({
          title: "Location access denied",
          description: "Please enable location access or enter your location manually",
          variant: "destructive",
        });
        setIsLocating(false);
      }
    );
  };

  useEffect(() => {
    // Sync with parent value if it changes externally
    if (value !== location) {
      setLocation(value);
    }
  }, [value]);

  useEffect(() => {
    // Only update parent when user stops typing
    const handler = setTimeout(() => {
      if (location !== value) {
        onChange(location);
      }
    }, 500);
    
    return () => clearTimeout(handler);
  }, [location, onChange, value]);

  return (
    <div className={`relative flex items-center gap-2 ${className}`}>
      <div className="relative flex-1">
        <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Enter location or area..."
          value={location}
          onChange={handleLocationChange}
          className="pl-10 pr-8"
        />
        {location && (
          <button
            type="button"
            onClick={handleClearLocation}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
      <Button
        variant="outline"
        size="icon"
        onClick={handleDetectLocation}
        disabled={isLocating}
        className="shrink-0"
      >
        <MapPin className={`h-4 w-4 ${isLocating ? 'animate-pulse' : ''}`} />
      </Button>
    </div>
  );
};
