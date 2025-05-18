
import React from 'react';

/**
 * Utility to detect potential memory leaks in React components
 */

type ComponentInfo = {
  name: string;
  mountCount: number;
  unmountCount: number;
  instances: Set<string>;
};

class MemoryLeakDetector {
  private components: Map<string, ComponentInfo> = new Map();
  private enabled: boolean = false;
  private checkInterval: number | null = null;
  private instanceCounter: number = 0;
  private warningThreshold: number = 5;
  
  /**
   * Initialize the memory leak detector
   * @param enabled Whether to enable detection
   * @param checkIntervalMs How often to check for leaks (ms)
   * @param warningThreshold How many unmounted but not GC'd components to warn about
   */
  public init(enabled = true, checkIntervalMs = 30000, warningThreshold = 5) {
    this.enabled = enabled;
    this.warningThreshold = warningThreshold;
    
    // Only run in development to avoid performance impact in production
    if (this.enabled && process.env.NODE_ENV === 'development') {
      // Clear any existing interval
      if (this.checkInterval) {
        window.clearInterval(this.checkInterval);
      }
      
      // Set up periodic leak checking
      this.checkInterval = window.setInterval(() => {
        this.checkForLeaks();
      }, checkIntervalMs);
      
      console.log('Memory leak detector initialized');
    }
  }
  
  /**
   * Track a component mount
   * @param componentName Name of the component being mounted
   * @returns A unique instance ID for the mounted component
   */
  public componentMount(componentName: string): string {
    if (!this.enabled || process.env.NODE_ENV !== 'development') {
      return '';
    }
    
    const instanceId = `${componentName}_${++this.instanceCounter}`;
    
    if (!this.components.has(componentName)) {
      this.components.set(componentName, {
        name: componentName,
        mountCount: 0,
        unmountCount: 0,
        instances: new Set()
      });
    }
    
    const info = this.components.get(componentName)!;
    info.mountCount++;
    info.instances.add(instanceId);
    
    return instanceId;
  }
  
  /**
   * Track a component unmount
   * @param componentName Name of the component being unmounted
   * @param instanceId The instance ID returned from componentMount
   */
  public componentUnmount(componentName: string, instanceId: string): void {
    if (!this.enabled || process.env.NODE_ENV !== 'development' || !instanceId) {
      return;
    }
    
    const info = this.components.get(componentName);
    if (info) {
      info.unmountCount++;
      info.instances.delete(instanceId);
    }
  }
  
  /**
   * Check for potential memory leaks
   */
  private checkForLeaks(): void {
    if (!this.enabled || process.env.NODE_ENV !== 'development') {
      return;
    }
    
    let leakFound = false;
    
    for (const [name, info] of this.components.entries()) {
      const mountedCount = info.mountCount;
      const unmountedCount = info.unmountCount;
      const diff = mountedCount - unmountedCount;
      
      if (diff > this.warningThreshold) {
        leakFound = true;
        console.warn(
          `Potential memory leak detected: ${name} has been mounted ${mountedCount} times ` +
          `but only unmounted ${unmountedCount} times. ` +
          `${diff} instances might be leaking.`
        );
      }
    }
    
    if (!leakFound) {
      console.log('No memory leaks detected');
    }
  }
  
  /**
   * Cleanup the detector
   */
  public cleanup(): void {
    if (this.checkInterval) {
      window.clearInterval(this.checkInterval);
    }
    this.components.clear();
  }
}

// Create a singleton instance
export const memoryLeakDetector = new MemoryLeakDetector();

/**
 * React hook for memory leak detection
 * @param componentName Name of the component to monitor
 */
export const useMemoryLeakDetection = (componentName: string): void => {
  if (process.env.NODE_ENV === 'development') {
    // Use a ref to store the instance ID
    const instanceIdRef = React.useRef('');
    
    React.useEffect(() => {
      // Track component mount
      instanceIdRef.current = memoryLeakDetector.componentMount(componentName);
      
      // Track component unmount
      return () => {
        memoryLeakDetector.componentUnmount(componentName, instanceIdRef.current);
      };
    }, [componentName]);
  }
};
