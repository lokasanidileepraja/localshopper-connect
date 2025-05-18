
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Hook to prevent unnecessary page refreshes by managing page navigation behavior
 */
export const usePreventRefresh = () => {
  const location = useLocation();
  
  useEffect(() => {
    // This is a more efficient approach that avoids creating closures on each render
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      // Only prevent actual browser refreshes (F5, Ctrl+R), not React Router navigation
      if (e.currentTarget === window) {
        // This is a standard way to show the "Are you sure?" dialog
        // but we only apply it for actual page unloads, not React Router navigation
        const confirmationMessage = 'Changes you made may not be saved.';
        e.returnValue = confirmationMessage;
        return confirmationMessage;
      }
    };
    
    // Only attach the event listener once and only for actual page unloads
    window.addEventListener('beforeunload', handleBeforeUnload);
    
    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []); // Remove location.pathname dependency to prevent unnecessary rerenders
};
