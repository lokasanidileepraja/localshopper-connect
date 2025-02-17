import { Shop } from "@/types/shop";

export const ELECTRONICS_SHOPS: Shop[] = [
  {
    id: "shop1",
    name: "TechHub Electronics",
    category: "Electronics Store",
    rating: 4.5,
    distance: "0.8 km",
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
    isOpen: true,
    products: [
      {
        id: "1",
        name: "iPhone 15",
        category: "mobile",
        price: 79999,
        brand: "Apple",
        model: "iPhone 15",
        inStock: true,
        image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
        description: "Latest iPhone model with advanced features",
        rating: 4.8,
        stock: 25
      },
      {
        id: "2",
        name: "MacBook Air M2",
        category: "laptop",
        price: 114900,
        brand: "Apple",
        model: "MacBook Air M2",
        inStock: true,
        image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
        description: "Powerful and portable laptop with M2 chip",
        rating: 4.9,
        stock: 15
      }
    ]
  },
  {
    id: "shop2",
    name: "Digital World",
    category: "Electronics Store",
    rating: 4.7,
    distance: "1.2 km",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
    isOpen: true,
    products: [
      {
        id: "3",
        name: "iPhone 15",
        category: "mobile",
        price: 78999,
        brand: "Apple",
        model: "iPhone 15",
        inStock: true,
        image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
        description: "Latest iPhone model with advanced features",
        rating: 4.8,
        stock: 20
      },
      {
        id: "4",
        name: "Samsung Galaxy S23",
        category: "mobile",
        price: 74999,
        brand: "Samsung",
        model: "Galaxy S23",
        inStock: true,
        description: "Flagship Android smartphone",
        rating: 4.7,
        stock: 18,
        image: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c"
      }
    ]
  },
  {
    id: "shop3",
    name: "Gadget Galaxy",
    category: "Electronics Store",
    rating: 4.3,
    distance: "0.5 km",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475",
    isOpen: false,
    products: [
      {
        id: "5",
        name: "iPhone 15",
        category: "mobile",
        price: 81999,
        brand: "Apple",
        model: "iPhone 15",
        inStock: false,
        image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
        description: "Latest iPhone model with advanced features",
        rating: 4.8,
        stock: 0
      },
      {
        id: "6",
        name: "AirPods Pro",
        category: "accessory",
        price: 24999,
        brand: "Apple",
        model: "AirPods Pro 2nd Gen",
        inStock: true,
        description: "Premium wireless earbuds",
        rating: 4.6,
        stock: 30,
        image: "https://images.unsplash.com/photo-1588423771073-b8903fbb85b5"
      }
    ]
  },
  {
    id: "shop4",
    name: "Elite Electronics",
    category: "Electronics Store",
    rating: 4.6,
    distance: "1.5 km",
    image: "https://images.unsplash.com/photo-1478860409698-8707f313ee8b",
    isOpen: true,
    products: [
      {
        id: "7",
        name: "iPhone 15",
        category: "mobile",
        price: 77999,
        brand: "Apple",
        model: "iPhone 15",
        inStock: true,
        image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
        description: "Latest iPhone model with advanced features",
        rating: 4.8,
        stock: 15
      },
      {
        id: "8",
        name: "Samsung Galaxy S23",
        category: "mobile",
        price: 72999,
        brand: "Samsung",
        model: "Galaxy S23",
        inStock: true,
        description: "Flagship Android smartphone",
        rating: 4.7,
        stock: 20,
        image: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c"
      }
    ]
  },
  {
    id: "shop5",
    name: "Smart Store",
    category: "Electronics Store",
    rating: 4.4,
    distance: "2.0 km",
    image: "https://images.unsplash.com/photo-1491933382434-500287f9b54b",
    isOpen: true,
    products: [
      {
        id: "9",
        name: "iPhone 15",
        category: "mobile",
        price: 76999,
        brand: "Apple",
        model: "iPhone 15",
        inStock: true,
        image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
        description: "Latest iPhone model with advanced features",
        rating: 4.8,
        stock: 10
      },
      {
        id: "10",
        name: "Samsung Galaxy S23",
        category: "mobile",
        price: 73999,
        brand: "Samsung",
        model: "Galaxy S23",
        inStock: true,
        description: "Flagship Android smartphone",
        rating: 4.7,
        stock: 12,
        image: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c"
      }
    ]
  }
];
