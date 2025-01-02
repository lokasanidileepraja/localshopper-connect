import { Shop } from "@/types/shop";

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
  if (!otherShops) return null; // Add null check to prevent mapping over undefined

  return (
    <div className="space-y-4">
      <h4 className="text-sm font-semibold">Compare with other shops</h4>
      <div className="space-y-2">
        {otherShops.map((shop) => {
          const matchingProduct = shop.products.find(
            (p) => p.model === productModel
          );
          if (!matchingProduct) return null;

          return (
            <div
              key={shop.name}
              className="flex items-center justify-between p-2 rounded hover:bg-gray-50"
            >
              <div>
                <p className="font-medium">{shop.name}</p>
                <p className="text-sm text-gray-600">
                  {shop.distance} • {shop.isOpen ? "Open" : "Closed"}
                </p>
              </div>
              <button
                className="text-primary hover:underline"
                onClick={() => onShopSelect(shop.name, matchingProduct.price)}
              >
                ₹{matchingProduct.price.toLocaleString()}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};