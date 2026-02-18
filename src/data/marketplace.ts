import { create } from "zustand";
import { persist } from "zustand/middleware";

// ==========================================
// Mock Data for Hyperlocal Electronics Marketplace
// ==========================================

export interface Store {
  id: string;
  name: string;
  distance: string;
  distanceKm: number;
  eta: string;
  rating: number;
  reviewCount: number;
  roleTag: string;
  address: string;
  phone: string;
  hours: string;
  isVerified: boolean;
  serviceRadiusKm: number;
  image: string;
}

export interface ProductVariant {
  id: string;
  label: string;
  price: number;
}

export interface MarketplaceProduct {
  id: string;
  name: string;
  brand: string;
  category: string;
  image: string;
  storeCount: number;
  startingPrice: number;
  variants: ProductVariant[];
}

export interface StoreProduct {
  productId: string;
  storeId: string;
  storeName: string;
  price: number;
  originalPrice: number;
  stock: number; // safety stock: if 1, show "Out of Stock"
  deliveryFee: number;
  deliveryEta: string;
  pickupReady: string;
  distance: string;
  distanceKm: number;
}

export interface CartItem {
  productId: string;
  name: string;
  brand: string;
  image: string;
  variant: string;
  price: number;
  quantity: number;
  storeId: string;
  storeName: string;
}

export interface Order {
  id: string;
  storeId: string;
  storeName: string;
  storePhone: string;
  items: CartItem[];
  total: number;
  deliveryFee: number;
  tax: number;
  fulfillment: "delivery" | "pickup";
  status: "confirmed" | "preparing" | "out_for_delivery" | "ready_for_pickup" | "delivered";
  createdAt: string;
  deliveredAt?: string;
  address?: string;
  canReport: boolean;
}

// ==========================================
// MOCK STORES
// ==========================================
export const MOCK_STORES: Store[] = [
  {
    id: "s1", name: "Croma Indiranagar", distance: "0.5 km", distanceKm: 0.5,
    eta: "15 mins", rating: 4.6, reviewCount: 342, roleTag: "Premier Dealer",
    address: "100 Feet Rd, Indiranagar, Bangalore", phone: "+91 98765 43210",
    hours: "10 AM - 9 PM", isVerified: true, serviceRadiusKm: 5,
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8"
  },
  {
    id: "s2", name: "Samsung SmartPlaza", distance: "1.2 km", distanceKm: 1.2,
    eta: "25 mins", rating: 4.8, reviewCount: 521, roleTag: "Authorized Showroom",
    address: "MG Road, Bangalore", phone: "+91 98765 43211",
    hours: "10 AM - 8 PM", isVerified: true, serviceRadiusKm: 8,
    image: "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5"
  },
  {
    id: "s3", name: "Local Mobile Hub", distance: "0.3 km", distanceKm: 0.3,
    eta: "10 mins", rating: 4.3, reviewCount: 89, roleTag: "Neighborhood Store",
    address: "12th Main, Indiranagar", phone: "+91 98765 43212",
    hours: "9 AM - 10 PM", isVerified: false, serviceRadiusKm: 3,
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d"
  },
  {
    id: "s4", name: "Reliance Digital", distance: "2.1 km", distanceKm: 2.1,
    eta: "35 mins", rating: 4.5, reviewCount: 278, roleTag: "Multi-brand Store",
    address: "Koramangala, Bangalore", phone: "+91 98765 43213",
    hours: "10 AM - 9 PM", isVerified: true, serviceRadiusKm: 10,
    image: "https://images.unsplash.com/photo-1472851294608-062f824d29cc"
  },
  {
    id: "s5", name: "Sony Center", distance: "1.8 km", distanceKm: 1.8,
    eta: "30 mins", rating: 4.7, reviewCount: 195, roleTag: "Authorized Showroom",
    address: "Brigade Road, Bangalore", phone: "+91 98765 43214",
    hours: "10:30 AM - 8:30 PM", isVerified: true, serviceRadiusKm: 7,
    image: "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a"
  },
];

