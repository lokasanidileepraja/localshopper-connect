
import { useParams, useNavigate } from "react-router-dom";
import { products } from "@/data/products";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { motion } from "framer-motion";
import { useEffect, useCallback } from "react";
import { useCart } from "@/contexts/CartContext";
import { ShoppingCart, ExternalLink } from "lucide-react";
import { OptimizedImage } from "@/components/ui/optimized-image";
import { useIsMobile } from "@/hooks/use-mobile";
import { WishlistButton } from "@/components/WishlistButton";

const Category = () => {
  const { categoryName } = useParams();
  const { toast } = useToast();
  const navigate = useNavigate();
  const { addToCart, totalItems } = useCart();
  const isMobile = useIsMobile();
  
  useEffect(() => {
    if (categoryName) {
      const categoryProducts = products[categoryName.toLowerCase()] || [];
      if (categoryProducts.length === 0) {
        toast({
          title: "Category Empty",
          description: "No products found in this category",
          variant: "destructive",
        });
      }
    }
  }, [categoryName, toast]);

  if (!categoryName) {
    return <LoadingSpinner />;
  }

  const categoryProducts = products[categoryName.toLowerCase()] || [];

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

  const handleCheckout = useCallback(() => {
    navigate("/cart");
  }, [navigate]);

  return (
    <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-0 mb-4 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold capitalize">{categoryName}</h1>
        <Button onClick={handleCheckout} className="flex items-center gap-2" size={isMobile ? "sm" : "default"}>
          <ShoppingCart className="h-5 w-5" />
          {isMobile ? `Cart${totalItems > 0 ? ` (${totalItems})` : ''}` : `View Cart ${totalItems > 0 ? `(${totalItems})` : ''}`}
        </Button>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
        {categoryProducts.map((product) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="h-full flex flex-col hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-3 sm:p-4 flex-1 flex flex-col">
                <div 
                  className="cursor-pointer"
                  onClick={() => handleProductClick(product.id)}
                >
                  <OptimizedImage
                    src={product.image}
                    alt={product.name}
                    className="w-full h-36 sm:h-48 object-cover rounded-md mb-3 sm:mb-4 transition-transform hover:scale-105 duration-300"
                    width={400}
                    height={300}
                  />
                  <h3 className="font-semibold text-base sm:text-lg mb-1 sm:mb-2 hover:text-primary line-clamp-2">{product.name}</h3>
                  <p className="text-sm text-gray-600 mb-2 flex-1 line-clamp-2">{product.description}</p>
                </div>
                <div className="space-y-3 sm:space-y-4 mt-auto">
                  <div className="flex justify-between items-center">
                    <p className="text-xl sm:text-2xl font-bold text-primary">
                      ₹{product.price.toLocaleString()}
                    </p>
                    <WishlistButton productId={product.id} />
                  </div>
                  <div className="flex justify-between items-center">
                    <span className={`text-xs sm:text-sm ${product.inStock ? 'text-green-600' : 'text-red-600'}`}>
                      {product.inStock ? 'In Stock' : 'Out of Stock'}
                    </span>
                    <div className="flex gap-1 sm:gap-2">
                      <Button 
                        variant="outline"
                        onClick={() => handleProductClick(product.id)}
                        className="px-2 sm:px-3 h-8 sm:h-10 text-xs sm:text-sm"
                        size={isMobile ? "sm" : "default"}
                      >
                        <ExternalLink className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                        {isMobile ? "" : "Details"}
                      </Button>
                      <Button 
                        onClick={() => handleAddToCart(product)}
                        disabled={!product.inStock}
                        className="px-2 sm:px-3 h-8 sm:h-10 text-xs sm:text-sm"
                        size={isMobile ? "sm" : "default"}
                      >
                        <ShoppingCart className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
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

      {categoryProducts.length === 0 && (
        <div className="text-center py-8 sm:py-12">
          <p className="text-lg sm:text-xl text-gray-600">No products found in this category.</p>
        </div>
      )}
    </div>
  );
};

export default Category;
