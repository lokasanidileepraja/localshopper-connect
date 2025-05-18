
/**
 * Performance optimization utilities
 */

/**
 * Debounce function to limit the rate at which a function can fire
 * @param fn The function to debounce
 * @param delay The delay in milliseconds
 */
export const debounce = <T extends (...args: any[]) => any>(
  fn: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;
  
  return function(...args: Parameters<T>): void {
    if (timeoutId !== null) {
      clearTimeout(timeoutId);
    }
    
    timeoutId = setTimeout(() => {
      fn(...args);
      timeoutId = null;
    }, delay);
  };
};

/**
 * Throttle function to limit the rate at which a function can fire
 * @param fn The function to throttle
 * @param delay The delay in milliseconds
 */
export const throttle = <T extends (...args: any[]) => any>(
  fn: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let lastCall = 0;
  let timeoutId: ReturnType<typeof setTimeout> | null = null;
  
  return function(...args: Parameters<T>): void {
    const now = Date.now();
    const remaining = delay - (now - lastCall);
    
    if (remaining <= 0) {
      if (timeoutId !== null) {
        clearTimeout(timeoutId);
        timeoutId = null;
      }
      
      lastCall = now;
      fn(...args);
    } else if (timeoutId === null) {
      timeoutId = setTimeout(() => {
        lastCall = Date.now();
        timeoutId = null;
        fn(...args);
      }, remaining);
    }
  };
};

/**
 * Safe wrapper for localStorage.getItem that doesn't throw
 */
export const safeLocalStorageGet = (key: string): string | null => {
  try {
    return localStorage.getItem(key);
  } catch (e) {
    console.error(`Error accessing localStorage.getItem('${key}'):`, e);
    return null;
  }
};

/**
 * Safe wrapper for localStorage.setItem that doesn't throw
 */
export const safeLocalStorageSet = (key: string, value: string): boolean => {
  try {
    localStorage.setItem(key, value);
    return true;
  } catch (e) {
    console.error(`Error accessing localStorage.setItem('${key}', '${value}'):`, e);
    return false;
  }
};

/**
 * Throttles renders to prevent excessive re-renders
 * @param callback The render function to throttle
 * @param interval Minimum time between renders
 */
export const throttledRender = <T extends (...args: any[]) => any>(
  callback: T,
  interval = 100
): ((...args: Parameters<T>) => void) => {
  let lastRender = 0;
  let waitingArgs: Parameters<T> | null = null;
  let timeoutId: ReturnType<typeof setTimeout> | null = null;
  
  return function(...args: Parameters<T>): void {
    const now = Date.now();
    waitingArgs = args;
    
    if (now - lastRender >= interval) {
      lastRender = now;
      callback(...args);
      waitingArgs = null;
    } else if (timeoutId === null) {
      timeoutId = setTimeout(() => {
        if (waitingArgs) {
          lastRender = Date.now();
          callback(...waitingArgs);
        }
        timeoutId = null;
        waitingArgs = null;
      }, interval - (now - lastRender));
    }
  };
};

/**
 * Memoization function to cache expensive results
 */
export function memoize<T extends (...args: any[]) => any>(
  func: T,
  resolver?: (...args: Parameters<T>) => string
): (...args: Parameters<T>) => ReturnType<T> {
  const cache = new Map<string, ReturnType<T>>();
  
  return function(...args: Parameters<T>): ReturnType<T> {
    const key = resolver ? resolver(...args) : JSON.stringify(args);
    if (cache.has(key)) {
      return cache.get(key) as ReturnType<T>;
    }
    
    const result = func(...args);
    cache.set(key, result);
    return result;
  };
}
