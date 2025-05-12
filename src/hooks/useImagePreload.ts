
import { useState, useEffect, useCallback, useRef } from 'react';

export const useImagePreload = (src: string, options?: { priority?: boolean }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);
  const { priority = false } = options || {};
  const imgRef = useRef<HTMLImageElement | null>(null);

  const preloadImage = useCallback(() => {
    if (!src) {
      setIsLoaded(true);
      return () => {};
    }

    // Clean up previous image if it exists
    if (imgRef.current) {
      imgRef.current.onload = null;
      imgRef.current.onerror = null;
    }

    const img = new Image();
    imgRef.current = img;
    img.src = src;
    
    // Add importance hint for browser optimization
    if (priority) {
      img.setAttribute('importance', 'high');
      // Set fetchPriority if supported by browser
      try {
        // @ts-ignore - fetchPriority is experimental but useful
        img.fetchPriority = 'high';
      } catch (e) {
        // Ignore if not supported
      }
    }
    
    // Use decode API for better performance when available
    const handleImageLoad = () => {
      if (img.decode) {
        img.decode()
          .then(() => {
            setIsLoaded(true);
            setError(false);
          })
          .catch(() => {
            setIsLoaded(true);
            setError(true);
          });
      } else {
        setIsLoaded(true);
        setError(false);
      }
    };
    
    const handleImageError = () => {
      setIsLoaded(true);
      setError(true);
    };
    
    img.onload = handleImageLoad;
    img.onerror = handleImageError;

    // Return cleanup function
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
