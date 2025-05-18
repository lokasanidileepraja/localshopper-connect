
import { useEffect, useRef } from 'react';
import { throttle } from '@/lib/performance';

/**
 * Hook to detect and log excessive re-renders
 * Can help identify and fix components causing refresh loops
 */
export const useRenderOptimizer = (componentName: string, threshold: number = 5, interval: number = 3000) => {
  const renderCount = useRef(0);
  const lastIntervalTime = useRef(Date.now());
  const lastRenderTime = useRef(Date.now());
  
  // Create a stable throttled function reference that persists across renders
  const logWarning = useRef(
    throttle((message: string) => {
      console.warn(message);
    }, 2000)
  ).current;
  
  useEffect(() => {
    // Count this render
    renderCount.current += 1;
    const now = Date.now();
    const timeSinceLastRender = now - lastRenderTime.current;
    lastRenderTime.current = now;
    
    // Check if we should reset the counter (new interval window)
    if (now - lastIntervalTime.current > interval) {
      // Reset the counter and update the interval start time
      renderCount.current = 1;
      lastIntervalTime.current = now;
      return;
    }
    
    // Log if rendering too frequently
    if (renderCount.current > threshold && timeSinceLastRender < 100) {
      logWarning(
        `[Performance Warning] Component "${componentName}" re-rendered ${renderCount.current} times in ${now - lastIntervalTime.current}ms. ` +
        `Last render was ${timeSinceLastRender}ms ago. Consider using React.memo, useMemo, or useCallback.`
      );
    }
    
    // Reset counter after some period of stability
    const resetTimeout = setTimeout(() => {
      if (Date.now() - lastRenderTime.current > 1000) {
        renderCount.current = 0;
        lastIntervalTime.current = Date.now();
      }
    }, 1000);
    
    return () => clearTimeout(resetTimeout);
  });
  
  return renderCount.current;
};
