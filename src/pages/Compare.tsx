import { ShopComparison } from "@/components/ShopComparison";
import { PriceComparison } from "@/components/PriceComparison";
import { ELECTRONICS_SHOPS } from "@/data/shops";

const Compare = () => {
  const shopComparisonProps = {
    currentShop: "TechHub Electronics",
    price: 79999,
    otherShops: ELECTRONICS_SHOPS.filter(shop => shop.name !== "TechHub Electronics"),
    productModel: "iPhone 15",
    onShopSelect: (shopName: string, price: number) => {
      console.log(`Selected shop: ${shopName} with price: ${price}`);
    }
  };

  const priceComparisonProps = {
    shops: ELECTRONICS_SHOPS,
    models: ["iPhone 15", "Galaxy S23", "MacBook Air M2", "AirPods Pro 2nd Gen"],
    selectedModel: "iPhone 15",
    onModelSelect: (model: string) => {
      console.log(`Selected model: ${model}`);
    }
  };

  return (
    <div className="container py-8 space-y-12">
      <h1 className="text-3xl font-bold mb-8">Compare Products & Shops</h1>
      <div className="space-y-12">
        <section>
          <h2 className="text-2xl font-bold mb-6">Compare Shops</h2>
          <ShopComparison {...shopComparisonProps} />
        </section>
        
        <section>
          <h2 className="text-2xl font-bold mb-6">Compare Prices</h2>
          <PriceComparison {...priceComparisonProps} />
        </section>
      </div>
    </div>
  );
};

export default Compare;