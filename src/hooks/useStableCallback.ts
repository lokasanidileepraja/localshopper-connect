
import { useCallback, useRef } from 'react';

/**
 * Returns a stable callback that always uses the latest value of the provided function
 * This is useful when you need to pass callbacks to effects without triggering them on every render
 * 
 * @param callback The callback function to stabilize
 * @returns A stable callback function that forwards all arguments to the latest version of the callback
 */
export function useStableCallback<T extends (...args: any[]) => any>(
  callback: T
): (...args: Parameters<T>) => ReturnType<T> {
  // Store the latest callback in a ref
  const callbackRef = useRef(callback);
  
  // Update ref when callback changes
  callbackRef.current = callback;
  
  // Return a stable function that forwards to latest callback
  return useCallback((...args: Parameters<T>) => {
    return callbackRef.current(...args);
  }, []);
}
