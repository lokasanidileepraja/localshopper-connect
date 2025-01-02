import { ShopComparison } from "@/components/ShopComparison";
import { PriceComparison } from "@/components/PriceComparison";
import { Shop } from "@/types/shop";

const Compare = () => {
  const shopComparisonProps = {
    shops: [] as Shop[],
    onCompare: (shopIds: string[]) => {
      console.log("Comparing shops:", shopIds);
    },
  };

  const priceComparisonProps = {
    shops: [] as Shop[],
    models: ["iPhone 15", "Samsung Galaxy S23", "Google Pixel 8"],
    selectedModel: null,
    onModelSelect: (model: string) => {
      console.log("Selected model:", model);
    },
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