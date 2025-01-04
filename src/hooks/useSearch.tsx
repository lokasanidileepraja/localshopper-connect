import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

export const useSearch = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const savedSearches = localStorage.getItem('recentSearches');
    if (savedSearches) {
      setRecentSearches(JSON.parse(savedSearches));
    }
  }, []);

  const saveRecentSearch = (query: string) => {
    const updatedSearches = [query, ...recentSearches.filter(s => s !== query)].slice(0, 5);
    setRecentSearches(updatedSearches);
    localStorage.setItem('recentSearches', JSON.stringify(updatedSearches));
  };

  const handleSearch = async (query: string) => {
    setIsLoading(true);
    try {
      if (!query.trim()) {
        toast({
          title: "Please enter a search term",
          description: "Enter a product or shop name to search",
        });
        return;
      }
      saveRecentSearch(query);
      navigate("/shop/TechHub Electronics");
    } catch (error) {
      toast({
        title: "Search failed",
        description: "Please try again later",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    searchQuery,
    setSearchQuery,
    isLoading,
    recentSearches,
    handleSearch
  };
};