// ==========================================
// MOCK PRODUCTS
// ==========================================
export const MOCK_PRODUCTS: MarketplaceProduct[] = [
  { id: "p1", name: "Samsung Galaxy S24 Ultra", brand: "Samsung", category: "Mobiles", image: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c", storeCount: 4, startingPrice: 129999, variants: [{ id: "v1", label: "256GB", price: 129999 }, { id: "v2", label: "512GB", price: 144999 }] },
  { id: "p2", name: "iPhone 15 Pro Max", brand: "Apple", category: "Mobiles", image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158", storeCount: 3, startingPrice: 159900, variants: [{ id: "v1", label: "256GB", price: 159900 }, { id: "v2", label: "512GB", price: 179900 }] },
  { id: "p3", name: "MacBook Air M3", brand: "Apple", category: "Laptops", image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d", storeCount: 3, startingPrice: 114900, variants: [{ id: "v1", label: "8GB/256GB", price: 114900 }, { id: "v2", label: "16GB/512GB", price: 139900 }] },
  { id: "p4", name: "Sony WH-1000XM5", brand: "Sony", category: "Audio", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e", storeCount: 5, startingPrice: 26990, variants: [{ id: "v1", label: "Black", price: 26990 }, { id: "v2", label: "Silver", price: 26990 }] },
  { id: "p5", name: "Samsung 25W Charger", brand: "Samsung", category: "Essentials", image: "https://images.unsplash.com/photo-1583394838336-acd977736f90", storeCount: 4, startingPrice: 1299, variants: [{ id: "v1", label: "Type-C", price: 1299 }] },
  { id: "p6", name: "LG 55\" OLED C3", brand: "LG", category: "TV", image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1", storeCount: 2, startingPrice: 129990, variants: [{ id: "v1", label: "55 inch", price: 129990 }, { id: "v2", label: "65 inch", price: 189990 }] },
  { id: "p7", name: "AirPods Pro 2", brand: "Apple", category: "Audio", image: "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434", storeCount: 4, startingPrice: 24900, variants: [{ id: "v1", label: "USB-C", price: 24900 }] },
  { id: "p8", name: "Dell XPS 15", brand: "Dell", category: "Laptops", image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0", storeCount: 2, startingPrice: 149990, variants: [{ id: "v1", label: "i7/16GB", price: 149990 }, { id: "v2", label: "i9/32GB", price: 199990 }] },
];

// ==========================================
// MOCK STORE-PRODUCT MAPPINGS
// ==========================================
export const MOCK_STORE_PRODUCTS: StoreProduct[] = [
  // Samsung Galaxy S24 Ultra
  { productId: "p1", storeId: "s1", storeName: "Croma Indiranagar", price: 131999, originalPrice: 134999, stock: 5, deliveryFee: 0, deliveryEta: "Today, 4 PM", pickupReady: "30 mins", distance: "0.5 km", distanceKm: 0.5 },
  { productId: "p1", storeId: "s2", storeName: "Samsung SmartPlaza", price: 129999, originalPrice: 134999, stock: 8, deliveryFee: 49, deliveryEta: "Today, 5 PM", pickupReady: "15 mins", distance: "1.2 km", distanceKm: 1.2 },
  { productId: "p1", storeId: "s3", storeName: "Local Mobile Hub", price: 132500, originalPrice: 134999, stock: 2, deliveryFee: 0, deliveryEta: "Today, 3 PM", pickupReady: "10 mins", distance: "0.3 km", distanceKm: 0.3 },
  { productId: "p1", storeId: "s4", storeName: "Reliance Digital", price: 130499, originalPrice: 134999, stock: 1, deliveryFee: 99, deliveryEta: "Tomorrow", pickupReady: "45 mins", distance: "2.1 km", distanceKm: 2.1 },
  // iPhone 15 Pro Max
  { productId: "p2", storeId: "s1", storeName: "Croma Indiranagar", price: 161900, originalPrice: 169900, stock: 3, deliveryFee: 0, deliveryEta: "Today, 5 PM", pickupReady: "30 mins", distance: "0.5 km", distanceKm: 0.5 },
  { productId: "p2", storeId: "s4", storeName: "Reliance Digital", price: 159900, originalPrice: 169900, stock: 4, deliveryFee: 99, deliveryEta: "Tomorrow", pickupReady: "45 mins", distance: "2.1 km", distanceKm: 2.1 },
  // Sony WH-1000XM5
  { productId: "p4", storeId: "s5", storeName: "Sony Center", price: 26990, originalPrice: 29990, stock: 10, deliveryFee: 0, deliveryEta: "Today, 6 PM", pickupReady: "20 mins", distance: "1.8 km", distanceKm: 1.8 },
  { productId: "p4", storeId: "s1", storeName: "Croma Indiranagar", price: 27990, originalPrice: 29990, stock: 3, deliveryFee: 0, deliveryEta: "Today, 4 PM", pickupReady: "30 mins", distance: "0.5 km", distanceKm: 0.5 },
  // Samsung 25W Charger
  { productId: "p5", storeId: "s2", storeName: "Samsung SmartPlaza", price: 1299, originalPrice: 1499, stock: 20, deliveryFee: 29, deliveryEta: "Today, 3 PM", pickupReady: "10 mins", distance: "1.2 km", distanceKm: 1.2 },
  { productId: "p5", storeId: "s3", storeName: "Local Mobile Hub", price: 1349, originalPrice: 1499, stock: 8, deliveryFee: 0, deliveryEta: "Today, 2 PM", pickupReady: "5 mins", distance: "0.3 km", distanceKm: 0.3 },
  // AirPods Pro 2
  { productId: "p7", storeId: "s1", storeName: "Croma Indiranagar", price: 24900, originalPrice: 26900, stock: 6, deliveryFee: 0, deliveryEta: "Today, 4 PM", pickupReady: "25 mins", distance: "0.5 km", distanceKm: 0.5 },
];

// ==========================================
// MOCK ORDERS
// ==========================================
export const MOCK_ORDERS: Order[] = [
  {
    id: "ORD-2024-001",
    storeId: "s1", storeName: "Croma Indiranagar", storePhone: "+91 98765 43210",
    items: [{ productId: "p4", name: "Sony WH-1000XM5", brand: "Sony", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e", variant: "Black", price: 27990, quantity: 1, storeId: "s1", storeName: "Croma Indiranagar" }],
    total: 28979, deliveryFee: 0, tax: 989,
    fulfillment: "delivery", status: "out_for_delivery",
    createdAt: "2024-12-18T14:30:00Z", address: "Home - 42, 12th Main, Indiranagar",
    canReport: false,
  },
  {
    id: "ORD-2024-002",
    storeId: "s2", storeName: "Samsung SmartPlaza", storePhone: "+91 98765 43211",
    items: [{ productId: "p5", name: "Samsung 25W Charger", brand: "Samsung", image: "https://images.unsplash.com/photo-1583394838336-acd977736f90", variant: "Type-C", price: 1299, quantity: 2, storeId: "s2", storeName: "Samsung SmartPlaza" }],
    total: 2880, deliveryFee: 29, tax: 253,
    fulfillment: "pickup", status: "ready_for_pickup",
    createdAt: "2024-12-17T10:00:00Z",
    canReport: false,
  },
  {
    id: "ORD-2024-003",
    storeId: "s5", storeName: "Sony Center", storePhone: "+91 98765 43214",
    items: [{ productId: "p7", name: "AirPods Pro 2", brand: "Apple", image: "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434", variant: "USB-C", price: 24900, quantity: 1, storeId: "s5", storeName: "Sony Center" }],
    total: 26190, deliveryFee: 0, tax: 1290,
    fulfillment: "delivery", status: "delivered",
    createdAt: "2024-12-15T09:00:00Z", deliveredAt: "2024-12-15T17:30:00Z",
    address: "Home - 42, 12th Main, Indiranagar",
    canReport: true, // within 48 hours
  },
];

// ==========================================
// CATEGORIES
// ==========================================
export const CATEGORIES = [
  { id: "mobiles", name: "Mobiles", icon: "Smartphone" },
  { id: "appliances", name: "Appliances", icon: "Refrigerator" },
  { id: "tv", name: "TV", icon: "Monitor" },
  { id: "laptops", name: "Laptops", icon: "Laptop" },
  { id: "audio", name: "Audio", icon: "Headphones" },
  { id: "essentials", name: "Essentials", icon: "Cable" },
];

// ==========================================
// USER LOCATION STORE
// ==========================================
interface LocationState {
  label: string;
  address: string;
  set: (label: string, address: string) => void;
}

export const useLocationStore = create<LocationState>()(
  persist(
    (set) => ({
      label: "Home",
      address: "Indiranagar, Bangalore",
      set: (label, address) => set({ label, address }),
    }),
    { name: "user-location" }
  )
);
