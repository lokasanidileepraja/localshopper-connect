
/**
 * Prefetch a component during idle time to improve perceived performance
 * @param importFn Function that returns a dynamic import
 */
export const prefetchComponent = (importFn: () => Promise<any>) => {
  if (typeof window === 'undefined') return;
  
  const prefetch = async () => {
    try {
      await importFn();
    } catch (error) {
      console.error('Error prefetching component:', error);
    }
  };

  if (window.requestIdleCallback) {
    window.requestIdleCallback(() => prefetch());
  } else {
    setTimeout(prefetch, 1000);
  }
};

/**
 * Prefetch multiple components during idle time
 * @param importFns Array of functions that return dynamic imports
 */
export const prefetchComponents = (importFns: Array<() => Promise<any>>) => {
  importFns.forEach(prefetchComponent);
};
