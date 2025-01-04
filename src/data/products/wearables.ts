import { Product } from "@/types/shop";

export const wearables: Product[] = [
  {
    id: "w1",
    name: "Apple Watch Series 8",
    price: 44999,
    description: "Advanced smartwatch with health features",
    image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a",
    category: "wearables",
    rating: 4.8,
    stock: 15,
    brand: "Apple",
    model: "Watch Series 8",
    inStock: true
  },
  {
    id: "w2",
    name: "Fitness Tracker",
    price: 9999,
    description: "Advanced fitness tracking band",
    image: "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6",
    category: "wearables",
    rating: 4.5,
    stock: 25,
    brand: "Fitbit",
    model: "Charge 5",
    inStock: true
  }
];