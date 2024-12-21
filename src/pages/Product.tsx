import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Shop } from "@/types/shop";

const ELECTRONICS_SHOPS: Shop[] = [
  {
    name: "TechHub Electronics",
    category: "Electronics Store",
    rating: 4.5,
    distance: "0.8 km",
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
    isOpen: true,
    products: [
      {
        id: "1",
        name: "iPhone 15",
        category: "mobile",
        price: 79999,
        brand: "Apple",
        model: "iPhone 15",
        inStock: true,
        image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158"
      },
      {
        id: "2",
        name: "MacBook Air M2",
        category: "laptop",
        price: 114900,
        brand: "Apple",
        model: "MacBook Air M2",
        inStock: true,
        image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d"
      }
    ]
  },
  {
    name: "Digital World",
    category: "Electronics Store",
    rating: 4.7,
    distance: "1.2 km",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
    isOpen: true,
    products: [
      {
        id: "3",
        name: "iPhone 15",
        category: "mobile",
        price: 78999,
        brand: "Apple",
        model: "iPhone 15",
        inStock: true,
        image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158"
      },
      {
        id: "4",
        name: "Samsung Galaxy S23",
        category: "mobile",
        price: 74999,
        brand: "Samsung",
        model: "Galaxy S23",
        inStock: true
      }
    ]
  },
  {
    name: "Gadget Galaxy",
    category: "Electronics Store",
    rating: 4.3,
    distance: "0.5 km",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475",
    isOpen: false,
    products: [
      {
        id: "5",
        name: "iPhone 15",
        category: "mobile",
        price: 81999,
        brand: "Apple",
        model: "iPhone 15",
        inStock: false,
        image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158"
      },
      {
        id: "6",
        name: "AirPods Pro",
        category: "accessory",
        price: 24999,
        brand: "Apple",
        model: "AirPods Pro 2nd Gen",
        inStock: true
      }
    ]
  }
];

const ProductPage = () => {
  const { productId } = useParams();
  const navigate = useNavigate();

  const product = ELECTRONICS_SHOPS.flatMap((shop) => shop.products).find(
    (p) => p.id === productId
  );

  if (!product) {
    return <div>Product not found</div>;
  }

  const shopsWithProduct = ELECTRONICS_SHOPS.filter((shop) =>
    shop.products.some((p) => p.model === product.model)
  );

  return (
    <div className="container py-8">
      <Button
        variant="ghost"
        className="mb-4"
        onClick={() => navigate(-1)}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back
      </Button>
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          {product.image && (
            <img
              src={product.image}
              alt={product.name}
              className="w-full rounded-lg"
            />
          )}
        </div>
        <div>
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <p className="text-lg text-gray-600 mt-2">{product.brand}</p>
          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-4">Available at:</h2>
            <div className="space-y-4">
              {shopsWithProduct.map((shop) => {
                const shopProduct = shop.products.find(
                  (p) => p.model === product.model
                );
                return (
                  <div
                    key={shop.name}
                    className="flex items-center justify-between border-b pb-4"
                  >
                    <div>
                      <h3 className="font-medium">{shop.name}</h3>
                      <p className="text-sm text-gray-600">{shop.distance}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">
                        ₹{shopProduct?.price.toLocaleString()}
                      </p>
                      <p
                        className={`text-sm ${
                          shopProduct?.inStock
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {shopProduct?.inStock ? "In Stock" : "Out of Stock"}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
