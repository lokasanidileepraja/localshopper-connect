
import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { initializeMap } from "@/utils/mapUtils";
import { Shop } from "@/types/shop";

interface StoreMapProps {
  shops: Shop[];
  selectedShopId: string | null;
}

export const StoreMap = ({ shops, selectedShopId }: StoreMapProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    if (!mapContainer.current) return;

    // Initialize map
    const mapboxToken = "pk.eyJ1IjoiZXhhbXBsZXVzZXIiLCJhIjoiY2xnZzBjNXF6MDJxdzNlbnVkaW81aWN3MyJ9.G0SLRIqOM3aPsGtxixaErA";
    map.current = initializeMap(mapContainer.current, mapboxToken, shops);

    // Cleanup
    return () => {
      map.current?.remove();
    };
  }, [shops]);

  // Highlight selected shop on the map when selectedShopId changes
  useEffect(() => {
    if (!map.current || !selectedShopId) return;
    
    // This would be where you'd add logic to highlight the selected shop on the map
    // For example, you might change the marker color or show a popup
    console.log(`Shop selected: ${selectedShopId}`);
    
    // Find the selected shop
    const selectedShop = shops.find(shop => shop.id === selectedShopId);
    if (selectedShop) {
      // For demo purposes, we'll just log the shop name
      console.log(`Selected shop: ${selectedShop.name}`);
    }
  }, [selectedShopId, shops]);

  return (
    <div className="relative w-full h-full">
      <div ref={mapContainer} className="absolute inset-0 rounded-lg" />
      {!map.current && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-lg">
          <p className="text-gray-500">Loading map...</p>
        </div>
      )}
    </div>
  );
};
