import { Product } from "@/types/shop";

export const electronics: Product[] = [
  {
    id: "1",
    name: "iPhone 15",
    price: 79999,
    description: "Latest iPhone with advanced features",
    category: "electronics",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
    rating: 4.8,
    stock: 50,
    brand: "Apple",
    model: "iPhone 15",
    inStock: true
  },
  {
    id: "2",
    name: "MacBook Air M2",
    price: 114900,
    description: "Powerful and efficient laptop",
    category: "electronics",
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
    rating: 4.9,
    stock: 30,
    brand: "Apple",
    model: "MacBook Air M2",
    inStock: true
  },
  {
    id: "3",
    name: "AirPods Pro",
    price: 24999,
    description: "Premium wireless earbuds",
    category: "electronics",
    image: "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434",
    rating: 4.7,
    stock: 100,
    brand: "Apple",
    model: "AirPods Pro",
    inStock: true
  }
];