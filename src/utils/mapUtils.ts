
import mapboxgl from 'mapbox-gl';
import { Shop } from "@/types/shop";

export const initializeMap = (
  container: HTMLDivElement,
  token: string,
  shops: Shop[]
): mapboxgl.Map => {
  mapboxgl.accessToken = token;
  
  // Calculate the center of the map based on the shops
  // In a real app, you would use the actual coordinates of the shops
  // For now, we'll use a default location (Delhi)
  const mapCenter = [77.2090, 28.6139]; // Default to Delhi coordinates
  
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
    // For demo purposes, generating random coordinates around Delhi
    const lat = 28.6139 + (Math.random() - 0.5) * 0.1;
    const lng = 77.2090 + (Math.random() - 0.5) * 0.1;

    const popup = new mapboxgl.Popup({ offset: 25 })
      .setHTML(`
        <div class="p-2">
          <h3 class="font-semibold">${shop.name}</h3>
          <p class="text-sm">${shop.isOpen ? 'Open' : 'Closed'}</p>
          <p class="text-sm">Rating: ${shop.rating}⭐</p>
          <p class="text-sm">${shop.distance} away</p>
        </div>
      `);

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
    
    // Add the marker to the map
    new mapboxgl.Marker(el)
      .setLngLat([lng, lat])
      .setPopup(popup)
      .addTo(map);
  });

  // Add a geolocation control
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
