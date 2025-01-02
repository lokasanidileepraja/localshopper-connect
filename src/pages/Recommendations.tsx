import { ProductRecommendations } from "@/components/ProductRecommendations";

const Recommendations = () => {
  const productRecommendationsProps = {
    currentProductId: "1"
  };

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-8">Recommended Products</h1>
      <ProductRecommendations {...productRecommendationsProps} />
    </div>
  );
};

export default Recommendations;