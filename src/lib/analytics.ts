
// This is a placeholder file for actual analytics service
// In a real implementation, this would be connected to PostHog, Google Analytics, etc.

interface EventProperties {
  [key: string]: any;
}

interface IdentifyProperties {
  userId: string;
  properties?: {
    [key: string]: any;
  };
}

class Analytics {
  private static instance: Analytics;
  private isInitialized = false;
  private debugMode = false;

  private constructor() {}

  public static getInstance(): Analytics {
    if (!Analytics.instance) {
      Analytics.instance = new Analytics();
    }
    return Analytics.instance;
  }

  public init(options: { debugMode?: boolean } = {}): void {
    this.debugMode = options.debugMode || false;
    this.isInitialized = true;
    
    if (this.debugMode) {
      console.log('Analytics initialized with debug mode');
    }
  }

  public trackEvent(eventName: string, properties?: EventProperties): void {
    if (!this.isInitialized) {
      console.warn('Analytics not initialized. Call init() first.');
      return;
    }

    if (this.debugMode) {
      console.log(`EVENT: ${eventName}`, properties || {});
    }

    // In a real implementation, this would call the actual analytics service
    // Example: posthog.capture(eventName, properties);
  }

  public identify(properties: IdentifyProperties): void {
    if (!this.isInitialized) {
      console.warn('Analytics not initialized. Call init() first.');
      return;
    }

    if (this.debugMode) {
      console.log(`IDENTIFY: User ${properties.userId}`, properties.properties || {});
    }

    // In a real implementation, this would call the actual analytics service
    // Example: posthog.identify(properties.userId, properties.properties);
  }
  
  public trackPageView(pageName: string, pageProperties?: EventProperties): void {
    if (!this.isInitialized) {
      console.warn('Analytics not initialized. Call init() first.');
      return;
    }

    if (this.debugMode) {
      console.log(`PAGEVIEW: ${pageName}`, pageProperties || {});
    }

    // In a real implementation, this would call the actual analytics service
    // Example: posthog.capture('$pageview', { page: pageName, ...pageProperties });
  }
}

export const analytics = Analytics.getInstance();

// Event tracking hooks for common actions
export const trackAddToCart = (productId: string, productName: string, price: number, store?: string) => {
  analytics.trackEvent('add_to_cart', {
    product_id: productId,
    product_name: productName,
    price,
    store
  });
};

export const trackSetPriceAlert = (productId: string, productName: string, currentPrice: number, targetPrice?: number) => {
  analytics.trackEvent('set_price_alert', {
    product_id: productId,
    product_name: productName,
    current_price: currentPrice,
    target_price: targetPrice || currentPrice
  });
};

export const trackAddToWishlist = (productId: string, productName: string) => {
  analytics.trackEvent('add_to_wishlist', {
    product_id: productId,
    product_name: productName
  });
};

export const trackCheckout = (orderId: string, totalAmount: number, itemCount: number) => {
  analytics.trackEvent('checkout', {
    order_id: orderId,
    total_amount: totalAmount,
    item_count: itemCount
  });
};

export const trackSearch = (query: string, resultCount: number) => {
  analytics.trackEvent('search', {
    query,
    result_count: resultCount
  });
};
