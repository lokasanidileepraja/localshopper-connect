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
  return (
    <div className="space-y-4">
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
        <div className="space-y-4">
          {shops.map((shop) => {
            const product = shop.products.find((p) => p.model === selectedModel);
            if (!product) return null;

            return (
              <div
                key={shop.name}
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                <div>
                  <h3 className="font-semibold">{shop.name}</h3>
                  <p className="text-sm text-gray-600">
                    {shop.distance} • {shop.isOpen ? "Open" : "Closed"}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-primary">
                    ₹{product.price.toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-600">
                    {product.inStock ? "In Stock" : "Out of Stock"}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};