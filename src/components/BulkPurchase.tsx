interface BulkPurchaseProps {
  productId: string;
  basePrice: number;
}

export const BulkPurchase = ({ productId, basePrice }: BulkPurchaseProps) => {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Bulk Purchase</h2>
      <div className="space-y-2">
        <p className="text-sm text-gray-600">
          Get discounts on bulk purchases
        </p>
        <button className="w-full py-2 px-4 bg-primary text-white rounded hover:bg-primary/90">
          Request Bulk Quote
        </button>
      </div>
    </div>
  );
};