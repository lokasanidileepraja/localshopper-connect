
import { useParams } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { FeaturedProducts } from "@/components/FeaturedProducts";
import { useNavigate } from "react-router-dom";
import { Breadcrumbs } from "@/components/Breadcrumbs";

const Brand = () => {
  const { brandName } = useParams();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleProductClick = (productId: string) => {
    navigate(`/product/${productId}`);
    toast({
      title: "Loading Product",
      description: "Getting product details...",
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumbs />
      <h1 className="text-3xl font-bold mb-8 capitalize">{brandName} Products</h1>
      <FeaturedProducts onProductClick={handleProductClick} />
    </div>
  );
};

export default Brand;
