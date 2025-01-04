import { useState, useCallback } from 'react';
import { useSearchStore } from '@/store/searchStore';
import { useToast } from '@/hooks/use-toast';

export const useSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { recentSearches, addRecentSearch } = useSearchStore();
  const { toast } = useToast();

  const handleSearch = useCallback(async (query: string) => {
    if (!query.trim()) {
      toast({
        title: "Search Error",
        description: "Please enter a search term",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      // Simulate search delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      addRecentSearch(query);
      toast({
        title: "Search Complete",
        description: `Found results for "${query}"`,
      });
    } catch (error) {
      toast({
        title: "Search Failed",
        description: "Please try again later",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }, [toast, addRecentSearch]);

  return {
    searchQuery,
    setSearchQuery,
    isLoading,
    recentSearches,
    handleSearch,
  };
};