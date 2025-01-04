import { Product } from "@/types/shop";

export const mobiles: Product[] = [
  {
    id: "m1",
    name: "iPhone 15 Pro",
    price: 129999,
    description: "Latest iPhone with advanced camera system",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
    category: "mobiles",
    rating: 4.8,
    stock: 20,
    brand: "Apple",
    model: "iPhone 15 Pro",
    inStock: true
  },
  {
    id: "m2",
    name: "Samsung Galaxy S23",
    price: 89999,
    description: "Premium Android smartphone",
    image: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c",
    category: "mobiles",
    rating: 4.7,
    stock: 15,
    brand: "Samsung",
    model: "Galaxy S23",
    inStock: true
  }
];