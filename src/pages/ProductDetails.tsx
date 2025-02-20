
import { useParams } from "react-router-dom";
import { Breadcrumbs } from "@/components/Breadcrumbs";

const ProductDetails = () => {
  const { productId } = useParams();

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumbs />
      <div className="grid gap-8 md:grid-cols-2">
        <div className="space-y-4">
          <h1 className="text-3xl font-bold">Product Details</h1>
          <p className="text-gray-600">Product ID: {productId}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
