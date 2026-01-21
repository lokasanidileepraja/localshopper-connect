import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Star, ArrowRight, Heart } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { OptimizedImage } from "@/components/ui/optimized-image";

const PRODUCTS = [
  {
    id: "1",
    name: "iPhone 15 Pro",
    price: 134900,
    originalPrice: 149900,
    rating: 4.9,
    reviews: 2847,
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
    badge: "New",
    category: "Smartphones"
  },
  {
    id: "2",
    name: "MacBook Air M3",
    price: 114900,
    originalPrice: 124900,
    rating: 4.8,
    reviews: 1923,
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
    badge: "Best Seller",
    category: "Laptops"
  },
  {
    id: "3",
    name: "AirPods Pro 2",
    price: 24999,
    originalPrice: 26999,
    rating: 4.7,
    reviews: 5621,
    image: "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434",
    badge: "Popular",
    category: "Audio"
  },
  {
    id: "4",
    name: "Apple Watch Ultra 2",
    price: 89900,
    originalPrice: 99900,
    rating: 4.8,
    reviews: 1247,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
    badge: null,
    category: "Wearables"
  },
  {
    id: "5",
    name: "Sony WH-1000XM5",
    price: 29990,
    originalPrice: 34990,
    rating: 4.9,
    reviews: 3892,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
    badge: "Top Rated",
    category: "Audio"
  },
  {
    id: "6",
    name: "iPad Pro M2",
    price: 89900,
    originalPrice: 99900,
    rating: 4.8,
    reviews: 2156,
    image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0",
    badge: null,
    category: "Tablets"
  }
];

interface FeaturedProductsProps {
  onProductClick: (productId: string) => void;
}

export const FeaturedProducts = ({ onProductClick }: FeaturedProductsProps) => {
  const navigate = useNavigate();
  const [wishlist, setWishlist] = useState<string[]>([]);

  const toggleWishlist = (productId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setWishlist(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price);
  };

  const getDiscount = (price: number, originalPrice: number) => {
    return Math.round(((originalPrice - price) / originalPrice) * 100);
  };

  return (
    <section className="py-20 px-6 lg:px-8 bg-background">
      <div className="container mx-auto max-w-7xl">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12"
        >
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">
              Featured Products
            </h2>
            <p className="text-lg text-muted-foreground">
              Handpicked electronics with the best deals
            </p>
          </div>
          <button
            onClick={() => navigate("/products")}
            className="inline-flex items-center gap-2 text-primary font-medium hover:gap-3 transition-all self-start sm:self-auto"
          >
            View All Products
            <ArrowRight className="h-4 w-4" />
          </button>
        </motion.div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {PRODUCTS.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <Card 
                className="group h-full overflow-hidden border-border hover:border-primary/20 hover:shadow-xl transition-all duration-300 cursor-pointer"
                onClick={() => onProductClick(product.id)}
              >
                <CardContent className="p-0">
                  {/* Image Container */}
                  <div className="relative aspect-square bg-muted/50 overflow-hidden">
                    <OptimizedImage
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      width={400}
                      height={400}
                    />
                    
                    {/* Badge */}
                    {product.badge && (
                      <Badge className="absolute top-4 left-4 bg-primary text-primary-foreground font-medium">
                        {product.badge}
                      </Badge>
                    )}
                    
                    {/* Wishlist Button */}
                    <button
                      onClick={(e) => toggleWishlist(product.id, e)}
                      className="absolute top-4 right-4 p-2 rounded-full bg-background/80 backdrop-blur-sm border border-border hover:bg-background transition-all"
                    >
                      <Heart 
                        className={`h-5 w-5 ${wishlist.includes(product.id) ? 'fill-destructive text-destructive' : 'text-muted-foreground'}`}
                      />
                    </button>

                    {/* Quick Add - Shows on Hover */}
                    <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-background/90 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                      <Button className="w-full" size="sm">
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        Quick Add
                      </Button>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    {/* Category */}
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
                      {product.category}
                    </p>
                    
                    {/* Name */}
                    <h3 className="text-lg font-semibold text-foreground mb-2 line-clamp-1">
                      {product.name}
                    </h3>
                    
                    {/* Rating */}
                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-primary text-primary" />
                        <span className="text-sm font-medium text-foreground">{product.rating}</span>
                      </div>
                      <span className="text-sm text-muted-foreground">
                        ({product.reviews.toLocaleString()} reviews)
                      </span>
                    </div>
                    
                    {/* Price */}
                    <div className="flex items-center gap-3">
                      <span className="text-xl font-bold text-foreground">
                        {formatPrice(product.price)}
                      </span>
                      {product.originalPrice > product.price && (
                        <>
                          <span className="text-sm text-muted-foreground line-through">
                            {formatPrice(product.originalPrice)}
                          </span>
                          <Badge variant="secondary" className="text-primary bg-primary/10">
                            {getDiscount(product.price, product.originalPrice)}% off
                          </Badge>
                        </>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
