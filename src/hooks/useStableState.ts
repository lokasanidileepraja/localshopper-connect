import { useState, useCallback, useRef, useEffect } from 'react';
import { useStableCallback } from './useStableCallback';

/**
 * Hook that provides state management with stable callback references
 * to prevent unnecessary rerenders caused by callback recreation
 * 
 * @param initialState The initial state value
 * @returns A tuple of the current state and a stable setState function
 */
export function useStableState<T>(initialState: T | (() => T)): [T, (newState: T | ((prev: T) => T)) => void, () => T] {
  const [state, setStateOriginal] = useState<T>(initialState);
  
  // Use a ref to always have access to the latest state without dependencies
  const stateRef = useRef<T>(state);
  
  // Keep the ref in sync with the state
  useEffect(() => {
    stateRef.current = state;
  }, [state]);
  
  // Create a stable setState function that doesn't change on rerenders
  const setState = useStableCallback((newState: T | ((prev: T) => T)) => {
    // If the new state is a function, call it with the current state
    if (typeof newState === 'function') {
      setStateOriginal((prev) => {
        const updater = newState as (prev: T) => T;
        const nextState = updater(prev);
        stateRef.current = nextState;
        return nextState;
      });
    } else {
      setStateOriginal(newState);
      stateRef.current = newState;
    }
  });
  
  // Function to get the current state from the ref (avoids closure issues)
  const getState = useCallback(() => stateRef.current, []);
  
  return [state, setState, getState];
}
