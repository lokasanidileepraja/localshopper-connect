
// Simple analytics service for tracking user behavior
type AnalyticsEvent = {
  name: string;
  properties?: Record<string, any>;
  timestamp: number;
};

export class Analytics {
  private static instance: Analytics;
  private initialized: boolean = false;
  private events: AnalyticsEvent[] = [];
  private userId: string | null = null;

  // Make constructor private for singleton pattern
  private constructor() {}

  public static getInstance(): Analytics {
    if (!Analytics.instance) {
      Analytics.instance = new Analytics();
    }
    return Analytics.instance;
  }

  // Initialize analytics with user ID if available
  public init(userId?: string): void {
    this.initialized = true;
    if (userId) {
      this.userId = userId;
    }
    console.log('Analytics initialized', userId ? `for user ${userId}` : 'anonymously');
  }

  // Track a page view
  public trackPageView(path: string): void {
    if (!this.initialized) {
      // Auto-initialize if not done yet for better developer experience
      this.init();
    }
    
    this.trackEvent('page_view', { path });
  }

  // Track when a product is viewed
  public trackProductView(productId: string, productName: string): void {
    this.trackEvent('product_view', { productId, productName });
  }

  // Track when an item is added to cart
  public trackAddToCart(
    productId: string,
    productName: string, 
    price: number,
    store: string
  ): void {
    this.trackEvent('add_to_cart', { 
      productId, 
      productName, 
      price, 
      store 
    });
  }

  // Track when a price alert is set
  public trackSetPriceAlert(
    productId: string,
    productName: string,
    currentPrice: number
  ): void {
    this.trackEvent('set_price_alert', {
      productId,
      productName,
      currentPrice
    });
  }

  // Track when an item is added to wishlist
  public trackAddToWishlist(
    productId: string,
    productName: string
  ): void {
    this.trackEvent('add_to_wishlist', {
      productId,
      productName
    });
  }

  // Track checkout events
  public trackCheckout(
    orderId: string,
    totalAmount: number,
    items: Array<{
      productId: string;
      productName: string;
      price: number;
      quantity: number;
    }>
  ): void {
    this.trackEvent('checkout_complete', {
      orderId,
      totalAmount,
      itemCount: items.length,
      items
    });
  }

  // Generic event tracking
  public trackEvent(name: string, properties?: Record<string, any>): void {
    if (!this.initialized) {
      console.warn('Analytics not initialized. Call init() first.');
      this.init(); // Auto-initialize
    }
    
    const event: AnalyticsEvent = {
      name,
      properties,
      timestamp: Date.now()
    };
    
    this.events.push(event);
    
    // In a real app, we would send this to a server
    console.log(`Analytics event: ${name}`, properties);
  }

  // Get all tracked events (for debugging)
  public getEvents(): AnalyticsEvent[] {
    return [...this.events];
  }
}

// Create and export singleton instance
export const analytics = Analytics.getInstance();

// Auto-initialize analytics when imported
analytics.init();

// Export individual tracking functions for easier usage
export const trackPageView = (path: string) => analytics.trackPageView(path);
export const trackProductView = (productId: string, productName: string) => analytics.trackProductView(productId, productName);
export const trackAddToCart = (productId: string, productName: string, price: number, store: string) => 
  analytics.trackAddToCart(productId, productName, price, store);
export const trackSetPriceAlert = (productId: string, productName: string, currentPrice: number) => 
  analytics.trackSetPriceAlert(productId, productName, currentPrice);
export const trackAddToWishlist = (productId: string, productName: string) => 
  analytics.trackAddToWishlist(productId, productName);
export const trackCheckout = (
  orderId: string, 
  totalAmount: number, 
  items: Array<{ productId: string; productName: string; price: number; quantity: number; }>
) => analytics.trackCheckout(orderId, totalAmount, items);
