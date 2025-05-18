import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { 
  debounce as performanceDebounce, 
  throttle as performanceThrottle,
  safeLocalStorageGet as performanceSafeLocalStorageGet,
  safeLocalStorageSet as performanceSafeLocalStorageSet
} from "./performance"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Re-export performance utilities with optimized implementation
 */
export const debounce: typeof performanceDebounce = (fn, delay) => {
  // Use the imported debounce function but add a check to ensure fn is defined
  if (typeof fn !== 'function') {
    console.error('Debounce called with non-function argument');
    return ((...args: any[]) => {}) as ReturnType<typeof performanceDebounce>;
  }
  return performanceDebounce(fn, delay);
};

export const throttle: typeof performanceThrottle = (fn, delay) => {
  // Use the imported throttle function but add a check to ensure fn is defined
  if (typeof fn !== 'function') {
    console.error('Throttle called with non-function argument');
    return ((...args: any[]) => {}) as ReturnType<typeof performanceThrottle>;
  }
  return performanceThrottle(fn, delay);
};

export const safeLocalStorageGet = performanceSafeLocalStorageGet;
export const safeLocalStorageSet = performanceSafeLocalStorageSet;

/**
 * Format currency with proper locale
 */
export function formatCurrency(amount: number, currency: string = 'INR', locale: string = 'en-IN') {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    maximumFractionDigits: 0
  }).format(amount);
}

/**
 * Shorten text with ellipsis
 */
export function shortenText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength)}...`;
}

/**
 * Create URL-friendly slug
 */
export function createSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Remove non-word chars
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/--+/g, '-') // Replace multiple - with single -
    .trim();
}

/**
 * Generate unique ID
 */
export function generateId(): string {
  return Math.random().toString(36).substring(2, 9);
}

/**
 * Helper function to safely use window object
 * Prevents issues with server-side rendering
 */
export function isBrowser(): boolean {
  return typeof window !== 'undefined';
}

/**
 * Prevent layout thrashing by batching DOM reads and writes
 */
export function scheduleDOMOperation(read: () => any, write: (result: any) => void): void {
  requestAnimationFrame(() => {
    const result = read();
    requestAnimationFrame(() => {
      write(result);
    });
  });
}

/**
 * Memoize expensive calculations with a limited cache size
 */
export function memoize<T extends (...args: any[]) => any>(
  fn: T, 
  maxCacheSize: number = 100
): T {
  const cache = new Map();
  
  return ((...args: any[]) => {
    const key = JSON.stringify(args);
    
    if (cache.has(key)) {
      return cache.get(key);
    }
    
    const result = fn(...args);
    
    // Limit cache size
    if (cache.size >= maxCacheSize) {
      // Remove oldest entry
      const firstKey = cache.keys().next().value;
      cache.delete(firstKey);
    }
    
    cache.set(key, result);
    return result;
  }) as T;
}
