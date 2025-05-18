import { useState, useCallback, useMemo, useRef } from 'react';
import { Category } from '@/types/categories';
import { debounce } from '@/utils/performance';

/**
 * Hook for filtering categories with optimized performance
 */
export const useCategoryFilter = (categories: Category[]) => {
  // Use useState for the filter value
  const [filter, setFilterInternal] = useState('');
  
  // Keep a persistent reference to the categories to avoid unnecessary rerenders
  const categoriesRef = useRef<Category[]>(categories);
  
  // Update the ref if categories change
  if (categoriesRef.current !== categories) {
    categoriesRef.current = categories;
  }
  
  // Create a stable debounced setter
  const setFilter = useMemo(() => 
    debounce((value: string) => setFilterInternal(value), 200), 
  []);

  // Create a stable, non-debounced setter
  const setFilterImmediate = useCallback((value: string) => {
    setFilterInternal(value);
  }, []);

  // Use a stable, memoized function to filter categories
  const filteredCategories = useMemo(() => {
    // Quick return if no filter to avoid unnecessary processing
    if (!filter) return categoriesRef.current;
    
    // Convert to lowercase once for better performance
    const lowerFilter = filter.toLowerCase().trim();
    
    if (!lowerFilter) return categoriesRef.current;
    
    // Filter categories with optimized algorithm
    return categoriesRef.current.filter(category => {
      const categoryName = category.name.toLowerCase();
      const categoryDesc = category.description.toLowerCase();
      
      // Check name first as it's more likely to match and is faster
      if (categoryName.includes(lowerFilter)) {
        return true;
      }
      
      // Only check description if name doesn't match
      return categoryDesc.includes(lowerFilter);
    });
  }, [filter]);

  // Return with cleaner, properly typed API
  return { 
    filter, 
    setFilter,
    filteredCategories: filteredCategories,
    setFilterImmediate,
    resultsCount: filteredCategories.length,
    hasFilter: !!filter.trim(),
  };
};
