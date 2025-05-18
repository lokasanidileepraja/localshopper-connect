
import { useRef, useEffect } from 'react';

/**
 * Hook to help optimize and monitor component render performance
 * 
 * @param componentName Name of the component to monitor
 */
export const useRenderOptimizer = (componentName: string) => {
  const renderCountRef = useRef(0);
  const lastRenderTimeRef = useRef(performance.now());
  const totalRenderTimeRef = useRef(0);
  
  // Only run in development mode to avoid performance impact in production
  const isDev = process.env.NODE_ENV === 'development';
  
  useEffect(() => {
    if (!isDev) return;
    
    renderCountRef.current += 1;
    const currentTime = performance.now();
    const timeSinceLastRender = currentTime - lastRenderTimeRef.current;
    totalRenderTimeRef.current += timeSinceLastRender;
    
    // log first render
    if (renderCountRef.current === 1) {
      console.log(`[${componentName}] First render: ${timeSinceLastRender.toFixed(2)}ms`);
    }
    // Log excessive renders
    else if (renderCountRef.current % 5 === 0) {
      console.warn(
        `[${componentName}] Rendered ${renderCountRef.current} times. ` +
        `Average render time: ${(totalRenderTimeRef.current / renderCountRef.current).toFixed(2)}ms. ` +
        `Last render time: ${timeSinceLastRender.toFixed(2)}ms`
      );
    }
    
    lastRenderTimeRef.current = currentTime;
    
    // Cleanup function - log stats on unmount
    return () => {
      if (isDev) {
        console.log(
          `[${componentName}] Unmounted after ${renderCountRef.current} renders. ` +
          `Average render time: ${(totalRenderTimeRef.current / renderCountRef.current).toFixed(2)}ms`
        );
      }
    };
  });
  
  // Return render count for debugging purposes
  return renderCountRef.current;
};
