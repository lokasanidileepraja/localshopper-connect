
import { useCallback, useRef } from 'react';

/**
 * Creates a callback that remains stable across renders
 * Helps prevent infinite re-render loops
 */
export function useStableCallback<T extends (...args: any[]) => any>(callback: T): T {
  // Use a ref to store the callback
  const callbackRef = useRef(callback);
  
  // Update the ref whenever the callback changes
  callbackRef.current = callback;
  
  // Return a stable function that calls the latest callback
  return useCallback(
    ((...args) => {
      return callbackRef.current(...args);
    }) as T,
    [] // Empty dependency array keeps this callback stable
  );
}
