import { useVirtualizer } from "@tanstack/react-virtual";
import { useSearchParams } from "react-router-dom";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { products } from "@/data/products";
import { ShoppingCart, ExternalLink } from "lucide-react";
import { useState, useEffect } from "react";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { OptimizedImage } from "@/components/ui/optimized-image";
const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const [isLoading, setIsLoading] = useState(true);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const { addToCart } = useCart();
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate search API call
    setIsLoading(true);
    setTimeout(() => {
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
      setIsLoading(false);
    }, 800);
  }, [query]);

  const handleAddToCart = (product: any) => {
    addToCart(product, "Default Store");
    toast({
      title: "Added to Cart",
      description: `${product.name} has been added to your cart`,
    });
  };

  const handleProductClick = (productId: string) => {
    navigate(`/product/${productId}`);
  };

  const parentRef = useRef<HTMLDivElement>(null);
  const rowVirtualizer = useVirtualizer({
    count: searchResults.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 350,
    overscan: 5,
  });

  return (
    <motion.div 
      className="container mx-auto px-4 py-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
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
        <div ref={parentRef} className="h-[800px] overflow-auto">
          <div
            style={{
              height: `${rowVirtualizer.getTotalSize()}px`,
              width: '100%',
              position: 'relative',
            }}
          >
            {rowVirtualizer.getVirtualItems().map((virtualRow) => {
              const product = searchResults[virtualRow.index];
              return (
                <motion.div
                  key={product.id}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: virtualRow.size,
                    transform: `translateY(${virtualRow.start}px)`,
                  }}
                >
                  <Card className="m-2">
                    <CardContent className="p-4">
                      <OptimizedImage
                        src={product.image}
                        alt={product.name}
                        className="w-full h-48 object-cover rounded-md mb-4"
                      />
                      <h3 className="font-semibold text-lg mb-2 hover:text-primary">{product.name}</h3>
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
              );
            })}
          </div>
        </div>
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
