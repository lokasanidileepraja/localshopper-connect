
import { useState, useEffect, useCallback } from 'react';
import { throttle } from '@/lib/utils';

export function useIsMobile() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640);

  const checkIsMobile = useCallback(() => {
    setIsMobile(window.innerWidth < 640);
  }, []);

  useEffect(() => {
    // Throttled resize handler
    const handleResize = throttle(checkIsMobile, 200);
    
    // Add event listener
    window.addEventListener('resize', handleResize);
    
    // Check initially
    checkIsMobile();
    
    // Cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, [checkIsMobile]); 

  return isMobile;
}
