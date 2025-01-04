import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState, useEffect, useRef } from "react";
import { useToast } from "@/hooks/use-toast";
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { ELECTRONICS_SHOPS } from "@/data/shops";

export const StoreMap = () => {
  const [mapboxToken, setMapboxToken] = useState("");
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const { toast } = useToast();

  const initializeMap = (token: string) => {
    if (!mapContainer.current) return;

    mapboxgl.accessToken = token;
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/light-v11',
      center: [77.2090, 28.6139], // Default to Delhi coordinates
      zoom: 11
    });

    // Add navigation controls
    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

    // Add markers for each store
    ELECTRONICS_SHOPS.forEach(shop => {
      // For demo purposes, generating random coordinates around Delhi
      const lat = 28.6139 + (Math.random() - 0.5) * 0.1;
      const lng = 77.2090 + (Math.random() - 0.5) * 0.1;

      const popup = new mapboxgl.Popup({ offset: 25 })
        .setHTML(`
          <div class="p-2">
            <h3 class="font-semibold">${shop.name}</h3>
            <p class="text-sm">${shop.isOpen ? 'Open' : 'Closed'}</p>
            <p class="text-sm">Rating: ${shop.rating}⭐</p>
          </div>
        `);

      new mapboxgl.Marker()
        .setLngLat([lng, lat])
        .setPopup(popup)
        .addTo(map.current);
    });
  };

  const handleSaveToken = () => {
    if (!mapboxToken) {
      toast({
        title: "Error",
        description: "Please enter your Mapbox token",
        variant: "destructive",
      });
      return;
    }
    
    try {
      initializeMap(mapboxToken);
      toast({
        title: "Success",
        description: "Map initialized successfully",
      });
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