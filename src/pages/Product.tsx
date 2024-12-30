import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { ProductReviews } from "@/components/ProductReviews";
import { ProductRecommendations } from "@/components/ProductRecommendations";
import { ProductAlerts } from "@/components/ProductAlerts";
import { BulkPurchase } from "@/components/BulkPurchase";

const Product = () => {
  const { productId } = useParams();

  const { data: product, isLoading } = useQuery({
    queryKey: ["product", productId],
    queryFn: async () => {
      // Simulated API call
      return Promise.resolve({
        id: productId,
        name: "iPhone 15",
        price: 79999,
        inStock: true,
        image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
      });
    },
  });

  if (isLoading) return <LoadingSpinner />;
  if (!product) return <div>Product not found</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid gap-8 lg:grid-cols-2">
        <div>
          <img
            src={product.image}
            alt={product.name}
            className="w-full rounded-lg object-cover"
          />
        </div>
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <p className="mt-2 text-2xl font-semibold text-primary">
              ₹{product.price.toLocaleString()}
            </p>
          </div>

          <ProductAlerts
            productId={product.id}
            inStock={product.inStock}
            currentPrice={product.price}
          />

          <BulkPurchase productId={product.id} basePrice={product.price} />
        </div>
      </div>

      <div className="mt-12 space-y-12">
        <ProductReviews productId={product.id} />
        <ProductRecommendations currentProductId={product.id} />
      </div>
    </div>
  );
};

export default Product;