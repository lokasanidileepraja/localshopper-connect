
import { useEffect, useRef } from 'react';

/**
 * Hook to prevent unnecessary page refreshes by managing page navigation behavior
 * Optimized to avoid causing UI freezes or performance issues
 */
export const usePreventRefresh = (shouldPrevent = true, message?: string) => {
  // Use a ref to avoid unneeded effect re-runs
  const hasUnsavedChanges = useRef(shouldPrevent);

  useEffect(() => {
    hasUnsavedChanges.current = shouldPrevent;
  }, [shouldPrevent]);

  useEffect(() => {
    // Skip attaching the listener if prevention is disabled
    if (!shouldPrevent) return;

    // Only attach event listener when actually leaving the site, not for React Router navigation
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      // Only prevent if we have unsaved changes
      if (!hasUnsavedChanges.current) return;

      // Show confirmation dialog for actual browser navigation events
      const confirmationMessage = message || 'Changes you made may not be saved.';
      e.returnValue = confirmationMessage;
      return confirmationMessage;
    };
    
    // Add event listener to window unload event
    window.addEventListener('beforeunload', handleBeforeUnload);
    
    // Clean up by removing the event listener when the component unmounts
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [message, shouldPrevent]); // Re-add the listener if the message or prevention flag changes

  // Return a method to manually clear the protection if needed
  return {
    clearProtection: () => {
      hasUnsavedChanges.current = false;
    },
    setProtection: (protect: boolean) => {
      hasUnsavedChanges.current = protect;
    }
  };
};
