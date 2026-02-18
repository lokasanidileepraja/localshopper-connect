import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Star, ArrowRight, Heart, TrendingDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { OptimizedImage } from "@/components/ui/optimized-image";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

const PRODUCTS = [
  { id: "1", name: "iPhone 15 Pro", price: 134900, originalPrice: 149900, rating: 4.9, reviews: 2847, image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158", badge: "New", category: "Smartphones" },
  { id: "2", name: "MacBook Air M3", price: 114900, originalPrice: 124900, rating: 4.8, reviews: 1923, image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d", badge: "Best Seller", category: "Laptops" },
  { id: "3", name: "AirPods Pro 2", price: 24999, originalPrice: 26999, rating: 4.7, reviews: 5621, image: "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434", badge: "Popular", category: "Audio" },
  { id: "4", name: "Apple Watch Ultra 2", price: 89900, originalPrice: 99900, rating: 4.8, reviews: 1247, image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30", badge: null, category: "Wearables" },
  { id: "5", name: "Sony WH-1000XM5", price: 29990, originalPrice: 34990, rating: 4.9, reviews: 3892, image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e", badge: "Top Rated", category: "Audio" },
  { id: "6", name: "iPad Pro M2", price: 89900, originalPrice: 99900, rating: 4.8, reviews: 2156, image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0", badge: null, category: "Tablets" },
];

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
    setWishlist(prev => prev.includes(productId) ? prev.filter(id => id !== productId) : [...prev, productId]);
    toast({ title: wishlist.includes(productId) ? "Removed" : "Added to Wishlist" });
  };

  const handleQuickAdd = (product: typeof PRODUCTS[0], e: React.MouseEvent) => {
    e.stopPropagation();
    setAddedToCart(prev => [...prev, product.id]);
    toast({ title: "Added to Cart", description: product.name });
    setTimeout(() => setAddedToCart(prev => prev.filter(id => id !== product.id)), 2000);
  };

  const formatPrice = (price: number) => `₹${(price / 100).toLocaleString('en-IN')}`;
  const getDiscount = (price: number, orig: number) => Math.round(((orig - price) / orig) * 100);

  return (
    <section className="px-4 py-5">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-base font-bold text-foreground">Featured</h2>
        <button onClick={() => navigate("/products")} className="text-xs font-medium text-primary flex items-center gap-0.5">
          See all <ArrowRight className="h-3 w-3" />
        </button>
      </div>

      {/* Horizontal product scroll */}
      <div className="flex gap-3 overflow-x-auto scrollbar-hide -mx-4 px-4 pb-2">
        {PRODUCTS.map((product) => {
          const isWishlisted = wishlist.includes(product.id);
          const isInCart = addedToCart.includes(product.id);
          
          return (
            <motion.div
              key={product.id}
              className="shrink-0 w-40"
              whileTap={{ scale: 0.97 }}
              onClick={() => onProductClick(product.id)}
            >
              {/* Image */}
              <div className="relative aspect-square rounded-xl overflow-hidden bg-muted/50 mb-2">
                <OptimizedImage src={product.image} alt={product.name} className="w-full h-full object-cover" width={200} height={200} />
                
                {product.badge && (
                  <Badge className="absolute top-2 left-2 text-[9px] px-1.5 py-0.5 bg-primary text-primary-foreground border-0">
                    {product.badge}
                  </Badge>
                )}

                <button
                  onClick={(e) => toggleWishlist(product.id, e)}
                  className={cn(
                    "absolute top-2 right-2 p-1.5 rounded-full bg-background/80 backdrop-blur-sm",
                    isWishlisted && "bg-destructive/10"
                  )}
                >
                  <Heart className={cn("h-3.5 w-3.5", isWishlisted ? "fill-destructive text-destructive" : "text-muted-foreground")} />
                </button>

                {/* Quick add button at bottom */}
                <button
                  onClick={(e) => handleQuickAdd(product, e)}
                  className="absolute bottom-2 right-2 p-1.5 rounded-full bg-primary text-primary-foreground shadow-md active:scale-90 transition-transform"
                >
                  {isInCart ? <TrendingDown className="h-3.5 w-3.5" /> : <ShoppingCart className="h-3.5 w-3.5" />}
                </button>
              </div>

              {/* Info */}
              <h3 className="text-xs font-semibold text-foreground line-clamp-1 mb-0.5">{product.name}</h3>
              <div className="flex items-center gap-1 mb-1">
                <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                <span className="text-[10px] text-muted-foreground">{product.rating} ({product.reviews > 999 ? `${(product.reviews/1000).toFixed(1)}k` : product.reviews})</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-sm font-bold text-foreground">{formatPrice(product.price)}</span>
                {product.originalPrice > product.price && (
                  <span className="text-[10px] text-green-600 font-medium">-{getDiscount(product.price, product.originalPrice)}%</span>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};
