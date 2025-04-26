
// User Model
export interface User {
  uid: string;
  name: string;
  email: string;
  avatarURL?: string;
  role: "guest" | "user" | "retailer" | "admin";
  points: number;
  wishlist: string[]; // product IDs
  alerts: string[]; // alert IDs
  preferences: {
    darkMode: boolean;
    notifications: boolean;
  };
}

// Product Model
export interface Product extends BaseProduct {
  specs: Record<string, string>;
  images: string[];
  MSRP: number;
  category: string;
  brand: string;
  createdAt: string;
}

// Base Product (used in the existing code)
export interface BaseProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  stock?: number;
  inStock: boolean;
}

// Store Model
export interface Store {
  id: string;
  name: string;
  location: {
    lat: number;
    lng: number;
  };
  hours: OperatingHours[];
  verified: boolean;
  healthScore: number;
  coverImage?: string;
}

export interface OperatingHours {
  day: string;
  open: string;
  close: string;
  isClosed: boolean;
}

// Price Model (sub-collection under products)
export interface Price {
  productId: string;
  storeId: string;
  price: number;
  inStock: boolean;
  lastUpdated: string;
}

// Review Model (sub-collections under products & stores)
export interface Review {
  id: string;
  userId: string;
  rating: number;
  comment: string;
  createdAt: string;
  verifiedPurchase?: boolean;
  // Reference to either product or store
  productId?: string;
  storeId?: string;
}

// Order Model
export interface Order {
  orderId: string;
  userId: string;
  items: OrderItem[];
  total: number;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  createdAt: string;
  deliveryETA?: string;
}

export interface OrderItem {
  productId: string;
  quantity: number;
  price: number; // Price at the time of purchase
}

// Price Alert Model
export interface PriceAlert {
  id: string;
  userId: string;
  productId: string;
  targetPrice: number;
  active: boolean;
  createdAt: string;
}

// Points Log Model
export interface PointsLog {
  id: string;
  userId: string;
  points: number;
  action: string;
  createdAt: string;
}

// Badge Model
export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
}

// User Badge Model
export interface UserBadge {
  userId: string;
  badgeId: string;
  unlockedAt: string;
}

// Reservation Model (for the existing code)
export interface Reservation {
  id: string;
  product: string;
  customer: string;
  time: string;
  status: "pending" | "completed" | "cancelled";
}
