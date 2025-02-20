
import { Breadcrumbs } from "@/components/Breadcrumbs";

const PriceCompare = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumbs />
      <div className="space-y-4">
        <h1 className="text-3xl font-bold">Price Comparison</h1>
        <p className="text-gray-600">Compare prices across different retailers</p>
      </div>
    </div>
  );
};

export default PriceCompare;
