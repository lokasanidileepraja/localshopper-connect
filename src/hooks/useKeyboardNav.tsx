import { useEffect } from 'react';

export const useKeyboardNav = (onArrowUp: () => void, onArrowDown: () => void, onEnter: () => void) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowUp':
          e.preventDefault();
          onArrowUp();
          break;
        case 'ArrowDown':
          e.preventDefault();
          onArrowDown();
          break;
        case 'Enter':
          e.preventDefault();
          onEnter();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onArrowUp, onArrowDown, onEnter]);
};