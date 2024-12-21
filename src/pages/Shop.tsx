import { useParams, useNavigate } from "react-router-dom";
import { Shop } from "@/types/shop";
import { ShopCard } from "@/components/ShopCard";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ShoppingCart } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/components/ui/use-toast";

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

const ShopPage = () => {
  const { shopName } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { toast } = useToast();
  
  const shop = ELECTRONICS_SHOPS.find(
    (s) => s.name.toLowerCase() === shopName?.toLowerCase()
  );

  if (!shop) {
    return <div>Shop not found</div>;
  }

  const handleAddToCart = (productId: string) => {
    const product = shop.products.find((p) => p.id === productId);
    if (product) {
      addToCart(product, shop.name);
      toast({
        title: "Added to cart",
        description: `${product.name} has been added to your cart.`,
      });
    }
  };

  return (
    <div className="container py-8">
      <div className="flex justify-between items-center mb-4">
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <Button
          variant="outline"
          onClick={() => navigate("/cart")}
        >
          <ShoppingCart className="mr-2 h-4 w-4" />
          View Cart
        </Button>
      </div>
      <ShopCard {...shop} />
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">All Products</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {shop.products.map((product) => (
            <div
              key={product.id}
              className="rounded-lg border p-4 hover:shadow-lg transition-shadow"
            >
              {product.image && (
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover rounded-md mb-4"
                />
              )}
              <h3 className="font-semibold">{product.name}</h3>
              <p className="text-sm text-gray-600">{product.brand}</p>
              <p className="mt-2 font-bold">₹{product.price.toLocaleString()}</p>
              <p className="text-sm mt-1">
                Status:{" "}
                <span
                  className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${
                    product.inStock
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {product.inStock ? "In Stock" : "Out of Stock"}
                </span>
              </p>
              <Button
                className="w-full mt-4"
                onClick={() => handleAddToCart(product.id)}
                disabled={!product.inStock}
              >
                Add to Cart
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShopPage;