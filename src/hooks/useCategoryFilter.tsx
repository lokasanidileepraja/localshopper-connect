import { useState, useCallback } from 'react';
import { Category } from '@/types/categories';

export const useCategoryFilter = (categories: Category[]) => {
  const [filter, setFilter] = useState('');

  const filteredCategories = useCallback(() => {
    if (!filter) return categories;
    return categories.filter(category => 
      category.name.toLowerCase().includes(filter.toLowerCase()) ||
      category.description.toLowerCase().includes(filter.toLowerCase())
    );
  }, [categories, filter]);

  return { filter, setFilter, filteredCategories };
};