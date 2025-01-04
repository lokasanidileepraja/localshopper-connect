import { useParams, useNavigate } from "react-router-dom";
import { products } from "@/data/products";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { useCart } from "@/contexts/CartContext";
import { ShoppingCart } from "lucide-react";

const Category = () => {
  const { categoryName } = useParams();
  const { toast } = useToast();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  
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

  const handleAddToCart = (product: any) => {
    addToCart(product, "Default Store");
    toast({
      title: "Added to Cart",
      description: `${product.name} has been added to your cart`,
    });
  };

  const handleCheckout = () => {
    navigate("/cart");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold capitalize">{categoryName}</h1>
        <Button onClick={handleCheckout} className="flex items-center gap-2">
          <ShoppingCart className="h-5 w-5" />
          View Cart
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
            <Card className="h-full flex flex-col">
              <CardContent className="p-4 flex-1 flex flex-col">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover rounded-md mb-4"
                />
                <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
                <p className="text-gray-600 mb-2 flex-1">{product.description}</p>
                <div className="space-y-4">
                  <p className="text-2xl font-bold text-primary">
                    ₹{product.price.toLocaleString()}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className={`text-sm ${product.inStock ? 'text-green-600' : 'text-red-600'}`}>
                      {product.inStock ? 'In Stock' : 'Out of Stock'}
                    </span>
                    <Button 
                      onClick={() => handleAddToCart(product)}
                      disabled={!product.inStock}
                      className="w-full mt-2"
                    >
                      Add to Cart
                    </Button>
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