
import { useEffect, useRef, useState, useCallback, memo } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { initializeMap, getRandomCoordinates } from "@/utils/mapUtils";
import { Shop } from "@/types/shop";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { StoreMarker } from "./StoreMarker";
import ReactDOM from "react-dom";
import { analytics } from "@/lib/analytics";

interface StoreMapProps {
  shops: Shop[];
  selectedShopId: string | null;
  onShopSelect: (shopId: string) => void;
}

export const StoreMap = memo(({ shops, selectedShopId, onShopSelect }: StoreMapProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const markersRef = useRef<{ [key: string]: mapboxgl.Marker }>({});
  const [mapboxToken, setMapboxToken] = useState<string>(() => {
    // Try to retrieve token from localStorage if previously saved
    return localStorage.getItem("mapbox_token") || "";
  });
  const [showInput, setShowInput] = useState<boolean>(() => !localStorage.getItem("mapbox_token"));
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  // Function to initialize the map - memoized to prevent unnecessary rerenders
  const initMap = useCallback(() => {
    if (!mapContainer.current || !mapboxToken) return;
    
    setLoading(true);
    setError(null);

    try {
      // Save token to localStorage for future visits
      localStorage.setItem("mapbox_token", mapboxToken);
      
      // Initialize the base map without markers
      mapboxgl.accessToken = mapboxToken;
      
      if (map.current) {
        map.current.remove();
      }
      
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/light-v11',
        center: [77.2090, 28.6139], // Default to Delhi coordinates
        zoom: 11
      });

      // Add navigation controls
      map.current.addControl(
        new mapboxgl.NavigationControl(),
        'top-right'
      );
      
      // Add a scale control
      map.current.addControl(
        new mapboxgl.ScaleControl(), 
        'bottom-left'
      );

      // Add a geolocation control to show user's location
      map.current.addControl(
        new mapboxgl.GeolocateControl({
          positionOptions: {
            enableHighAccuracy: true
          },
          trackUserLocation: true,
          showUserHeading: true
        })
      );

      // Wait for the map to load before adding markers
      map.current.on('load', () => {
        addMarkersToMap();
      });

      // Hide the input form
      setShowInput(false);
      
      toast({
        title: "Map loaded successfully",
        description: "You can now browse nearby stores on the map.",
      });
      
      analytics.trackEvent('map_initialized', { 
        success: true
      });
    } catch (error) {
      console.error("Map initialization error:", error);
      setError("There was an error loading the map. Please check your Mapbox token.");
      
      // Clear token if invalid
      localStorage.removeItem("mapbox_token");
      setShowInput(true);
      
      analytics.trackEvent('map_error', { 
        error: error instanceof Error ? error.message : 'Unknown error',
        stage: 'initialization'
      });
    } finally {
      setLoading(false);
    }
  }, [mapboxToken, toast]);

  // Function to add interactive markers to the map - memoized
  const addMarkersToMap = useCallback(() => {
    if (!map.current) return;
    
    // Clear existing markers
    Object.values(markersRef.current).forEach(marker => marker.remove());
    markersRef.current = {};
    
    // Add a marker for each store
    shops.forEach(shop => {
      try {
        // For demo purposes, generating random coordinates around Delhi
        // In a real app, you would use actual store coordinates
        const lat = 28.6139 + (Math.random() - 0.5) * 0.1;
        const lng = 77.2090 + (Math.random() - 0.5) * 0.1;
        
        // Create a DOM element for the custom marker
        const markerElement = document.createElement('div');
        markerElement.className = 'store-marker';
        
        // Use React to render our custom marker component
        const marker = new mapboxgl.Marker({
          element: markerElement,
          anchor: 'bottom',
        }).setLngLat([lng, lat]);
        
        // Add to map
        marker.addTo(map.current as mapboxgl.Map);
        
        // Store reference to remove later
        markersRef.current[shop.id] = marker;
        
        // Render our React component inside the marker element
        ReactDOM.render(
          <StoreMarker 
            shop={shop} 
            onClick={onShopSelect}
            isSelected={selectedShopId === shop.id}
          />,
          markerElement
        );
      } catch (error) {
        console.error(`Error adding marker for ${shop.name}:`, error);
        
        analytics.trackEvent('map_marker_error', { 
          shopId: shop.id,
          shopName: shop.name,
          error: error instanceof Error ? error.message : 'Unknown error'
        });
      }
    });
    
    // Adjust map bounds to fit all markers if we have shops
    if (shops.length > 0 && map.current) {
      const bounds = new mapboxgl.LngLatBounds();
      
      Object.values(markersRef.current).forEach(marker => {
        bounds.extend(marker.getLngLat());
      });
      
      map.current.fitBounds(bounds, {
        padding: { top: 50, bottom: 50, left: 50, right: 50 },
        maxZoom: 15
      });
    }
  }, [shops, selectedShopId, onShopSelect]);

  // Fly to selected shop when selectedShopId changes
  useEffect(() => {
    if (!map.current || !selectedShopId) return;
    
    const marker = markersRef.current[selectedShopId];
    if (marker) {
      map.current.flyTo({
        center: marker.getLngLat(),
        zoom: 14,
        essential: true
      });
    }
  }, [selectedShopId]);

  // Update markers when shops list changes
  useEffect(() => {
    if (map.current && map.current.loaded()) {
      addMarkersToMap();
    }
  }, [shops, addMarkersToMap]);

  // Initialize map on component mount if token exists
  useEffect(() => {
    if (mapboxToken && !showInput && !map.current) {
      initMap();
    }
    
    // Cleanup function
    return () => {
      // Clean up ReactDOM renders to prevent memory leaks
      Object.values(markersRef.current).forEach(marker => {
        const markerElement = marker.getElement();
        ReactDOM.unmountComponentAtNode(markerElement);
        marker.remove();
      });
      
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, [mapboxToken, showInput, initMap]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!mapboxToken.trim()) {
      setError("Please enter a valid Mapbox token");
      return;
    }
    initMap();
  };

  return (
    <div className="relative w-full h-full">
      {showInput ? (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
          <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4">
            <Alert>
              <AlertTitle>Mapbox API Key Required</AlertTitle>
              <AlertDescription>
                To display the map, please enter your Mapbox public token. 
                You can get one for free at <a href="https://www.mapbox.com/" target="_blank" rel="noopener noreferrer" className="text-primary underline">mapbox.com</a>.
              </AlertDescription>
            </Alert>
            
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            
            <div className="flex gap-2">
              <Input
                type="text"
                placeholder="Enter your Mapbox public token"
                value={mapboxToken}
                onChange={(e) => setMapboxToken(e.target.value)}
                className="flex-1"
              />
              <Button type="submit" disabled={loading || !mapboxToken.trim()}>
                {loading ? <LoadingSpinner size="sm" /> : "Load Map"}
              </Button>
            </div>
          </form>
        </div>
      ) : null}
      
      <div ref={mapContainer} className="absolute inset-0 rounded-lg" />
      
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100/80 rounded-lg">
          <LoadingSpinner size="lg" />
        </div>
      )}
      
      {!map.current && !showInput && !loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-lg">
          <p className="text-gray-500">Loading map...</p>
        </div>
      )}
    </div>
  );
});

// Add displayName for better debugging
StoreMap.displayName = "StoreMap";
