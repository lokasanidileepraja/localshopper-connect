import { Shop } from "@/types/shop";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Clock, ShoppingBag } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface PriceComparisonProps {
  shops: Shop[];
  models: string[];
  selectedModel: string | null;
  onModelSelect: (model: string) => void;
}

export const PriceComparison = ({
  shops,
  models,
  selectedModel,
  onModelSelect,
}: PriceComparisonProps) => {
  const navigate = useNavigate();

  const handleVisitShop = (shopName: string) => {
    navigate(`/shop/${encodeURIComponent(shopName)}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        {models.map((model) => (
          <button
            key={model}
            onClick={() => onModelSelect(model)}
            className={`px-4 py-2 rounded-full border transition-colors ${
              selectedModel === model
                ? "bg-primary text-white border-primary"
                : "border-gray-300 hover:border-primary"
            }`}
          >
            {model}
          </button>
        ))}
      </div>
      {selectedModel && (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {shops.map((shop) => {
            const product = shop.products.find((p) => p.model === selectedModel);
            if (!product) return null;

            return (
              <div
                key={shop.name}
                className="flex flex-col gap-4 p-6 border rounded-lg hover:border-primary transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-lg">{shop.name}</h3>
                    <Badge variant={shop.isOpen ? "default" : "secondary"}>
                      {shop.isOpen ? "Open" : "Closed"}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <MapPin className="h-4 w-4" />
                    <span>{shop.distance}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ShoppingBag className="h-4 w-4 text-gray-600" />
                    <span className="text-sm text-gray-600">
                      {product.inStock ? "In Stock" : "Out of Stock"}
                    </span>
                  </div>
                  <p className="text-xl font-bold text-primary">
                    ₹{product.price.toLocaleString()}
                  </p>
                </div>
                <Button
                  className="w-full"
                  onClick={() => handleVisitShop(shop.name)}
                >
                  Visit Store
                </Button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};