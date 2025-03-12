import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Star } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { LoadingSpinner } from "./LoadingSpinner";
import { useState, useEffect, useCallback, useRef } from "react";
import InfiniteScroll from 'react-infinite-scroll-component';
import { useToast } from "@/hooks/use-toast";
import { useKeyboardNav } from "@/hooks/useKeyboardNav";
import { OptimizedImage } from "@/components/ui/optimized-image";

const ALL_PRODUCTS = [
  {
    id: "1",
    name: "iPhone 15",
    price: 79999,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
    badge: "New Release",
    description: "Latest iPhone with advanced features"
  },
  {
    id: "2",
    name: "MacBook Air M2",
    price: 114900,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
    badge: "Best Seller",
    description: "Powerful and efficient laptop"
  },
  {
    id: "3",
    name: "AirPods Pro",
    price: 24999,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434",
    badge: "Popular",
    description: "Premium wireless earbuds"
  }
];

interface FeaturedProductsProps {
  onProductClick: (productId: string) => void;
}

export const FeaturedProducts = ({ onProductClick }: FeaturedProductsProps) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState(ALL_PRODUCTS.slice(0, 3));
  const [hasMore, setHasMore] = useState(true);
  const { toast } = useToast();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  const fetchMoreData = useCallback(() => {
    if (products.length >= ALL_PRODUCTS.length) {
      setHasMore(false);
      return;
    }

    requestAnimationFrame(() => {
      setProducts(prevProducts => [
        ...prevProducts,
        ...ALL_PRODUCTS.slice(prevProducts.length, prevProducts.length + 3)
      ]);
    });
  }, [products.length]);

  useKeyboardNav(
    () => setSelectedIndex(prev => Math.max(0, prev - 1)),
    () => setSelectedIndex(prev => Math.min(products.length - 1, prev + 1)),
    () => navigate(`/product/${products[selectedIndex].id}`)
  );

  const handleProductClick = useCallback((productId: string) => {
    onProductClick(productId);
  }, [onProductClick]);

  if (isLoading) {
    return (
      <section className="py-12 bg-gray-50">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-8">Featured Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((index) => (
              <Card key={index} className="animate-pulse">
                <div className="h-48 bg-gray-200" />
                <div className="p-4 space-y-4">
                  <div className="h-4 bg-gray-200 rounded w-3/4" />
                  <div className="h-4 bg-gray-200 rounded w-1/2" />
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 bg-gray-50" ref={scrollRef}>
      <div className="container">
        <h2 className="text-3xl font-bold text-center mb-8">Featured Products</h2>
        <InfiniteScroll
          dataLength={products.length}
          next={fetchMoreData}
          hasMore={hasMore}
          loader={<LoadingSpinner />}
          scrollThreshold={0.8}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ 
                  opacity: 1, 
                  y: 0,
                  scale: selectedIndex === index ? 1.02 : 1,
                }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="focus-within:ring-2 focus-within:ring-primary rounded-lg"
                tabIndex={0}
                role="button"
                aria-label={`View details for ${product.name}`}
              >
                <Card className="group h-full">
                  <CardContent className="p-0">
                    <div className="relative">
                      <OptimizedImage
                        src={product.image}
                        alt={product.name}
                        className="w-full h-48 object-cover"
                        width={400}
                        height={300}
                      />
                      {product.badge && (
                        <Badge className="absolute top-2 right-2">{product.badge}</Badge>
                      )}
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-lg mb-2 line-clamp-1">{product.name}</h3>
                      <p className="text-sm text-gray-600 mb-2 line-clamp-2">{product.description}</p>
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-2xl font-bold text-primary">
                          ₹{product.price.toLocaleString()}
                        </span>
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm font-medium">{product.rating}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="p-4 pt-0">
                    <Button 
                      className="w-full"
                      onClick={() => handleProductClick(product.id)}
                    >
                      <ShoppingCart className="mr-2 h-4 w-4" />
                      View Details
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </InfiniteScroll>
      </div>
    </section>
  );
};
