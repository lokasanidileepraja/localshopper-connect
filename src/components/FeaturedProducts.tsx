import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Star, ArrowRight, Heart, Check, Sparkles, TrendingDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { OptimizedImage } from "@/components/ui/optimized-image";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

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
    category: "Smartphones",
    tag: "popular" as const
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
    category: "Laptops",
    tag: "best-value" as const
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
    category: "Audio",
    tag: null
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
    category: "Wearables",
    tag: "lowest-price" as const
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
    category: "Audio",
    tag: "top-rated" as const
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
    category: "Tablets",
    tag: null
  }
];

type ProductTag = "popular" | "best-value" | "lowest-price" | "top-rated" | null;

interface FeaturedProductsProps {
  onProductClick: (productId: string) => void;
}

export const FeaturedProducts = ({ onProductClick }: FeaturedProductsProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [addedToCart, setAddedToCart] = useState<string[]>([]);

  const toggleWishlist = (productId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const isAdding = !wishlist.includes(productId);
    setWishlist(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
    
    if (isAdding) {
      toast({
        title: "Added to Wishlist",
        description: "We'll notify you about price drops",
      });
    }
  };

  const handleQuickAdd = (product: typeof PRODUCTS[0], e: React.MouseEvent) => {
    e.stopPropagation();
    setAddedToCart(prev => [...prev, product.id]);
    
    toast({
      title: "Added to Cart",
      description: `${product.name} added successfully`,
    });

    // Reset after animation
    setTimeout(() => {
      setAddedToCart(prev => prev.filter(id => id !== product.id));
    }, 2000);
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

  const getTagBadge = (tag: ProductTag) => {
    if (!tag) return null;
    
    const configs = {
      "popular": { 
        label: "Most Popular", 
        icon: Sparkles, 
        className: "bg-gradient-to-r from-purple-500 to-pink-500 text-white" 
      },
      "best-value": { 
        label: "Best Value", 
        icon: Sparkles, 
        className: "bg-gradient-to-r from-amber-500 to-orange-500 text-white" 
      },
      "lowest-price": { 
        label: "Lowest Price", 
        icon: TrendingDown, 
        className: "bg-gradient-to-r from-emerald-500 to-green-500 text-white" 
      },
      "top-rated": { 
        label: "Top Rated", 
        icon: Star, 
        className: "bg-gradient-to-r from-blue-500 to-indigo-500 text-white" 
      },
    };

    const config = configs[tag];
    const Icon = config.icon;

    return (
      <Badge className={cn("gap-1 border-0", config.className)}>
        <Icon className="h-3 w-3" />
        {config.label}
      </Badge>
    );
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
          {PRODUCTS.map((product, index) => {
            const isInCart = addedToCart.includes(product.id);
            const isWishlisted = wishlist.includes(product.id);
            
            return (
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
                      
                      {/* Recommendation Tag */}
                      {product.tag && (
                        <div className="absolute top-4 left-4">
                          {getTagBadge(product.tag)}
                        </div>
                      )}
                      
                      {/* Badge (if no tag) */}
                      {!product.tag && product.badge && (
                        <Badge className="absolute top-4 left-4 bg-primary text-primary-foreground font-medium">
                          {product.badge}
                        </Badge>
                      )}
                      
                      {/* Wishlist Button */}
                      <motion.button
                        onClick={(e) => toggleWishlist(product.id, e)}
                        whileTap={{ scale: 0.9 }}
                        className={cn(
                          "absolute top-4 right-4 p-2.5 rounded-full backdrop-blur-sm border transition-all",
                          isWishlisted 
                            ? "bg-destructive/10 border-destructive/30" 
                            : "bg-background/80 border-border hover:bg-background"
                        )}
                      >
                        <Heart 
                          className={cn(
                            "h-5 w-5 transition-colors",
                            isWishlisted ? "fill-destructive text-destructive" : "text-muted-foreground"
                          )}
                        />
                      </motion.button>

                      {/* Quick Add - Shows on Hover */}
                      <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-background/95 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                        <AnimatePresence mode="wait">
                          {isInCart ? (
                            <motion.div
                              key="added"
                              initial={{ opacity: 0, scale: 0.9 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, scale: 0.9 }}
                              className="flex items-center justify-center gap-2 py-2 text-primary font-medium"
                            >
                              <Check className="h-5 w-5" />
                              Added to Cart
                            </motion.div>
                          ) : (
                            <motion.div
                              key="add"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                            >
                              <Button 
                                className="w-full" 
                                size="sm"
                                onClick={(e) => handleQuickAdd(product, e)}
                              >
                                <ShoppingCart className="h-4 w-4 mr-2" />
                                Quick Add
                              </Button>
                            </motion.div>
                          )}
                        </AnimatePresence>
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
                          <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
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

                      {/* Savings Highlight */}
                      {product.originalPrice > product.price && (
                        <p className="mt-2 text-sm text-green-600 font-medium flex items-center gap-1">
                          <TrendingDown className="h-3.5 w-3.5" />
                          Save {formatPrice(product.originalPrice - product.price)}
                        </p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Quick Decision CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-12 text-center"
        >
          <div className="inline-flex items-center gap-4 p-4 rounded-2xl bg-muted/50 border border-border">
            <div className="text-left">
              <p className="text-sm text-muted-foreground">Not sure what to pick?</p>
              <p className="font-medium text-foreground">Compare prices across 50+ local stores</p>
            </div>
            <Button onClick={() => navigate("/compare")} className="rounded-full">
              Compare Prices
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
