
/**
 * Optimized animation utilities for better performance
 */

import { useEffect, useState, useRef } from 'react';

/**
 * Hook for creating optimized animations with requestAnimationFrame
 * 
 * @param callback Animation frame callback
 * @param dependencies Dependencies array that will trigger animation restart
 * @param options Animation options
 */
export const useAnimationFrame = (
  callback: (time: number, deltaTime: number) => void,
  dependencies: any[] = [],
  options: { autoStart?: boolean } = { autoStart: true }
) => {
  const requestRef = useRef<number | null>(null);
  const previousTimeRef = useRef<number | null>(null);
  const [isRunning, setIsRunning] = useState<boolean>(!!options.autoStart);
  const callbackRef = useRef(callback);
  
  // Update the callback ref when callback changes
  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);
  
  const animate = (time: number) => {
    if (previousTimeRef.current === null) {
      previousTimeRef.current = time;
    }
    
    const deltaTime = time - previousTimeRef.current;
    callbackRef.current(time, deltaTime);
    
    previousTimeRef.current = time;
    if (isRunning) {
      requestRef.current = requestAnimationFrame(animate);
    }
  };
  
  const start = () => {
    if (!isRunning) {
      setIsRunning(true);
      previousTimeRef.current = null;
      requestRef.current = requestAnimationFrame(animate);
    }
  };
  
  const stop = () => {
    if (isRunning && requestRef.current) {
      cancelAnimationFrame(requestRef.current);
      setIsRunning(false);
    }
  };
  
  useEffect(() => {
    if (isRunning) {
      requestRef.current = requestAnimationFrame(animate);
    }
    
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [isRunning, ...dependencies]);
  
  return { start, stop, isRunning };
};

/**
 * Creates a staggered animation sequence for lists
 * 
 * @param count Number of items to animate
 * @param staggerDelay Delay between each item's animation in ms
 * @param initialDelay Initial delay before animations begin
 * @returns Array of delays for each item
 */
export const createStaggeredAnimation = (
  count: number, 
  staggerDelay = 50,
  initialDelay = 0
): number[] => {
  return Array(count)
    .fill(0)
    .map((_, i) => initialDelay + i * staggerDelay);
};

/**
 * Safe requestAnimationFrame polyfill with fallback
 */
export const safeRequestAnimationFrame = (
  callback: FrameRequestCallback
): number => {
  if (typeof requestAnimationFrame !== 'undefined') {
    return requestAnimationFrame(callback);
  }
  
  // Fallback to setTimeout for environments without requestAnimationFrame
  return window.setTimeout(() => callback(Date.now()), 16); // ~60fps
};

/**
 * Safe cancelAnimationFrame polyfill with fallback
 */
export const safeCancelAnimationFrame = (id: number): void => {
  if (typeof cancelAnimationFrame !== 'undefined') {
    cancelAnimationFrame(id);
  } else {
    window.clearTimeout(id);
  }
};

/**
 * Creates an optimized CSS animation class toggler for better performance
 * 
 * @param element DOM element to animate
 * @param className CSS class to toggle
 * @param duration Duration in ms
 * @returns Object with start and stop functions
 */
export const createAnimationToggler = (
  element: HTMLElement,
  className: string,
  duration: number
) => {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;
  
  const start = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    element.classList.add(className);
    
    timeoutId = setTimeout(() => {
      element.classList.remove(className);
      timeoutId = null;
    }, duration);
  };
  
  const stop = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
      timeoutId = null;
    }
    element.classList.remove(className);
  };
  
  return { start, stop };
};
