
interface AnalyticsEvent {
  [key: string]: any;
}

class Analytics {
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
