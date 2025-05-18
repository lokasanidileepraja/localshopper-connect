
/**
 * Custom implementation of memoization to cache expensive function results
 * 
 * @param fn The function to memoize
 * @param getKey Function to generate a cache key from the arguments
 * @returns Memoized function
 */
export function memoize<T extends Function>(
  fn: T, 
  getKey: (...args: any[]) => string = (...args) => JSON.stringify(args)
): T {
  const cache = new Map<string, any>();
  
  const memoizedFn = function(this: any, ...args: any[]): any {
    const key = getKey(...args);
    
    if (cache.has(key)) {
      return cache.get(key);
    }
    
    const result = fn.apply(this, args);
    cache.set(key, result);
    
    return result;
  };
  
  // Add a method to clear the cache
  (memoizedFn as any).clearCache = () => {
    cache.clear();
  };
  
  return memoizedFn as unknown as T;
}

/**
 * Creates a batched update function that groups multiple calls together
 * 
 * @param callback Function to execute with batched updates
 * @param wait Time in ms to wait before executing the callback
 * @returns Function that batches calls to the original callback
 */
export function createBatchedUpdate<T>(
  callback: (items: T[]) => void,
  wait = 100
): (item: T) => void {
  let batch: T[] = [];
  let timeout: ReturnType<typeof setTimeout> | null = null;
  
  return function(item: T): void {
    batch.push(item);
    
    if (!timeout) {
      timeout = setTimeout(() => {
        const itemsToProcess = [...batch];
        batch = [];
        timeout = null;
        
        callback(itemsToProcess);
      }, wait);
    }
  };
}

/**
 * Creates a lazy-initializing wrapper for expensive objects or values
 * 
 * @param factory Function that creates the value
 * @returns Function that returns the lazily initialized value
 */
export function createLazyValue<T>(factory: () => T): () => T {
  let value: T | undefined;
  let initialized = false;
  
  return function(): T {
    if (!initialized) {
      value = factory();
      initialized = true;
    }
    
    return value as T;
  };
}
