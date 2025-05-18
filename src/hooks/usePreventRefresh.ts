
import { useEffect } from 'react';

/**
 * Hook to prevent unnecessary page refreshes by managing page navigation behavior
 * Optimized to avoid causing UI freezes or performance issues
 */
export const usePreventRefresh = () => {
  useEffect(() => {
    // Only attach event listener when actually leaving the site, not for React Router navigation
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      // Check if there are unsaved changes - in a real app, this would be state-dependent
      // For now, we'll just show a confirmation dialog for actual browser navigation events
      const confirmationMessage = 'Changes you made may not be saved.';
      e.returnValue = confirmationMessage;
      return confirmationMessage;
    };
    
    // Add event listener to window unload event
    window.addEventListener('beforeunload', handleBeforeUnload);
    
    // Clean up by removing the event listener when the component unmounts
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []); // Empty dependency array ensures this only runs on mount and unmount
};
