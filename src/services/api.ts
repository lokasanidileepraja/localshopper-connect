
import { 
  Product, 
  Store, 
  User, 
  Order, 
  Review,
  PriceAlert,
  Price,
  PointsLog,
  Badge,
  UserBadge
} from "@/types/models";
import { products as mockProducts } from "@/data/products";

// This service will be the interface between our components and the backend
// For now it uses mock data, but can be updated to use Firebase or another backend

class ApiService {
  // USER RELATED METHODS
  async getCurrentUser(): Promise<User | null> {
    // Mock implementation - will be replaced with actual auth logic
    return Promise.resolve({
      uid: "user123",
      name: "Demo User",
      email: "demo@example.com",
      avatarURL: "https://i.pravatar.cc/150?u=demo@example.com",
      role: "user",
      points: 250,
      wishlist: ["m1", "l1"],
      alerts: ["alert1"],
      preferences: {
        darkMode: false,
        notifications: true,
      }
    });
  }

  async getUserPoints(userId: string): Promise<number> {
    // Mock implementation
    return Promise.resolve(250);
  }

  async getUserBadges(userId: string): Promise<Badge[]> {
    // Mock implementation
    return Promise.resolve([
      {
        id: "badge1",
        name: "Early Adopter",
        description: "One of our first users",
        icon: "award",
      },
      {
        id: "badge2",
        name: "Deal Finder",
        description: "Found 5 deals with savings over 20%",
        icon: "tag"
      }
    ]);
  }

  // PRODUCT RELATED METHODS
  async getProducts(category?: string): Promise<Product[]> {
    // Mock implementation using existing product data
    const allProducts = Object.values(mockProducts).flat();
    
    if (category) {
      return Promise.resolve(
        allProducts.filter(p => p.category === category) as Product[]
      );
    }
    
    return Promise.resolve(allProducts as unknown as Product[]);
  }

  async getProductById(productId: string): Promise<Product | null> {
    // Mock implementation
    const allProducts = Object.values(mockProducts).flat();
    const product = allProducts.find(p => p.id === productId);
    
    if (!product) return Promise.resolve(null);
    
    // Enhance the mock product with the additional fields from our Product interface
    return Promise.resolve({
      ...product,
      specs: {
        "Display": "6.1-inch Super Retina XDR",
        "Processor": "A16 Bionic",
        "Storage": "128GB"
      },
      images: [product.image],
      MSRP: product.originalPrice || product.price * 1.2,
      brand: product.brand,
      createdAt: "2023-05-15T10:30:00Z"
    } as Product);
  }

  async getProductPrices(productId: string): Promise<Price[]> {
    // Mock implementation
    return Promise.resolve([
      {
        productId,
        storeId: "store1",
        price: 129999,
        inStock: true,
        lastUpdated: "2024-04-25T10:30:00Z"
      },
      {
        productId,
        storeId: "store2",
        price: 127999,
        inStock: true,
        lastUpdated: "2024-04-24T14:45:00Z"
      },
      {
        productId,
        storeId: "store3",
        price: 134999,
        inStock: false,
        lastUpdated: "2024-04-23T09:15:00Z"
      }
    ]);
  }

