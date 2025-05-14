
/**
 * Utility functions for performance optimization
 */

/**
 * Creates a debounced function that delays invoking func until after wait milliseconds
 * @param func The function to debounce
 * @param wait Wait time in milliseconds
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout> | null = null;
  
  return function(...args: Parameters<T>): void {
    const later = () => {
      timeout = null;
      func(...args);
    };
    
    if (timeout !== null) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(later, wait);
  };
}

/**
 * Creates a throttled function that only invokes func at most once per every wait milliseconds
 * @param func The function to throttle
 * @param limit Limit time in milliseconds
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle = false;
  let lastArgs: Parameters<T> | null = null;
  
  return function(...args: Parameters<T>): void {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      
      setTimeout(() => {
        inThrottle = false;
        if (lastArgs) {
          func(...lastArgs);
          lastArgs = null;
        }
      }, limit);
    } else {
      lastArgs = args;
    }
  };
}

/**
 * Safely accesses nested properties without throwing errors
 */
export function safeAccess<T, K extends keyof T>(obj: T | null | undefined, key: K): T[K] | undefined {
  return obj && obj[key];
}

/**
 * Safe local storage get with error handling
 */
export function safeLocalStorageGet(key: string): string | null {
  try {
    return localStorage.getItem(key);
  } catch (e) {
    console.error('Error accessing localStorage:', e);
    return null;
  }
}

/**
 * Safe local storage set with error handling
 */
export function safeLocalStorageSet(key: string, value: string): boolean {
  try {
    localStorage.setItem(key, value);
    return true;
  } catch (e) {
    console.error('Error setting localStorage:', e);
    return false;
  }
}

/**
 * RAF (request animation frame) based throttle for smooth animations
 */
export function rafThrottle<T extends (...args: any[]) => any>(
  callback: T
): (...args: Parameters<T>) => void {
  let requestId: number | null = null;
  let lastArgs: Parameters<T> | null = null;

  const later = () => {
    requestId = null;
    if (lastArgs) {
      callback(...lastArgs);
      lastArgs = null;
    }
  };

  return (...args: Parameters<T>) => {
    lastArgs = args;
    if (requestId === null) {
      requestId = requestAnimationFrame(later);
    }
  };
}
