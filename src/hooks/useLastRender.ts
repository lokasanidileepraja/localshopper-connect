
import { useRef, useEffect } from 'react';

/**
 * Hook to track the last render timestamp and detect render frequency issues
 * @param componentName Name of the component for logging
 * @param threshold Time threshold in ms to consider renders as too frequent
 * @returns Array containing time since last render and render count
 */
export const useLastRender = (componentName: string, threshold = 100) => {
  const lastRenderTime = useRef(Date.now());
  const renderCount = useRef(0);
  const frequentRenders = useRef(0);
  
  useEffect(() => {
    const now = Date.now();
    const timeSince = now - lastRenderTime.current;
    renderCount.current += 1;
    
    // Detect too frequent renders (potential loop)
    if (timeSince < threshold) {
      frequentRenders.current += 1;
      
      // Log warning if there are too many frequent renders
      if (frequentRenders.current > 5) {
        console.warn(
          `[Performance Warning] Component "${componentName}" is rendering too frequently: ` +
          `${frequentRenders.current} renders in less than ${threshold}ms each. ` +
          `Total renders: ${renderCount.current}`
        );
      }
    } else {
      // Reset counter if this render wasn't too quick
      frequentRenders.current = 0;
    }
    
    lastRenderTime.current = now;
    
    return () => {
      // This will help identify components that mount/unmount too frequently
      if (renderCount.current > 10 && timeSince < 5000) {
        console.warn(
          `[Lifecycle Warning] Component "${componentName}" mounted/unmounted ${renderCount.current} times in ${timeSince}ms`
        );
      }
    };
  });
  
  return [Date.now() - lastRenderTime.current, renderCount.current];
};
