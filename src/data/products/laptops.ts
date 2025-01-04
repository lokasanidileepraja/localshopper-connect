import { Product } from "@/types/shop";

export const laptops: Product[] = [
  {
    id: "l1",
    name: "MacBook Pro M2",
    price: 199999,
    description: "Powerful laptop for professionals",
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
    category: "laptops",
    rating: 4.9,
    stock: 8,
    brand: "Apple",
    model: "MacBook Pro M2",
    inStock: true
  },
  {
    id: "l2",
    name: "Dell XPS 15",
    price: 149999,
    description: "Premium Windows laptop",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
    category: "laptops",
    rating: 4.6,
    stock: 12,
    brand: "Dell",
    model: "XPS 15",
    inStock: true
  }
];