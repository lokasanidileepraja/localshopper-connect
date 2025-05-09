
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

// Helper function to create a marker with popup
export const createInteractiveMarker = (
  map: mapboxgl.Map,
  shop: Shop,
  coordinates: [number, number],
  isSelected: boolean = false
): mapboxgl.Marker => {
  // Create a custom marker element
  const el = document.createElement('div');
  el.className = 'custom-marker';
  el.style.backgroundColor = isSelected ? "#4CAF50" : "#9E9E9E";
  el.style.width = isSelected ? "40px" : "30px";
  el.style.height = isSelected ? "40px" : "30px";
  el.style.borderRadius = "50%";
  el.style.display = "flex";
  el.style.justifyContent = "center";
  el.style.alignItems = "center";
  el.style.color = "white";
  el.style.fontWeight = "bold";
  el.style.boxShadow = "0 2px 6px rgba(0,0,0,0.3)";
  el.style.cursor = "pointer";
  el.style.transition = "all 0.3s ease";
  el.innerHTML = `${shop.name.charAt(0)}`;
  
  // Create popup content
  const popup = new mapboxgl.Popup({ offset: 25 })
    .setHTML(`
      <div class="p-3 max-w-xs">
        <h3 class="font-semibold text-lg mb-1">${shop.name}</h3>
        <p class="text-sm text-gray-600 mb-2">${shop.isOpen ? 'Open' : 'Closed'} • Rating: ${shop.rating}⭐</p>
        <div class="font-medium text-sm mb-2">Top Products:</div>
        <div class="space-y-2">
          ${shop.products.slice(0, 3).map(product => `
            <div class="flex items-center gap-2">
              <div class="w-8 h-8 bg-gray-200 rounded flex-shrink-0"></div>
              <div>
                <div class="text-xs font-medium">${product.name}</div>
                <div class="text-xs text-primary">₹${product.price}</div>
              </div>
            </div>
          `).join('')}
        </div>
        <button class="w-full mt-2 bg-primary text-white text-xs py-1 px-2 rounded">
          View Store
        </button>
      </div>
    `);

  // Create and return the marker
  return new mapboxgl.Marker(el)
    .setLngLat(coordinates)
    .setPopup(popup);
};

// Calculate the optimal bounds to fit all store markers
export const getBoundsForMarkers = (coordinates: [number, number][]): mapboxgl.LngLatBounds => {
  const bounds = new mapboxgl.LngLatBounds();
  
  coordinates.forEach(coord => {
    bounds.extend(coord);
  });
  
  return bounds;
};

// Function to get coordinates for all shops
export const getShopCoordinates = (shops: Shop[]): [number, number][] => {
  return shops.map(shop => {
    // In a real app, you would use the actual coordinates stored in the shop data
    // For demo purposes, generating random coordinates around Delhi
    return getRandomCoordinates(77.2090, 28.6139, 5);
  });
};
