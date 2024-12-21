import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
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

const CartPage = () => {
  const { items, removeFromCart } = useCart();
  const navigate = useNavigate();

  if (items.length === 0) {
    return (
      <div className="container py-8">
        <Button variant="ghost" className="mb-4" onClick={() => navigate(-1)}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <div className="text-center py-8">
          <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
          <p className="text-gray-600">Start shopping to add items to your cart</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-8">
      <Button variant="ghost" className="mb-4" onClick={() => navigate(-1)}>
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back
      </Button>
      <h1 className="text-2xl font-bold mb-6">Shopping Cart</h1>
      <div className="space-y-6">
        {items.map((item) => {
          const otherShops = ELECTRONICS_SHOPS.filter(
            (shop) =>
              shop.name !== item.shopName &&
              shop.products.some((p) => p.model === item.model)
          );

          return (
            <div
              key={item.id}
              className="border rounded-lg p-4 space-y-4"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold">{item.name}</h3>
                  <p className="text-sm text-gray-600">from {item.shopName}</p>
                  <p className="font-bold mt-1">₹{item.price.toLocaleString()}</p>
                </div>
                <Button
                  variant="outline"
                  onClick={() => removeFromCart(item.id)}
                >
                  Remove
                </Button>
              </div>
              {otherShops.length > 0 && (
                <div>
                  <h4 className="font-medium text-sm mb-2">
                    Also available at:
                  </h4>
                  <div className="space-y-2">
                    {otherShops.map((shop) => {
                      const product = shop.products.find(
                        (p) => p.model === item.model
                      );
                      if (!product) return null;
                      return (
                        <div
                          key={shop.name}
                          className="flex items-center justify-between text-sm"
                        >
                          <span>{shop.name}</span>
                          <span
                            className={
                              product.price < item.price
                                ? "text-green-600 font-medium"
                                : ""
                            }
                          >
                            ₹{product.price.toLocaleString()}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CartPage;
