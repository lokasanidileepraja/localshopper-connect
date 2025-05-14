
import { useState, useCallback, useMemo } from 'react';
import { Category } from '@/types/categories';
import { debounce } from '@/lib/utils';

export const useCategoryFilter = (categories: Category[]) => {
  const [filter, setFilter] = useState('');
  
  // Debounced filter setter to prevent too frequent updates
  const setFilterDebounced = useMemo(() => 
    debounce((value: string) => setFilter(value), 300), 
  []);

  // Memoized function to filter categories
  const filteredCategories = useCallback(() => {
    if (!filter) return categories;
    
    const lowerFilter = filter.toLowerCase();
    return categories.filter(category => 
      category.name.toLowerCase().includes(lowerFilter) ||
      category.description.toLowerCase().includes(lowerFilter)
    );
  }, [categories, filter]);

  return { 
    filter, 
    setFilter: setFilterDebounced, 
    filteredCategories,
    // For immediate non-debounced updates when needed
    setFilterImmediate: setFilter
  };
};
