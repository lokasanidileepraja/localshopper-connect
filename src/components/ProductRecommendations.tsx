import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { LoadingSpinner } from "./LoadingSpinner";

interface RecommendedProduct {
  id: string;
  name: string;
  price: number;
  image: string;
}

interface ProductRecommendationsProps {
  currentProductId: string;
}

export const ProductRecommendations = ({ currentProductId }: ProductRecommendationsProps) => {
  const navigate = useNavigate();

  const { data: recommendations, isLoading } = useQuery({
    queryKey: ["recommendations", currentProductId],
    queryFn: async () => {
      // Simulated API call
      return Promise.resolve([
        {
          id: "1",
          name: "iPhone 15",
          price: 79999,
          image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
        },
        {
          id: "2",
          name: "MacBook Air M2",
          price: 114900,
          image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
        },
      ] as RecommendedProduct[]);
    },
  });

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="space-y-4">
      <h3 className="text-2xl font-semibold">Recommended Products</h3>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {recommendations?.map((product) => (
          <Card key={product.id} className="overflow-hidden">
            <div className="aspect-square overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="h-full w-full object-cover transition-transform hover:scale-105"
              />
            </div>
            <CardContent className="p-4">
              <h4 className="mb-2 font-medium">{product.name}</h4>
              <div className="flex items-center justify-between">
                <span className="text-lg font-semibold">₹{product.price.toLocaleString()}</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigate(`/product/${product.id}`)}
                >
                  View
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};