import { ShopComparison } from "@/components/ShopComparison";
import { PriceComparison } from "@/components/PriceComparison";
import { Shop } from "@/types/shop";
import { useQuery } from "@tanstack/react-query";
import { ELECTRONICS_SHOPS } from "@/data/shops";

const Compare = () => {
  const { data: shops } = useQuery({
    queryKey: ["shops"],
    queryFn: () => Promise.resolve(ELECTRONICS_SHOPS),
  });

  const handleShopSelect = (shopName: string, price: number) => {
    console.log("Selected shop:", shopName, "with price:", price);
  };

  return (
    <div className="container py-8 space-y-12">
      <h1 className="text-3xl font-bold mb-8">Compare Products & Shops</h1>
      <div className="space-y-12">
        <section>
          <h2 className="text-2xl font-bold mb-6">Compare Shops</h2>
          <ShopComparison
            currentShop="TechHub Electronics"
            price={79999}
            otherShops={shops || []}
            productModel="iPhone 15"
            onShopSelect={handleShopSelect}
          />
        </section>
        
        <section>
          <h2 className="text-2xl font-bold mb-6">Compare Prices</h2>
          <PriceComparison
            shops={shops || []}
            models={["iPhone 15", "Samsung Galaxy S23", "Google Pixel 8"]}
            selectedModel={null}
            onModelSelect={(model: string) => {
              console.log("Selected model:", model);
            }}
          />
        </section>
      </div>
    </div>
  );
};

export default Compare;