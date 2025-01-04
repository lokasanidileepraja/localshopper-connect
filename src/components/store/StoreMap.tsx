import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState, useEffect, useRef } from "react";
import { useToast } from "@/hooks/use-toast";
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { ELECTRONICS_SHOPS } from "@/data/shops";
import { initializeMap } from "@/utils/mapUtils";

export const StoreMap = () => {
  const [mapboxToken, setMapboxToken] = useState("");
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const { toast } = useToast();

  const handleSaveToken = () => {
    if (!mapboxToken) {
      toast({
        title: "Missing Token",
        description: "Please enter your Mapbox token",
        variant: "destructive",
      });
      return;
    }
    
    try {
      if (mapContainer.current) {
        map.current = initializeMap(mapContainer.current, mapboxToken, ELECTRONICS_SHOPS);
        toast({
          title: "Success",
          description: "Map initialized successfully",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to initialize map. Please check your token.",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    return () => {
      if (map.current) {
        map.current.remove();
      }
    };
  }, []);

  return (
    <Card className="p-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Map Configuration Required</h3>
          <p className="text-sm text-muted-foreground">
            To view the store locations on a map, please enter your Mapbox public token.
            You can find this in your Mapbox account dashboard.
          </p>
        </div>
        
        <div className="flex gap-2">
          <Input
            type="text"
            placeholder="Enter your Mapbox public token"
            value={mapboxToken}
            onChange={(e) => setMapboxToken(e.target.value)}
          />
          <Button onClick={handleSaveToken}>Save Token</Button>
        </div>
        
        <div ref={mapContainer} className="h-[600px] bg-muted rounded-lg" />
      </div>
    </Card>
  );
};