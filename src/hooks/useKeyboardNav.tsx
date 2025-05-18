import { useEffect, useCallback, useRef } from 'react';
import { throttle } from '@/lib/utils';

/**
 * A hook to handle keyboard navigation with improved stability
 * Uses stable refs and throttling to prevent refresh loops
 */
export const useKeyboardNav = (
  onUp: () => void,
  onDown: () => void,
  onEnter: () => void,
  deps: any[] = []
) => {
  // Use refs to store the latest callback functions
  const onUpRef = useRef(onUp);
  const onDownRef = useRef(onDown);
  const onEnterRef = useRef(onEnter);
  
  // Update refs when callbacks change
  useEffect(() => {
    onUpRef.current = onUp;
    onDownRef.current = onDown;
    onEnterRef.current = onEnter;
  }, [onUp, onDown, onEnter]);
  
  // Throttled keyboard handler stored in a ref to keep it stable
  const handleKeyDownRef = useRef(throttle((event: KeyboardEvent) => {
    // Only handle navigation events if no input element is focused
    const activeElement = document.activeElement;
    const isInputFocused = 
      activeElement instanceof HTMLInputElement || 
      activeElement instanceof HTMLTextAreaElement || 
      activeElement?.getAttribute('role') === 'textbox';
    
    if (isInputFocused) return;
    
    switch (event.key) {
      case 'ArrowUp':
        event.preventDefault();
        onUpRef.current();
        break;
      case 'ArrowDown':
        event.preventDefault();
        onDownRef.current();
        break;
      case 'Enter':
        // Only handle Enter if we're not already on a button/link
        if (!(activeElement instanceof HTMLButtonElement || 
              activeElement instanceof HTMLAnchorElement)) {
          event.preventDefault();
          onEnterRef.current();
        }
        break;
      default:
        break;
    }
  }, 150));
  
  useEffect(() => {
    // Get the stable reference to the handler
    const handler = handleKeyDownRef.current;
    
    // Add event listener
    window.addEventListener('keydown', handler);
    
    return () => {
      window.removeEventListener('keydown', handler);
    };
  }, deps); // Only re-attach when deps change
};
