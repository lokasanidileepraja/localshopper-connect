
import { useState, useEffect, useCallback, useRef } from 'react';
import { throttle } from '@/lib/utils';

/**
 * Optimized mobile detection hook
 * Uses throttling and stable references to prevent refresh loops
 */
export function useIsMobile() {
  // Get initial value
  const getIsMobile = () => window.innerWidth < 640;
  
  const [isMobile, setIsMobile] = useState(() => {
    // Safely handle server-side rendering
    if (typeof window === 'undefined') return false;
    return getIsMobile();
  });
  
  // Use ref to prevent recreating the handler on each render
  const checkIsMobileRef = useRef(throttle(() => {
    const mobileCheck = getIsMobile();
    // Only update state if value actually changed
    if (mobileCheck !== isMobile) {
      setIsMobile(mobileCheck);
    }
  }, 200));
  
  useEffect(() => {
    // Get the current stable reference to the handler
    const handler = checkIsMobileRef.current;
    
    // Add event listener
    window.addEventListener('resize', handler);
    
    // Initial check
    handler();
    
    // Cleanup
    return () => window.removeEventListener('resize', handler);
  }, []); // Empty dependency array is intentional

  return isMobile;
}
