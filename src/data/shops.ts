import { Product } from "@/types/shop";

export const ELECTRONICS_SHOPS = [
  {
    id: "1",
    name: "TechHub Electronics",
    rating: 4.5,
    isOpen: true,
    image: "https://images.unsplash.com/photo-1578916171728-46686eac8d58",
    products: [
      {
        id: "1",
        name: "iPhone 15",
        category: "Smartphones",
        price: 79999,
        brand: "Apple",
        model: "iPhone 15",
        description: "Latest iPhone with advanced features",
        rating: 4.8,
        stock: 50,
        inStock: true,
        image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158"
      },
      {
        id: "2",
        name: "MacBook Air M2",
        category: "Laptops",
        price: 114900,
        brand: "Apple",
        model: "MacBook Air M2",
        description: "Powerful and efficient laptop",
        rating: 4.9,
        stock: 30,
        inStock: true,
        image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d"
      },
      {
        id: "3",
        name: "AirPods Pro",
        category: "Audio",
        price: 24999,
        brand: "Apple",
        model: "AirPods Pro",
        description: "Premium wireless earbuds",
        rating: 4.7,
        stock: 100,
        inStock: true,
        image: "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434"
      }
    ]
  },
  {
    id: "2",
    name: "Digital World",
    rating: 4.2,
    isOpen: false,
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
    products: [
      {
        id: "4",
        name: "Samsung Galaxy S21",
        category: "Smartphones",
        price: 69999,
        brand: "Samsung",
        model: "Galaxy S21",
        description: "Latest Samsung smartphone with amazing features",
        rating: 4.6,
        stock: 20,
        inStock: true,
        image: "https://images.unsplash.com/photo-1612831231234-1234567890ab"
      },
      {
        id: "5",
        name: "Dell XPS 13",
        category: "Laptops",
        price: 99999,
        brand: "Dell",
        model: "XPS 13",
        description: "Compact and powerful laptop",
        rating: 4.8,
        stock: 15,
        inStock: true,
        image: "https://images.unsplash.com/photo-1612831231234-1234567890cd"
      },
      {
        id: "6",
        name: "Sony WH-1000XM4",
        category: "Audio",
        price: 29999,
        brand: "Sony",
        model: "WH-1000XM4",
        description: "Industry-leading noise canceling headphones",
        rating: 4.9,
        stock: 50,
        inStock: true,
        image: "https://images.unsplash.com/photo-1612831231234-1234567890ef"
      }
    ]
  }
];
