
import { useState, useCallback } from 'react';
import { useStableCallback } from './useStableCallback';

/**
 * Hook that provides state management with stable callback references
 * to prevent unnecessary rerenders caused by callback recreation
 * 
 * @param initialState The initial state value
 * @returns A tuple of the current state and a stable setState function
 */
export function useStableState<T>(initialState: T | (() => T)): [T, (newState: T | ((prev: T) => T)) => void] {
  const [state, setStateOriginal] = useState<T>(initialState);
  
  // Create a stable setState function that doesn't change on rerenders
  const setState = useStableCallback(setStateOriginal);
  
  return [state, setState];
}
