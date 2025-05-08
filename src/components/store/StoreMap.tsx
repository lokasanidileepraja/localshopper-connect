
import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { initializeMap } from "@/utils/mapUtils";
import { Shop } from "@/types/shop";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

interface StoreMapProps {
  shops: Shop[];
  selectedShopId: string | null;
}

export const StoreMap = ({ shops, selectedShopId }: StoreMapProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapboxToken, setMapboxToken] = useState<string>(() => {
    // Try to retrieve token from localStorage if previously saved
    return localStorage.getItem("mapbox_token") || "";
  });
  const [showInput, setShowInput] = useState<boolean>(() => !localStorage.getItem("mapbox_token"));
  const { toast } = useToast();

  // Function to initialize the map
  const initMap = () => {
    if (!mapContainer.current || !mapboxToken) return;

    try {
      // Save token to localStorage for future visits
      localStorage.setItem("mapbox_token", mapboxToken);
      
      // Initialize map
      map.current = initializeMap(mapContainer.current, mapboxToken, shops);

      // Hide the input form
      setShowInput(false);

      toast({
        title: "Map loaded successfully",
        description: "You can now browse nearby stores on the map.",
      });
    } catch (error) {
      console.error("Map initialization error:", error);
      toast({
        title: "Map error",
        description: "There was an error loading the map. Please check your Mapbox token.",
        variant: "destructive"
      });
      // Clear token if invalid
      localStorage.removeItem("mapbox_token");
      setShowInput(true);
    }
  };

  // Highlight selected shop on the map when selectedShopId changes
  useEffect(() => {
    if (!map.current || !selectedShopId) return;
    
    // Find the selected shop
    const selectedShop = shops.find(shop => shop.id === selectedShopId);
    if (selectedShop) {
      console.log(`Selected shop: ${selectedShop.name}`);
      
      // For demo purposes, we'll just center the map on a random location
      // In a real app, you would have the actual coordinates
      const lat = 28.6139 + (Math.random() - 0.5) * 0.1;
      const lng = 77.2090 + (Math.random() - 0.5) * 0.1;
      
      map.current.flyTo({
        center: [lng, lat] as [number, number],
        zoom: 14,
        essential: true
      });
    }
  }, [selectedShopId, shops]);

  // Initialize map on component mount if token exists
  useEffect(() => {
    if (mapboxToken && !showInput) {
      initMap();
    }
  }, []);

  return (
    <div className="relative w-full h-full">
      {showInput ? (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
          <div className="w-full max-w-md space-y-4">
            <Alert>
              <AlertTitle>Mapbox API Key Required</AlertTitle>
              <AlertDescription>
                To display the map, please enter your Mapbox public token. 
                You can get one for free at <a href="https://www.mapbox.com/" target="_blank" rel="noopener noreferrer" className="text-primary underline">mapbox.com</a>.
              </AlertDescription>
            </Alert>
            <div className="flex gap-2">
              <Input
                type="text"
                placeholder="Enter your Mapbox public token"
                value={mapboxToken}
                onChange={(e) => setMapboxToken(e.target.value)}
                className="flex-1"
              />
              <Button onClick={initMap} disabled={!mapboxToken}>
                Load Map
              </Button>
            </div>
          </div>
        </div>
      ) : null}
      
      <div ref={mapContainer} className="absolute inset-0 rounded-lg" />
      
      {!map.current && !showInput && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-lg">
          <p className="text-gray-500">Loading map...</p>
        </div>
      )}
    </div>
  );
};
