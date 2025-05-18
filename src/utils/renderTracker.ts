
/**
 * Utility to track component rendering frequency and detect excessive re-renders
 */

interface RenderInfo {
  count: number;
  lastRender: number;
  averageInterval: number;
  maxInterval: number;
  minInterval: number;
  totalTime: number;
}

class RenderTracker {
  private renders: Map<string, RenderInfo> = new Map();
  private enabled: boolean = false;
  private warnThreshold: number = 10;
  private reportInterval: number | null = null;
  
  /**
   * Initialize the render tracker
   * @param enabled Whether to enable tracking
   * @param warnThreshold Number of renders to trigger warnings
   * @param reportIntervalMs How often to log render reports (ms)
   */
  public init(enabled = true, warnThreshold = 10, reportIntervalMs = 60000) {
    this.enabled = enabled && process.env.NODE_ENV === 'development';
    this.warnThreshold = warnThreshold;
    
    // Clear any existing interval
    if (this.reportInterval) {
      window.clearInterval(this.reportInterval);
    }
    
    if (this.enabled) {
      // Set up periodic reporting
      this.reportInterval = window.setInterval(() => {
        this.printRenderReport();
      }, reportIntervalMs);
      
      console.log('Render tracker initialized');
    }
  }
  
  /**
   * Track a component render
   * @param componentName Name of the component being rendered
   */
  public trackRender(componentName: string): void {
    if (!this.enabled) return;
    
    const now = performance.now();
    const info = this.renders.get(componentName);
    
    if (!info) {
      // First render for this component
      this.renders.set(componentName, {
        count: 1,
        lastRender: now,
        averageInterval: 0,
        maxInterval: 0,
        minInterval: Infinity,
        totalTime: 0
      });
      return;
    }
    
    // Calculate time since last render
    const interval = now - info.lastRender;
    
    // Update stats
    info.count++;
    info.totalTime += interval;
    info.averageInterval = info.totalTime / (info.count - 1);
    info.maxInterval = Math.max(info.maxInterval, interval);
    info.minInterval = Math.min(info.minInterval, interval);
    info.lastRender = now;
    
    // Check for excessive renders
    if (info.count % this.warnThreshold === 0) {
      console.warn(
        `${componentName} has rendered ${info.count} times. ` +
        `Average interval: ${info.averageInterval.toFixed(2)}ms. ` +
        `This may indicate a performance issue.`
      );
    }
  }
  
  /**
   * Print a report of component renders
   */
  private printRenderReport(): void {
    if (!this.enabled || this.renders.size === 0) return;
    
    console.group('Component Render Report');
    
    // Sort components by render count (highest first)
    const sortedComponents = [...this.renders.entries()]
      .sort((a, b) => b[1].count - a[1].count);
    
    console.table(sortedComponents.map(([name, info]) => ({
      Component: name,
      Renders: info.count,
      'Avg Interval (ms)': info.averageInterval.toFixed(2),
      'Min Interval (ms)': info.minInterval === Infinity ? 'N/A' : info.minInterval.toFixed(2),
      'Max Interval (ms)': info.maxInterval.toFixed(2)
    })));
    
    console.groupEnd();
  }
  
  /**
   * Reset tracking for all components
   */
  public reset(): void {
    this.renders.clear();
  }
  
  /**
   * Clean up resources
   */
  public cleanup(): void {
    if (this.reportInterval) {
      window.clearInterval(this.reportInterval);
    }
    this.renders.clear();
  }
}

// Create a singleton instance
export const renderTracker = new RenderTracker();

/**
 * Hook for tracking component renders
 * @param componentName Name of the component to track
 */
export const useRenderTracking = (componentName: string): void => {
  if (process.env.NODE_ENV === 'development') {
    renderTracker.trackRender(componentName);
  }
};
