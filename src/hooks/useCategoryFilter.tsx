import { useState, useCallback, useMemo, useRef } from 'react';
import { Category } from '@/types/categories';
import { debounce } from '@/lib/utils';

export const useCategoryFilter = (categories: Category[]) => {
  const [filter, setFilter] = useState('');
  const categoriesRef = useRef(categories);
  
  // Keep a ref to the categories to avoid unnecessary recalculations
  // when the component re-renders but categories haven't actually changed
  if (categoriesRef.current !== categories) {
    categoriesRef.current = categories;
  }
  
  // Debounced filter setter to prevent too frequent updates
  const setFilterDebounced = useMemo(() => 
    debounce((value: string) => setFilter(value), 300), 
  []);

  // Memoized function to filter categories
  // Using useCallback with a ref instead of direct dependency on categories
  const filteredCategories = useCallback(() => {
    if (!filter) return categoriesRef.current;
    
    const lowerFilter = filter.toLowerCase();
    return categoriesRef.current.filter(category => 
      category.name.toLowerCase().includes(lowerFilter) ||
      category.description.toLowerCase().includes(lowerFilter)
    );
  }, [filter]);

  return { 
    filter, 
    setFilter: setFilterDebounced, 
    filteredCategories,
    // For immediate non-debounced updates when needed
    setFilterImmediate: setFilter
  };
};
