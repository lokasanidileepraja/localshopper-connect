
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

const Category = () => {
  const { categoryName } = useParams();
  const { toast } = useToast();
  const navigate = useNavigate();
  const { addToCart, totalItems } = useCart();
  
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
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold capitalize">{categoryName}</h1>
        <Button onClick={handleCheckout} className="flex items-center gap-2">
          <ShoppingCart className="h-5 w-5" />
          View Cart {totalItems > 0 && `(${totalItems})`}
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categoryProducts.map((product) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="h-full flex flex-col hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-4 flex-1 flex flex-col">
                <div 
                  className="cursor-pointer"
                  onClick={() => handleProductClick(product.id)}
                >
                  <OptimizedImage
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover rounded-md mb-4 transition-transform hover:scale-105 duration-300"
                    width={400}
                    height={300}
                  />
                  <h3 className="font-semibold text-lg mb-2 hover:text-primary">{product.name}</h3>
                  <p className="text-gray-600 mb-2 flex-1">{product.description}</p>
                </div>
                <div className="space-y-4">
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

      {categoryProducts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-xl text-gray-600">No products found in this category.</p>
        </div>
      )}
    </div>
  );
};

export default Category;
