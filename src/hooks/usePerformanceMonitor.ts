
import { useEffect, useRef } from 'react';

/**
 * Hook to monitor component render performance
 * Helps identify components that are rendering too frequently or taking too long
 * 
 * @param componentName Name of the component to monitor
 * @param threshold Maximum acceptable render time in ms (default: 16ms for 60fps)
 */
export const usePerformanceMonitor = (componentName: string, threshold = 16) => {
  const renderCount = useRef(0);
  const lastRenderTime = useRef(performance.now());
  
  useEffect(() => {
    const currentTime = performance.now();
    const renderTime = currentTime - lastRenderTime.current;
    renderCount.current += 1;
    
    if (renderTime > threshold) {
      console.warn(
        `Slow render detected: ${componentName} took ${renderTime.toFixed(2)}ms ` +
        `(Render count: ${renderCount.current})`
      );
    }
    
    // In development, log every 10th render to detect excessive renders
    if (process.env.NODE_ENV === 'development' && renderCount.current % 10 === 0) {
      console.info(
        `${componentName} has rendered ${renderCount.current} times. ` +
        `Last render: ${renderTime.toFixed(2)}ms`
      );
    }
    
    lastRenderTime.current = currentTime;
    
    return () => {
      if (renderCount.current > 30) {
        console.warn(`${componentName} rendered ${renderCount.current} times before unmounting`);
      }
    };
  });
};
