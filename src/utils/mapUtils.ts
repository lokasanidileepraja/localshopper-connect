import mapboxgl from 'mapbox-gl';
import { Shop } from "@/types/shop";

export const initializeMap = (
  container: HTMLDivElement,
  token: string,
  shops: Shop[]
): mapboxgl.Map => {
  mapboxgl.accessToken = token;
  
  const map = new mapboxgl.Map({
    container,
    style: 'mapbox://styles/mapbox/light-v11',
    center: [77.2090, 28.6139], // Default to Delhi coordinates
    zoom: 11
  });

  // Add navigation controls
  map.addControl(new mapboxgl.NavigationControl(), 'top-right');

  // Add markers for each store
  shops.forEach(shop => {
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
      .addTo(map);
  });

  return map;
};