import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Star } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { LoadingSpinner } from "./LoadingSpinner";
import { useState, useEffect } from "react";
import InfiniteScroll from 'react-infinite-scroll-component';
import { useToast } from "@/hooks/use-toast";
import { useKeyboardNav } from "@/hooks/useKeyboardNav";

// Extended product data
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

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const fetchMoreData = () => {
    if (products.length >= ALL_PRODUCTS.length) {
      setHasMore(false);
      return;
    }

    setTimeout(() => {
      setProducts(prevProducts => [
        ...prevProducts,
        ...ALL_PRODUCTS.slice(prevProducts.length, prevProducts.length + 3)
      ]);
    }, 1500);
  };

  useKeyboardNav(
    () => setSelectedIndex(prev => Math.max(0, prev - 1)),
    () => setSelectedIndex(prev => Math.min(products.length - 1, prev + 1)),
    () => navigate(`/product/${products[selectedIndex].id}`)
  );

  const handleProductClick = (productId: string) => {
    onProductClick(productId);
  };

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
    <section className="py-12 bg-gray-50">
      <div className="container">
        <h2 className="text-3xl font-bold text-center mb-8">Featured Products</h2>
        <InfiniteScroll
          dataLength={products.length}
          next={fetchMoreData}
          hasMore={hasMore}
          loader={<LoadingSpinner />}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence>
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ 
                  opacity: 1, 
                  y: 0,
                  scale: selectedIndex === index ? 1.02 : 1,
                  boxShadow: selectedIndex === index ? "0 8px 30px rgba(0,0,0,0.12)" : "none"
                }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="focus-within:ring-2 focus-within:ring-primary rounded-lg"
                tabIndex={0}
                role="button"
                aria-label={`View details for ${product.name}`}
              >
                <Card className="group overflow-hidden h-full">
                  <CardContent className="p-0">
                    <div className="relative">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                        loading="lazy"
                      />
                      <Badge className="absolute top-2 right-2">{product.badge}</Badge>
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
                      <p className="text-sm text-gray-600 mb-2">{product.description}</p>
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
                      className="w-full group"
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
