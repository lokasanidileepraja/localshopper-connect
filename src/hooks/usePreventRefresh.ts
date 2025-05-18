
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Hook to prevent unnecessary page refreshes by stabilizing dependencies
 * that might cause useEffect cleanup/setup cycles
 */
export const usePreventRefresh = () => {
  const location = useLocation();
  
  useEffect(() => {
    // This prevents the browser from refreshing when React Router
    // causes history changes by ensuring navigation uses proper routing
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      // Only prevent actual page reloads, not React Router navigation
      const isActualNavigation = performance.navigation.type === 1;
      if (!isActualNavigation) {
        e.preventDefault();
        e.returnValue = '';
      }
    };
    
    // Track this for debugging purposes
    console.log('Route changed to:', location.pathname);
    
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.addEventListener('beforeunload', handleBeforeUnload);
    };
  }, [location.pathname]);
};
