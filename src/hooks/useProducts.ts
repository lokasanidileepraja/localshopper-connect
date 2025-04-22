
import { useState, useEffect } from 'react';
import { Product } from '@/types/shop';
import { useLocalStorage } from './useLocalStorage';

/**
 * Custom hook for managing recently viewed products
 */
export function useRecentlyViewed(limit: number = 5) {
  const [recentlyViewed, setRecentlyViewed] = useLocalStorage<Product[]>('recently-viewed', []);

  const addToRecentlyViewed = (product: Product) => {
    setRecentlyViewed(prev => {
      // Remove product if it's already in the list
      const filtered = prev.filter(item => item.id !== product.id);
      // Add product to the beginning of the list and limit the size
      return [product, ...filtered].slice(0, limit);
    });
  };

  const clearRecentlyViewed = () => {
    setRecentlyViewed([]);
  };

  return {
    recentlyViewed,
    addToRecentlyViewed,
    clearRecentlyViewed
  };
}

/**
 * Custom hook for product filtering and sorting
 */
export function useProductFilters(products: Product[]) {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [filters, setFilters] = useState({
    minPrice: 0,
    maxPrice: Infinity,
    brands: [] as string[],
    categories: [] as string[],
    inStock: false
  });
  const [sortOption, setSortOption] = useState<string>('');

  useEffect(() => {
    let result = [...products];

    // Apply filters
    if (filters.minPrice > 0) {
      result = result.filter(product => product.price >= filters.minPrice);
    }

    if (filters.maxPrice < Infinity) {
      result = result.filter(product => product.price <= filters.maxPrice);
    }

    if (filters.brands.length > 0) {
      result = result.filter(product => filters.brands.includes(product.brand));
    }

    if (filters.categories.length > 0) {
      result = result.filter(product => filters.categories.includes(product.category));
    }

    if (filters.inStock) {
      result = result.filter(product => product.inStock);
    }

    // Apply sorting
    if (sortOption) {
      switch (sortOption) {
        case 'price-asc':
          result.sort((a, b) => a.price - b.price);
          break;
        case 'price-desc':
          result.sort((a, b) => b.price - a.price);
          break;
        case 'name-asc':
          result.sort((a, b) => a.name.localeCompare(b.name));
          break;
        case 'name-desc':
          result.sort((a, b) => b.name.localeCompare(a.name));
          break;
        case 'rating-desc':
          result.sort((a, b) => b.rating - a.rating);
          break;
        default:
          break;
      }
    }

    setFilteredProducts(result);
  }, [products, filters, sortOption]);

  return {
    filteredProducts,
    filters,
    setFilters,
    sortOption,
    setSortOption
  };
}
