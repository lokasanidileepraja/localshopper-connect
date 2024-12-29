import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { CartList } from "@/components/cart/CartList";
import { CartSummary } from "@/components/cart/CartSummary";
import { useToast } from "@/components/ui/use-toast";

// Keep the ELECTRONICS_SHOPS data constant but fix the category types
const ELECTRONICS_SHOPS = [
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
        category: "mobile" as const,
        price: 79999,
        brand: "Apple",
        model: "iPhone 15",
        inStock: true,
        image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158"
      },
      {
        id: "2",
        name: "MacBook Air M2",
        category: "laptop" as const,
        price: 114900,
        brand: "Apple",
        model: "MacBook Air M2",
        inStock: true,
        image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d"
      },
      {
        id: "7",
        name: "Samsung Galaxy S23",
        category: "mobile" as const,
        price: 75999,
        brand: "Samsung",
        model: "Galaxy S23",
        inStock: true,
        image: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c"
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
        category: "mobile" as const,
        price: 78999,
        brand: "Apple",
        model: "iPhone 15",
        inStock: true,
        image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158"
      },
      {
        id: "4",
        name: "Samsung Galaxy S23",
        category: "mobile" as const,
        price: 74999,
        brand: "Samsung",
        model: "Galaxy S23",
        inStock: true,
        image: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c"
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
        category: "mobile" as const,
        price: 81999,
        brand: "Apple",
        model: "iPhone 15",
        inStock: false,
        image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158"
      },
      {
        id: "6",
        name: "AirPods Pro",
        category: "accessory" as const,
        price: 24999,
        brand: "Apple",
        model: "AirPods Pro 2nd Gen",
        inStock: true,
        image: "https://images.unsplash.com/photo-1588423771073-b8903fbb85b5"
      }
    ]
  },
  {
    name: "ElectroMart",
    category: "Electronics Store",
    rating: 4.6,
    distance: "1.5 km",
    image: "https://images.unsplash.com/photo-1478860409698-8707f313ee8b",
    isOpen: true,
    products: [
      {
        id: "8",
        name: "iPhone 15",
        category: "mobile" as const,
        price: 77999,
        brand: "Apple",
        model: "iPhone 15",
        inStock: true,
        image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158"
      },
      {
        id: "9",
        name: "Samsung Galaxy S23",
        category: "mobile" as const,
        price: 73999,
        brand: "Samsung",
        model: "Galaxy S23",
        inStock: true,
        image: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c"
      },
      {
        id: "10",
        name: "AirPods Pro",
        category: "accessory" as const,
        price: 23999,
        brand: "Apple",
        model: "AirPods Pro 2nd Gen",
        inStock: true,
        image: "https://images.unsplash.com/photo-1588423771073-b8903fbb85b5"
      }
    ]
  },
  {
    name: "Smart Electronics",
    category: "Electronics Store",
    rating: 4.4,
    distance: "2.0 km",
    image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1",
    isOpen: true,
    products: [
      {
        id: "11",
        name: "iPhone 15",
        category: "mobile" as const,
        price: 80999,
        brand: "Apple",
        model: "iPhone 15",
        inStock: true,
        image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158"
      },
      {
        id: "12",
        name: "Samsung Galaxy S23",
        category: "mobile" as const,
        price: 76999,
        brand: "Samsung",
        model: "Galaxy S23",
        inStock: true,
        image: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c"
      }
    ]
  }
];

const CartPage = () => {
  const { items, removeFromCart } = useCart();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleCheckout = () => {
    toast({
      title: "Proceeding to checkout",
      description: "This feature will be implemented soon.",
    });
  };

  return (
    <div className="container py-8">
      <Button variant="ghost" className="mb-4" onClick={() => navigate(-1)}>
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back
      </Button>
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1">
          <h1 className="text-2xl font-bold mb-6">Shopping Cart</h1>
          <CartList
            items={items}
            shops={ELECTRONICS_SHOPS}
            onRemove={removeFromCart}
          />
        </div>
        {items.length > 0 && (
          <div className="lg:w-80">
            <CartSummary items={items} onCheckout={handleCheckout} />
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
