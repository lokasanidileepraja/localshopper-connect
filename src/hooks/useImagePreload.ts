
import { useState, useEffect, useCallback } from 'react';

export const useImagePreload = (src: string, options?: { priority?: boolean }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);
  const { priority = false } = options || {};

  const preloadImage = useCallback(() => {
    if (!src) {
      setIsLoaded(true);
      return;
    }

    const img = new Image();
    img.src = src;
    
    if (priority) {
      // Set fetchPriority if supported by browser
      try {
        // @ts-ignore - fetchPriority is experimental but useful
        img.fetchPriority = 'high';
      } catch (e) {
        // Ignore if not supported
      }
    }
    
    img.onload = () => {
      setIsLoaded(true);
      setError(false);
    };
    
    img.onerror = () => {
      setIsLoaded(true);
      setError(true);
    };

    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [src, priority]);

  useEffect(() => {
    const cleanup = preloadImage();
    return cleanup;
  }, [preloadImage]);

  return { isLoaded, hasError: error };
};
