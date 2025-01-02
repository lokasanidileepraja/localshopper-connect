import { BulkPurchase } from "@/components/BulkPurchase";

const Bulk = () => {
  const bulkPurchaseProps = {
    productId: "1",
    basePrice: 79999
  };

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-8">Bulk Purchase</h1>
      <BulkPurchase {...bulkPurchaseProps} />
    </div>
  );
};

export default Bulk;