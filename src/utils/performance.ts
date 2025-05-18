
/**
 * Performance optimization utilities for React applications
 */

/**
 * Simple debounce function to limit function calls
 * 
 * @param func The function to debounce
 * @param wait Wait time in milliseconds
 * @returns Debounced function
 */
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait = 300
) => {
  let timeout: ReturnType<typeof setTimeout>;
  
  return function(...args: Parameters<T>): void {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

/**
 * Simple throttle function to limit execution rate
 * 
 * @param func The function to throttle
 * @param limit Time limit in milliseconds
 * @returns Throttled function
 */
export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit = 300
) => {
  let lastCall = 0;
  
  return function(...args: Parameters<T>): void {
    const now = Date.now();
    
    if (now - lastCall >= limit) {
      lastCall = now;
      func(...args);
    }
  };
};

/**
 * Creates a wrapper that only runs a function if the application is visible
 * to the user (document not hidden)
 * 
 * @param func The function to wrap
 * @returns Function that only executes when page is visible
 */
export const onlyRunWhenVisible = <T extends (...args: any[]) => any>(func: T) => {
  return function(...args: Parameters<T>): ReturnType<T> | undefined {
    if (document.visibilityState !== 'hidden') {
      return func(...args);
    }
    return undefined;
  };
};

/**
 * Measures execution time of a function for performance testing
 * 
 * @param func Function to measure
 * @param name Optional name for logging
 * @returns Wrapped function that logs timing information
 */
export const measureTime = <T extends (...args: any[]) => any>(
  func: T,
  name = 'Function'
) => {
  return function(...args: Parameters<T>): ReturnType<T> {
    const start = performance.now();
    const result = func(...args);
    const end = performance.now();
    console.log(`${name} took ${end - start}ms`);
    return result;
  };
};

/**
 * Batches multiple DOM read/write operations to minimize layout thrashing
 */
export const batchDOMOperations = () => {
  const reads: Array<() => void> = [];
  const writes: Array<() => void> = [];
  let scheduled = false;
  
  const runTasks = () => {
    // Read phase (measurements/computations)
    const readTasks = [...reads];
    reads.length = 0;
    readTasks.forEach(task => task());
    
    // Write phase (mutations)
    const writeTasks = [...writes];
    writes.length = 0;
    writeTasks.forEach(task => task());
    
    scheduled = false;
  };
  
  const schedule = () => {
    if (!scheduled && (reads.length > 0 || writes.length > 0)) {
      scheduled = true;
      requestAnimationFrame(runTasks);
    }
  };
  
  return {
    read: (task: () => void) => {
      reads.push(task);
      schedule();
    },
    write: (task: () => void) => {
      writes.push(task);
      schedule();
    },
    flush: () => {
      if (scheduled) {
        runTasks();
      }
    }
  };
};

/**
 * Generates optimized React key for list items
 * Helps with more efficient reconciliation in React
 * 
 * @param prefix Prefix for the key
 * @param id Item ID
 * @returns Optimized React key string
 */
export const optimizedListKey = (prefix: string, id: string | number) => {
  return `${prefix}_${id}`;
};

/**
 * Helper to check if the code is running in development mode
 * Used to conditionally apply development-only performance checks
 */
export const isDevelopment = process.env.NODE_ENV === 'development';
