
import { useToast } from "@/hooks/use-toast";
import { analytics } from "@/lib/analytics";

/**
 * Centralized error handling utility for consistent error management across the application
 */

// Error severity levels
export enum ErrorSeverity {
  LOW = 'low',       // Non-critical errors that don't impact core functionality
  MEDIUM = 'medium', // Errors that impact some functionality but app can continue
  HIGH = 'high',     // Critical errors that significantly impact functionality
  FATAL = 'fatal'    // Errors that make the app unusable and require reload
}

interface ErrorOptions {
  severity?: ErrorSeverity;
  context?: Record<string, any>;
  shouldToast?: boolean;
  shouldLog?: boolean;
  shouldTrack?: boolean;
  toastTitle?: string;
  toastMessage?: string;
  retry?: () => void;
}

// Default options
const defaultOptions: ErrorOptions = {
  severity: ErrorSeverity.MEDIUM,
  shouldToast: true,
  shouldLog: true,
  shouldTrack: true,
};

/**
 * Handle an error with consistent logging, tracking, and user feedback
 */
export const handleError = (error: Error | unknown, options: ErrorOptions = {}) => {
  const opts = { ...defaultOptions, ...options };
  const errorObject = error instanceof Error ? error : new Error(String(error));
  
  // Create a standardized context object
  const errorContext = {
    message: errorObject.message,
    stack: errorObject.stack,
    severity: opts.severity,
    timestamp: new Date().toISOString(),
    ...opts.context
  };
  
  // Log to console
  if (opts.shouldLog) {
    if (opts.severity === ErrorSeverity.HIGH || opts.severity === ErrorSeverity.FATAL) {
      console.error('📛 ERROR:', errorObject, errorContext);
    } else {
      console.warn('⚠️ ERROR:', errorObject, errorContext);
    }
  }
  
  // Track in analytics
  if (opts.shouldTrack && typeof analytics?.trackEvent === 'function') {
    analytics.trackEvent('error_occurred', {
      error_message: errorObject.message,
      error_type: errorObject.name,
      error_severity: opts.severity,
      ...opts.context
    });
  }
  
  // We don't show toast here as it requires React context
  
  return {
    error: errorObject,
    context: errorContext,
  };
};

/**
 * React hook for error handling with toast support
 */
export const useErrorHandler = () => {
  const { toast } = useToast();
  
  const handleErrorWithToast = (error: Error | unknown, options: ErrorOptions = {}) => {
    const result = handleError(error, options);
    
    // Show toast if enabled
    if (options.shouldToast !== false) {
      toast({
        title: options.toastTitle || 'An error occurred',
        description: options.toastMessage || result.error.message,
        variant: 'destructive',
      });
    }
    
    return result;
  };
  
  return { handleError: handleErrorWithToast };
};

/**
 * Create an async error handler wrapper that catches errors in async functions
 */
export const createAsyncErrorHandler = <T extends (...args: any[]) => Promise<any>>(
  fn: T,
  options: ErrorOptions = {}
): ((...args: Parameters<T>) => Promise<ReturnType<T>>) => {
  return async (...args: Parameters<T>): Promise<ReturnType<T>> => {
    try {
      return await fn(...args);
    } catch (error) {
      handleError(error, options);
      throw error; // Re-throw to allow calling code to also handle if needed
    }
  };
};
