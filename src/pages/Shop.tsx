import { useParams } from "react-router-dom";
import { ELECTRONICS_SHOPS } from "@/data/shops";
import { ShopCard } from "@/components/ShopCard";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { useQuery } from "@tanstack/react-query";

const Shop = () => {
  const { shopId } = useParams();

  const { data: shop, isLoading } = useQuery({
    queryKey: ["shop", shopId],
    queryFn: () => {
      const foundShop = ELECTRONICS_SHOPS.find(s => s.id === shopId);
      if (!foundShop) throw new Error("Shop not found");
      return foundShop;
    }
  });

  if (isLoading) return <LoadingSpinner />;
  if (!shop) return <div>Shop not found</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <ShopCard {...shop} />
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Available Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {shop.products.map((product) => (
            <div key={product.id} className="border rounded-lg p-4">
              <img src={product.image} alt={product.name} className="w-full h-48 object-cover rounded-lg mb-4" />
              <h3 className="font-semibold mb-2">{product.name}</h3>
              <p className="text-gray-600 mb-2">{product.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold">₹{product.price.toLocaleString()}</span>
                <span className={`text-sm ${product.inStock ? 'text-green-600' : 'text-red-600'}`}>
                  {product.inStock ? 'In Stock' : 'Out of Stock'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Shop;