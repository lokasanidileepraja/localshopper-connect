interface ProductAlertsProps {
  productId: string;
  inStock: boolean;
  currentPrice: number;
}

export const ProductAlerts = ({
  productId,
  inStock,
  currentPrice,
}: ProductAlertsProps) => {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Product Alerts</h2>
      <div className="space-y-2">
        {!inStock && (
          <button className="w-full py-2 px-4 bg-primary text-white rounded hover:bg-primary/90">
            Notify When Available
          </button>
        )}
        <button className="w-full py-2 px-4 border border-primary text-primary rounded hover:bg-primary/10">
          Set Price Alert
        </button>
      </div>
    </div>
  );
};