interface ProductRecommendationsProps {
  currentProductId: string;
}

export const ProductRecommendations = ({
  currentProductId,
}: ProductRecommendationsProps) => {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Recommended Products</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="p-4 border rounded-lg">
          <p className="text-gray-600">Coming Soon</p>
        </div>
      </div>
    </div>
  );
};