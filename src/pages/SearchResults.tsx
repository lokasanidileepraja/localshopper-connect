import { useSearchParams } from "react-router-dom";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { products } from "@/data/products";
import { ShoppingCart, ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect, useRef, useCallback } from "react";
import { useCartStore } from "@/store/cartStore";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { OptimizedImage } from "@/components/ui/optimized-image";

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const [isLoading, setIsLoading] = useState(true);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const { addToCart } = useCartStore();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Simulate search API call
    setIsLoading(true);
    const timer = setTimeout(() => {
      const results: any[] = [];
      
      // Search across all product categories
      Object.values(products).forEach(categoryProducts => {
        const matches = categoryProducts.filter(product => 
          product.name.toLowerCase().includes(query.toLowerCase()) ||
          product.description?.toLowerCase().includes(query.toLowerCase()) ||
          product.model?.toLowerCase().includes(query.toLowerCase())
        );
        results.push(...matches);
      });
      
      setSearchResults(results);
      setCurrentPage(1); // Reset to first page on new search
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, [query]);

  const handleAddToCart = useCallback((product: any) => {
    addToCart(product, "Default Store");
    toast({
      title: "Added to Cart",
      description: `${product.name} has been added to your cart`,
    });
  }, [addToCart, toast]);

  const handleProductClick = useCallback((productId: string) => {
    navigate(`/product/${productId}`);
  }, [navigate]);

  // Pagination logic
  const totalPages = Math.ceil(searchResults.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = searchResults.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = useCallback((pageNumber: number) => {
    if (listRef.current) {
      listRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setCurrentPage(pageNumber);
  }, []);

  return (
    <motion.div 
      className="container mx-auto px-4 py-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      ref={listRef}
    >
      <Breadcrumbs />
      <div className="space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">Search Results</h1>
          <p className="text-muted-foreground">Results for: <span className="font-medium text-foreground">{query}</span></p>
          <p className="text-sm text-muted-foreground">{searchResults.length} products found</p>
        </div>
        
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Card key={i} className="h-64 animate-pulse">
                <CardContent className="p-0 h-full flex flex-col">
                  <div className="bg-muted h-36 w-full rounded-t-lg"></div>
                  <div className="p-4 space-y-2 flex-1">
                    <div className="h-4 bg-muted rounded w-3/4"></div>
                    <div className="h-4 bg-muted rounded w-1/2"></div>
                    <div className="h-6 bg-muted rounded w-1/3 mt-auto"></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : searchResults.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentItems.map((product) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="h-full">
                    <CardContent className="p-4">
                      <OptimizedImage
                        src={product.image}
                        alt={product.name}
                        className="w-full h-48 object-cover rounded-md mb-4"
                        width={400}
                        height={300}
                      />
                      <h3 
                        className="font-semibold text-lg mb-2 hover:text-primary cursor-pointer" 
                        onClick={() => handleProductClick(product.id)}
                      >
                        {product.name}
                      </h3>
                      <p className="text-gray-600 mb-2 flex-1">{product.description || "Product description"}</p>
                      
                      <div className="space-y-4 mt-auto">
                        <p className="text-2xl font-bold text-primary">
                          ₹{product.price.toLocaleString()}
                        </p>
                        <div className="flex justify-between items-center">
                          <span className={`text-sm ${product.inStock ? 'text-green-600' : 'text-red-600'}`}>
                            {product.inStock ? 'In Stock' : 'Out of Stock'}
                          </span>
                          <div className="flex gap-2">
                            <Button 
                              variant="outline"
                              onClick={() => handleProductClick(product.id)}
                              className="px-3"
                            >
                              <ExternalLink className="h-4 w-4 mr-1" />
                              Details
                            </Button>
                            <Button 
                              onClick={() => handleAddToCart(product)}
                              disabled={!product.inStock}
                              className="px-3"
                            >
                              <ShoppingCart className="h-4 w-4 mr-1" />
                              Add
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
            
            {totalPages > 1 && (
              <div className="flex justify-center mt-8 gap-2">
                <Button 
                  variant="outline" 
                  onClick={() => paginate(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-3 py-2"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                
                {Array.from({ length: Math.min(totalPages, 5) }).map((_, index) => {
                  // Show pagination numbers logically
                  let pageNumber;
                  if (totalPages <= 5) {
                    pageNumber = index + 1;
                  } else if (currentPage <= 3) {
                    pageNumber = index + 1;
                  } else if (currentPage >= totalPages - 2) {
                    pageNumber = totalPages - 4 + index;
                  } else {
                    pageNumber = currentPage - 2 + index;
                  }
                  
                  return (
                    <Button
                      key={pageNumber}
                      variant={currentPage === pageNumber ? "default" : "outline"}
                      onClick={() => paginate(pageNumber)}
                      className="px-4 py-2"
                    >
                      {pageNumber}
                    </Button>
                  );
                })}
                
                <Button 
                  variant="outline" 
                  onClick={() => paginate(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="px-3 py-2"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            )}
          </>
        ) : (
          <div className="bg-muted/50 rounded-lg p-8 text-center">
            <p className="text-xl font-semibold mb-2">No results found</p>
            <p className="text-muted-foreground">We couldn't find any products matching "{query}".</p>
            <p className="text-muted-foreground mt-2">Try different keywords or browse our categories.</p>
            <Button 
              onClick={() => navigate("/")} 
              variant="outline" 
              className="mt-4"
            >
              Browse Categories
            </Button>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default SearchResults;
