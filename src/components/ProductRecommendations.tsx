import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ELECTRONICS_SHOPS } from "@/data/shops";
import { Product } from "@/types/shop";

interface ProductRecommendationsProps {
  currentProductId: string;
}

export const ProductRecommendations = ({
  currentProductId,
}: ProductRecommendationsProps) => {
  const navigate = useNavigate();

  // Get all products from all shops
  const allProducts = ELECTRONICS_SHOPS.flatMap((shop) => shop.products);
  
  // Find current product
  const currentProduct = allProducts.find((p) => p.id === currentProductId);
  
  if (!currentProduct) return null;

  // Get recommendations based on same category and similar price range
  const recommendations = allProducts
    .filter((product) => {
      const priceDiff = Math.abs(product.price - currentProduct.price);
      const priceRange = currentProduct.price * 0.3; // 30% price range
      return (
        product.id !== currentProductId &&
        product.category === currentProduct.category &&
        priceDiff <= priceRange
      );
    })
    .slice(0, 3); // Limit to 3 recommendations

  if (recommendations.length === 0) return null;

  const handleProductClick = (productId: string) => {
    navigate(`/product/${productId}`);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Recommended Products</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {recommendations.map((product) => (
          <div
            key={product.id}
            className="p-4 border rounded-lg hover:border-primary transition-colors"
          >
            {product.image && (
              <div className="aspect-square mb-4 overflow-hidden rounded-lg">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <h3 className="font-medium mb-2">{product.name}</h3>
            <p className="text-lg font-bold text-primary mb-4">
              ₹{product.price.toLocaleString()}
            </p>
            <Button
              onClick={() => handleProductClick(product.id)}
              className="w-full"
            >
              View Details
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};