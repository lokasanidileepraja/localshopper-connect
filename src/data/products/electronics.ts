import { Product } from "@/types/shop";

export const electronics: Product[] = [
  {
    id: "e1",
    name: "4K Smart TV",
    price: 49999,
    description: "55-inch 4K Ultra HD Smart LED TV",
    image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1",
    category: "electronics",
    rating: 4.5,
    stock: 10,
    brand: "TechVision",
    model: "TV-4K-55",
    inStock: true
  },
  {
    id: "e2",
    name: "Smart Home Hub",
    price: 9999,
    description: "Voice-controlled smart home device",
    image: "https://images.unsplash.com/photo-1558089687-f282ffcbc126",
    category: "electronics",
    rating: 4.3,
    stock: 15,
    brand: "SmartLife",
    model: "SH-200",
    inStock: true
  }
];