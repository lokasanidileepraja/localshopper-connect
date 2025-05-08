
import mapboxgl from 'mapbox-gl';
import { Shop } from "@/types/shop";

export const initializeMap = (
  container: HTMLDivElement,
  token: string,
  shops: Shop[]
): mapboxgl.Map => {
  // Set the access token
  mapboxgl.accessToken = token;
  
  // Calculate the center of the map based on the shops
  // In a real app, you would use the actual coordinates of the shops
  // For now, we'll use a default location (Delhi)
  const mapCenter: [number, number] = [77.2090, 28.6139]; // Default to Delhi coordinates, explicitly typed as tuple
  
  // Initialize the map
  const map = new mapboxgl.Map({
    container,
    style: 'mapbox://styles/mapbox/light-v11',
    center: mapCenter,
    zoom: 11
  });

  // Add navigation controls
  map.addControl(new mapboxgl.NavigationControl(), 'top-right');
  
  // Add a scale control
  map.addControl(new mapboxgl.ScaleControl(), 'bottom-left');

  // Add markers for each store
  shops.forEach((shop, index) => {
    try {
      // For demo purposes, generating random coordinates around Delhi
      const lat = 28.6139 + (Math.random() - 0.5) * 0.1;
      const lng = 77.2090 + (Math.random() - 0.5) * 0.1;
      
      // Create coordinates as proper tuple
      const coordinates: [number, number] = [lng, lat];

      // Create a popup for the marker
      const popup = new mapboxgl.Popup({ offset: 25 })
        .setHTML(`
          <div class="p-2">
            <h3 class="font-semibold">${shop.name}</h3>
            <p class="text-sm">${shop.isOpen ? 'Open' : 'Closed'}</p>
            <p class="text-sm">Rating: ${shop.rating}⭐</p>
            <p class="text-sm">${shop.distance} away</p>
          </div>
        `);

      // Set marker color based on shop status
      const markerColor = shop.isOpen ? "#4CAF50" : "#9E9E9E";
      
      // Create a custom marker element
      const el = document.createElement('div');
      el.className = 'custom-marker';
      el.style.backgroundColor = markerColor;
      el.style.width = '30px';
      el.style.height = '30px';
      el.style.borderRadius = '50%';
      el.style.display = 'flex';
      el.style.justifyContent = 'center';
      el.style.alignItems = 'center';
      el.style.color = 'white';
      el.style.fontWeight = 'bold';
      el.style.boxShadow = '0 2px 6px rgba(0,0,0,0.3)';
      el.style.cursor = 'pointer';
      el.innerHTML = `${index + 1}`;
      
      // Add the marker to the map with properly typed coordinates
      new mapboxgl.Marker(el)
        .setLngLat(coordinates)
        .setPopup(popup)
        .addTo(map);
    } catch (error) {
      console.error(`Error adding marker for shop ${shop.name}:`, error);
    }
  });

  // Add a geolocation control to show user's location
  map.addControl(new mapboxgl.GeolocateControl({
    positionOptions: {
      enableHighAccuracy: true
    },
    trackUserLocation: true,
    showUserHeading: true
  }));

  return map;
};

export const flyToStore = (map: mapboxgl.Map, coords: [number, number]) => {
  map.flyTo({
    center: coords,
    zoom: 15,
    essential: true
  });
};

// Helper to get random coordinates around a center point
export const getRandomCoordinates = (
  centerLng: number,
  centerLat: number,
  radiusKm: number = 5
): [number, number] => {
  // Convert radius from km to degrees
  const radiusDegrees = radiusKm / 111;
  
  // Get random point in circle
  const angle = Math.random() * 2 * Math.PI;
  const radius = Math.sqrt(Math.random()) * radiusDegrees;
  
  const lng = centerLng + radius * Math.cos(angle);
  const lat = centerLat + radius * Math.sin(angle);
  
  return [lng, lat];
};
