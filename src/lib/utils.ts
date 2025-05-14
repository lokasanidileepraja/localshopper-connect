
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
 * Re-export performance utilities 
 */
export const debounce = performanceDebounce;
export const throttle = performanceThrottle;
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
