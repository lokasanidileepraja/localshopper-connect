import { Product } from "@/types/shop";

export const accessories: Product[] = [
  {
    id: "a1",
    name: "Wireless Mouse",
    price: 2999,
    description: "Ergonomic wireless mouse",
    image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46",
    category: "accessories",
    rating: 4.4,
    stock: 30,
    brand: "Logitech",
    model: "MX Master 3",
    inStock: true
  },
  {
    id: "a2",
    name: "Mechanical Keyboard",
    price: 8999,
    description: "RGB mechanical gaming keyboard",
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3",
    category: "accessories",
    rating: 4.7,
    stock: 25,
    brand: "Corsair",
    model: "K95 RGB",
    inStock: true
  }
];