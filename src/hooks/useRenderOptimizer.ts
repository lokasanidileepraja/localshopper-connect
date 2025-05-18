
import { useEffect, useRef } from 'react';
import { throttle } from '@/lib/utils';

/**
 * Hook to detect and log excessive re-renders
 * Can help identify and fix components causing refresh loops
 */
export const useRenderOptimizer = (componentName: string, threshold: number = 5) => {
  const renderCount = useRef(0);
  const lastRenderTime = useRef(Date.now());
  
  // Throttled logging to prevent console spam
  const logWarning = useRef(throttle((message: string) => {
    console.warn(message);
  }, 2000)).current;
  
  useEffect(() => {
    renderCount.current += 1;
    const now = Date.now();
    const timeSinceLastRender = now - lastRenderTime.current;
    lastRenderTime.current = now;
    
    // Log if rendering too frequently
    if (renderCount.current > threshold && timeSinceLastRender < 500) {
      logWarning(
        `[Performance Warning] Component "${componentName}" re-rendered ${renderCount.current} times in the last ${timeSinceLastRender}ms. Consider using React.memo, useMemo, or useCallback.`
      );
    }
    
    // Reset counter after some period of stability
    const resetTimeout = setTimeout(() => {
      renderCount.current = 0;
    }, 5000);
    
    return () => clearTimeout(resetTimeout);
  });
  
  return renderCount.current;
};
