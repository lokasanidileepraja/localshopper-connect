export const initializeMap = (container: HTMLElement, accessToken: string) => {
  // This would contain map initialization logic
  // Currently handled in StoreMap component
  return null;
};

export const getRandomCoordinates = (centerLat: number = 28.6139, centerLng: number = 77.2090, radius: number = 0.1) => {
  // Generate random coordinates around a center point
  const lat = centerLat + (Math.random() - 0.5) * radius;
  const lng = centerLng + (Math.random() - 0.5) * radius;
  return [lng, lat] as [number, number];
};

export const calculateDistance = (lat1: number, lng1: number, lat2: number, lng2: number) => {
  // Haversine formula for calculating distance between two points
  const R = 6371; // Earth's radius in kilometers
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLng = (lng2 - lng1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLng/2) * Math.sin(dLng/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c; // Distance in kilometers
};
