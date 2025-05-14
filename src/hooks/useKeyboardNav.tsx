
import { useEffect, useCallback, useRef } from 'react';

/**
 * A hook to handle keyboard navigation
 * @param onUp Function to call when up arrow is pressed
 * @param onDown Function to call when down arrow is pressed
 * @param onEnter Function to call when enter is pressed
 * @param deps Dependencies array to control when the event listeners are added/removed
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
  
  // Create a memoized keyboard handler
  const handleKeyDown = useCallback((event: KeyboardEvent) => {
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
  }, []);
  
  useEffect(() => {
    // Add throttled event listener
    let lastCallTime = 0;
    const throttleDelay = 150; // ms
    
    const throttledHandler = (event: KeyboardEvent) => {
      const now = Date.now();
      if (now - lastCallTime >= throttleDelay) {
        handleKeyDown(event);
        lastCallTime = now;
      }
    };
    
    window.addEventListener('keydown', throttledHandler);
    
    return () => {
      window.removeEventListener('keydown', throttledHandler);
    };
  }, [handleKeyDown, ...deps]);
};
