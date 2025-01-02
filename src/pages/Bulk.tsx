import { BulkPurchase } from "@/components/BulkPurchase";

const Bulk = () => {
  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-8">Bulk Purchase</h1>
      <div className="max-w-2xl mx-auto">
        <BulkPurchase 
          productId="iphone-15"
          basePrice={79999}
        />
      </div>
    </div>
  );
};

export default Bulk;