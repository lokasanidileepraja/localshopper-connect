
import { useSearchParams } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";
import { SearchBar } from "@/components/SearchBar";
import { SearchFilters } from "@/components/search/SearchFilters";
import { SearchResults } from "@/components/search/SearchResults";
import { Navigation } from "@/components/Navigation";
import { useCartStore } from "@/store/cartStore";
import { useToast } from "@/hooks/use-toast";

const SearchResultsPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const { addToCart } = useCartStore();
  const { toast } = useToast();
  
  const [activeFilters, setActiveFilters] = useState({
    categories: [],
    priceRange: [0, 200000],
    brands: [],
    ratings: null,
    availability: false
  });
  
  const handleUpdateFilters = (newFilters) => {
    setActiveFilters(prev => ({
      ...prev,
      ...newFilters
    }));
  };
  
  const handleAddToCart = (product) => {
    addToCart(product, "Online Store");
    
    toast({
      title: "Added to cart",
      description: `${product.name} added to your cart`,
    });
  };
  
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold mb-6">
            {query ? `Search results for "${query}"` : "Search Products"}
          </h1>
          
          <div className="mb-6">
            <SearchBar initialQuery={query} />
          </div>
        </motion.div>
        
        <div className="grid gap-6 md:grid-cols-4">
          <aside className="md:col-span-1">
            <SearchFilters 
              activeFilters={activeFilters}
              onUpdateFilters={handleUpdateFilters}
            />
          </aside>
          
          <div className="md:col-span-3">
            <SearchResults 
              query={query}
              filters={activeFilters}
              onAddToCart={handleAddToCart}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default SearchResultsPage;
