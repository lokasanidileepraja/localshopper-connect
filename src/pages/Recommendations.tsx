import { ProductRecommendations } from "@/components/ProductRecommendations";

const Recommendations = () => {
  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-8">Recommended Products</h1>
      <div className="max-w-7xl mx-auto">
        <ProductRecommendations currentProductId="iphone-15" />
      </div>
    </div>
  );
};

export default Recommendations;