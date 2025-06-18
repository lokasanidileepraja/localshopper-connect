
import { Shop } from "@/types/shop";

export const ELECTRONICS_SHOPS: Shop[] = [
  {
    id: "1",
    name: "Tech Store Delhi",
    address: "Connaught Place, New Delhi",
    distance: "0.5 km",
    rating: 4.5,
    isOpen: true,
    phone: "+91 9876543210",
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8",
    isVerified: true,
    lastUpdated: "2024-01-15T10:30:00Z",
    products: [
      {
        id: "p1",
        name: "iPhone 15 Pro",
        price: 134900,
        inStock: true,
        category: "mobile",
        image: "/placeholder.svg",
        model: "iPhone 15 Pro",
        brand: "Apple",
        description: "Latest iPhone with advanced camera system",
        rating: 4.8,
        stock: 20,
        reviewCount: 150,
        originalPrice: 149900,
        emiOptions: [
          { duration: 12, monthlyAmount: 11242 },
          { duration: 24, monthlyAmount: 5621 }
        ]
      },
      {
        id: "p2",
        name: "Samsung Galaxy S24",
        price: 89999,
        inStock: false,
        category: "mobile",
        model: "Galaxy S24",
        brand: "Samsung",
        description: "Premium Android smartphone",
        rating: 4.7,
        stock: 0,
        reviewCount: 89,
        originalPrice: 99999,
        emiOptions: [
          { duration: 12, monthlyAmount: 7500 },
          { duration: 24, monthlyAmount: 3750 }
        ]
      }
    ]
  },
  {
    id: "2",
    name: "Mobile Hub",
    address: "Karol Bagh, New Delhi",
    distance: "1.2 km",
    rating: 4.2,
    isOpen: true,
    phone: "+91 9876543211",
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d",
    isVerified: true,
    lastUpdated: "2024-01-14T15:45:00Z",
    products: [
      {
        id: "p3",
        name: "iPhone 15 Pro",
        price: 132900,
        inStock: true,
        category: "mobile",
        model: "iPhone 15 Pro",
        brand: "Apple",
        description: "Latest iPhone with advanced camera system",
        rating: 4.8,
        stock: 15,
        reviewCount: 150,
        originalPrice: 149900,
        emiOptions: [
          { duration: 12, monthlyAmount: 11075 },
          { duration: 24, monthlyAmount: 5538 }
        ]
      },
      {
        id: "p4",
        name: "MacBook Pro",
        price: 199000,
        inStock: true,
        category: "laptop",
        model: "MacBook Pro M2",
        brand: "Apple",
        description: "Powerful laptop for professionals",
        rating: 4.9,
        stock: 8,
        reviewCount: 75,
        originalPrice: 219000,
        emiOptions: [
          { duration: 12, monthlyAmount: 16583 },
          { duration: 24, monthlyAmount: 8292 }
        ]
      }
    ]
  },
  {
    id: "3",
    name: "Electronics Plus",
    address: "Lajpat Nagar, New Delhi",
    distance: "2.1 km",
    rating: 4.0,
    isOpen: false,
    phone: "+91 9876543212",
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43",
    isVerified: false,
    lastUpdated: "2024-01-13T09:20:00Z",
    products: [
      {
        id: "p5",
        name: "AirPods Pro",
        price: 24900,
        inStock: true,
        category: "audio",
        model: "AirPods Pro 2nd Gen",
        brand: "Apple",
        description: "Premium wireless earbuds with ANC",
        rating: 4.6,
        stock: 25,
        reviewCount: 120,
        originalPrice: 27900,
        emiOptions: [
          { duration: 6, monthlyAmount: 4150 },
          { duration: 12, monthlyAmount: 2075 }
        ]
      }
    ]
  },
  {
    id: "4",
    name: "Gadget World",
    address: "Janpath, New Delhi",
    distance: "0.8 km",
    rating: 4.7,
    isOpen: true,
    phone: "+91 9876543213",
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1586953208448-b95a79798f07",
    isVerified: true,
    lastUpdated: "2024-01-15T12:00:00Z",
    products: [
      {
        id: "p6",
        name: "iPhone 15 Pro",
        price: 135900,
        inStock: true,
        category: "mobile",
        model: "iPhone 15 Pro",
        brand: "Apple",
        description: "Latest iPhone with advanced camera system",
        rating: 4.8,
        stock: 12,
        reviewCount: 150,
        originalPrice: 149900,
        emiOptions: [
          { duration: 12, monthlyAmount: 11325 },
          { duration: 24, monthlyAmount: 5663 }
        ]
      },
      {
        id: "p7",
        name: "iPad Pro",
        price: 119900,
        inStock: true,
        category: "tablet",
        model: "iPad Pro 12.9",
        brand: "Apple",
        description: "Professional tablet with M2 chip",
        rating: 4.7,
        stock: 18,
        reviewCount: 95,
        originalPrice: 129900,
        emiOptions: [
          { duration: 12, monthlyAmount: 9992 },
          { duration: 24, monthlyAmount: 4996 }
        ]
      }
    ]
  }
];
