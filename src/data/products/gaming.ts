import { Product } from "@/types/shop";

export const gaming: Product[] = [
  {
    id: "g1",
    name: "PlayStation 5",
    price: 49999,
    description: "Next-gen gaming console",
    image: "https://images.unsplash.com/photo-1486401899868-0e435ed85128",
    category: "gaming",
    rating: 4.9,
    stock: 5,
    brand: "Sony",
    model: "PS5",
    inStock: true
  },
  {
    id: "g2",
    name: "Gaming Headset",
    price: 12999,
    description: "7.1 surround sound gaming headset",
    image: "https://images.unsplash.com/photo-1599669454699-248893623440",
    category: "gaming",
    rating: 4.6,
    stock: 18,
    brand: "Razer",
    model: "BlackShark V2",
    inStock: true
  }
];