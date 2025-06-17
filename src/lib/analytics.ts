
interface AnalyticsEvent {
  [key: string]: any;
}

class Analytics {
  private userId?: string;

  init(userId: string) {
    this.userId = userId;
    console.log(`Analytics initialized for user: ${userId}`);
  }

  trackEvent(eventName: string, properties?: AnalyticsEvent) {
    // In a real app, this would send data to your analytics service
    console.log(`Analytics: ${eventName}`, properties);
    
    // You could integrate with services like:
    // - Google Analytics
    // - Mixpanel  
    // - Amplitude
    // - Custom analytics
  }

  trackPageView(pageName: string, properties?: AnalyticsEvent) {
    this.trackEvent('page_view', { page: pageName, ...properties });
  }

  trackUserAction(action: string, properties?: AnalyticsEvent) {
    this.trackEvent('user_action', { action, ...properties });
  }
}

export const analytics = new Analytics();

// Specific tracking functions
export const trackAddToCart = (productId: string, productName: string, price: number, shopName: string) => {
  analytics.trackEvent('add_to_cart', {
    product_id: productId,
    product_name: productName,
    price,
    shop_name: shopName
  });
};

export const trackSetPriceAlert = (productId: string, productName: string, targetPrice: number) => {
  analytics.trackEvent('set_price_alert', {
    product_id: productId,
    product_name: productName,
    target_price: targetPrice
  });
};

export const trackAddToWishlist = (productId: string, productName: string) => {
  analytics.trackEvent('add_to_wishlist', {
    product_id: productId,
    product_name: productName
  });
};

export const trackPageView = (pageName: string, properties?: AnalyticsEvent) => {
  analytics.trackPageView(pageName, properties);
};

export const trackCheckout = (orderId: string, total: number, items: any[]) => {
  analytics.trackEvent('checkout', {
    order_id: orderId,
    total,
    items
  });
};
