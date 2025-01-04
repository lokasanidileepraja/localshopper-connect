import { Product } from "@/types/shop";

export const electronics: Product[] = [
  {
    id: "e1",
    name: "4K Smart TV",
    price: 49999,
    description: "55-inch 4K Ultra HD Smart LED TV",
    image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1",
    category: "tvs",
    rating: 4.5,
    stock: 10,
    brand: "TechVision",
    model: "TV-4K-55",
    inStock: true
  },
  {
    id: "e2",
    name: "Wireless Speaker",
    price: 9999,
    description: "Premium Bluetooth Speaker with Deep Bass",
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1",
    category: "speakers",
    rating: 4.3,
    stock: 15,
    brand: "SoundMax",
    model: "BT-Speaker-Pro",
    inStock: true
  },
  {
    id: "e3",
    name: "Gaming Console",
    price: 39999,
    description: "Next-gen Gaming Console with 4K Support",
    image: "https://images.unsplash.com/photo-1486401899868-0e435ed85128",
    category: "gaming",
    rating: 4.8,
    stock: 5,
    brand: "GameTech",
    model: "GT-4K-Pro",
    inStock: true
  }
];