  // STORE RELATED METHODS
  async getStores(nearbyLocation?: {lat: number, lng: number}): Promise<Store[]> {
    // Mock implementation
    return Promise.resolve([
      {
        id: "store1",
        name: "Tech Hub Central",
        location: { lat: 12.9716, lng: 77.5946 }, // Bangalore
        hours: [
          { day: "Monday", open: "09:00", close: "21:00", isClosed: false },
          { day: "Tuesday", open: "09:00", close: "21:00", isClosed: false },
          { day: "Wednesday", open: "09:00", close: "21:00", isClosed: false },
          { day: "Thursday", open: "09:00", close: "21:00", isClosed: false },
          { day: "Friday", open: "09:00", close: "22:00", isClosed: false },
          { day: "Saturday", open: "10:00", close: "22:00", isClosed: false },
          { day: "Sunday", open: "11:00", close: "20:00", isClosed: false },
        ],
        verified: true,
        healthScore: 95,
        coverImage: "https://images.unsplash.com/photo-1533323905636-7f0bfa0ba5ad"
      },
      {
        id: "store2",
        name: "Mobile World",
        location: { lat: 12.9815, lng: 77.6124 }, // Indiranagar
        hours: [
          { day: "Monday", open: "10:00", close: "20:00", isClosed: false },
          { day: "Tuesday", open: "10:00", close: "20:00", isClosed: false },
          { day: "Wednesday", open: "10:00", close: "20:00", isClosed: false },
          { day: "Thursday", open: "10:00", close: "20:00", isClosed: false },
          { day: "Friday", open: "10:00", close: "20:00", isClosed: false },
          { day: "Saturday", open: "10:00", close: "21:00", isClosed: false },
          { day: "Sunday", open: "11:00", close: "19:00", isClosed: false },
        ],
        verified: true,
        healthScore: 88,
        coverImage: "https://images.unsplash.com/photo-1569624501047-aa4203576cff"
      },
      {
        id: "store3",
        name: "Gadget Paradise",
        location: { lat: 12.9352, lng: 77.6245 }, // Koramangala
        hours: [
          { day: "Monday", open: "09:30", close: "20:30", isClosed: false },
          { day: "Tuesday", open: "09:30", close: "20:30", isClosed: false },
          { day: "Wednesday", open: "09:30", close: "20:30", isClosed: false },
          { day: "Thursday", open: "09:30", close: "20:30", isClosed: false },
          { day: "Friday", open: "09:30", close: "21:30", isClosed: false },
          { day: "Saturday", open: "10:00", close: "21:30", isClosed: false },
          { day: "Sunday", open: "11:00", close: "20:00", isClosed: false },
        ],
        verified: false,
        healthScore: 78,
        coverImage: "https://images.unsplash.com/photo-1550355291-bbee04a92027"
      },
    ]);
  }

  async getStoreById(storeId: string): Promise<Store | null> {
    const stores = await this.getStores();
    return stores.find(s => s.id === storeId) || null;
  }

  // ORDERS AND REVIEWS
  async getUserOrders(userId: string): Promise<Order[]> {
    // Mock implementation
    return Promise.resolve([
      {
        orderId: "ORD123",
        userId,
        items: [
          { productId: "m1", quantity: 1, price: 129999 }
        ],
        total: 129999,
        status: "delivered",
        createdAt: "2024-03-15T14:30:00Z",
        deliveryETA: "2024-03-18T14:30:00Z"
      },
      {
        orderId: "ORD124",
        userId,
        items: [
          { productId: "a1", quantity: 2, price: 2999 }
        ],
        total: 5998,
        status: "processing",
        createdAt: "2024-04-20T10:15:00Z",
        deliveryETA: "2024-04-28T10:15:00Z"
      }
    ]);
  }

  async getProductReviews(productId: string): Promise<Review[]> {
    // Mock implementation
    return Promise.resolve([
      {
        id: "rev1",
        userId: "user1",
        rating: 5,
        comment: "Excellent product, worth every penny!",
        createdAt: "2024-02-18T09:30:00Z",
        verifiedPurchase: true,
        productId
      },
      {
        id: "rev2",
        userId: "user2",
        rating: 4,
        comment: "Good product overall, but battery life could be better.",
        createdAt: "2024-03-05T16:45:00Z",
        verifiedPurchase: true,
        productId
      }
    ]);
  }

  // PRICE ALERTS
  async getUserAlerts(userId: string): Promise<PriceAlert[]> {
    // Mock implementation
    return Promise.resolve([
      {
        id: "alert1",
        userId,
        productId: "m2",
        targetPrice: 75000,
        active: true,
        createdAt: "2024-04-01T08:00:00Z"
      },
      {
        id: "alert2",
        userId,
        productId: "l1",
        targetPrice: 180000,
        active: true,
        createdAt: "2024-04-10T11:30:00Z"
      }
    ]);
  }

  // POINTS & GAMIFICATION
  async getUserPointsLog(userId: string): Promise<PointsLog[]> {
    // Mock implementation
    return Promise.resolve([
      {
        id: "log1",
        userId,
        points: 50,
        action: "Completed profile",
        createdAt: "2024-01-15T10:00:00Z"
      },
      {
        id: "log2",
        userId,
        points: 100,
        action: "First purchase",
        createdAt: "2024-02-20T14:30:00Z"
      },
      {
        id: "log3",
        userId,
        points: 20,
        action: "Wrote review",
        createdAt: "2024-03-15T16:45:00Z"
      }
    ]);
  }
}

// Export a single instance of the service to be used throughout the app
export const apiService = new ApiService();
