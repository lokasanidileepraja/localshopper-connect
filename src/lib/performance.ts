
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
