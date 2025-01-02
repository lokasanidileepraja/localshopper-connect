import { Shop } from "@/types/shop";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { MapPin, Clock } from "lucide-react";

interface ShopComparisonProps {
  currentShop: string;
  price: number;
  otherShops: Shop[];
  productModel: string;
  onShopSelect: (shopName: string, price: number) => void;
}

export const ShopComparison = ({
  currentShop,
  price,
  otherShops,
  productModel,
  onShopSelect,
}: ShopComparisonProps) => {
  const { toast } = useToast();
  if (!otherShops) return null;

  const handleDirections = (shopName: string) => {
    toast({
      title: "Opening Maps",
      description: `Getting directions to ${shopName}`,
    });
  };

  return (
    <div className="space-y-4">
      <h4 className="text-sm font-semibold">Compare with other shops</h4>
      <div className="space-y-2">
        {otherShops.map((shop) => {
          const matchingProduct = shop.products.find(
            (p) => p.model === productModel
          );
          if (!matchingProduct) return null;

          const priceDifference = matchingProduct.price - price;
          const priceDifferenceText = priceDifference > 0 
            ? `₹${Math.abs(priceDifference).toLocaleString()} more expensive`
            : `₹${Math.abs(priceDifference).toLocaleString()} cheaper`;

          return (
            <div
              key={shop.name}
              className="flex flex-col gap-2 p-4 rounded-lg border hover:border-primary transition-colors"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">{shop.name}</h3>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <MapPin className="h-4 w-4" />
                    <span>{shop.distance}</span>
                    <Clock className="h-4 w-4 ml-2" />
                    <span>{shop.isOpen ? "Open" : "Closed"}</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-lg text-primary">
                    ₹{matchingProduct.price.toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-600">{priceDifferenceText}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="default"
                  className="flex-1"
                  onClick={() => onShopSelect(shop.name, matchingProduct.price)}
                >
                  Select Store
                </Button>
                <Button
                  variant="outline"
                  onClick={() => handleDirections(shop.name)}
                >
                  Get Directions
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};