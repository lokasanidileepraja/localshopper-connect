import { useState, useCallback, useMemo, useRef } from 'react';
import { Category } from '@/types/categories';
import { debounce } from '@/lib/performance';

export const useCategoryFilter = (categories: Category[]) => {
  // Use useState for the filter value
  const [filter, setFilter] = useState('');
  
  // Keep a persistent reference to the categories to avoid unnecessary rerenders
  const categoriesRef = useRef<Category[]>(categories);
  
  // Update the ref if categories change
  if (categoriesRef.current !== categories) {
    categoriesRef.current = categories;
  }
  
  // Create a stable debounced setter
  const setFilterDebounced = useMemo(() => 
    debounce((value: string) => setFilter(value), 300), 
  []);

  // Use a stable, memoized function to filter categories
  const filteredCategories = useCallback(() => {
    // Quick return if no filter
    if (!filter) return categoriesRef.current;
    
    // Convert to lowercase once for better performance
    const lowerFilter = filter.toLowerCase();
    
    // Filter categories
    return categoriesRef.current.filter(category => 
      category.name.toLowerCase().includes(lowerFilter) ||
      category.description.toLowerCase().includes(lowerFilter)
    );
  }, [filter]);

  // Compact object with everything needed for category filtering
  return { 
    filter, 
    setFilter: setFilterDebounced, 
    filteredCategories,
    // For immediate non-debounced updates when needed
    setFilterImmediate: setFilter
  };
};
