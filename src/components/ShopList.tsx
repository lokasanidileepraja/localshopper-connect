import { useState } from "react";
import { ShopCard } from "./ShopCard";
import { PriceComparison } from "./PriceComparison";
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

export const ShopList = () => {
  const [selectedModel, setSelectedModel] = useState<string | null>(null);

  const handleCompare = (model: string) => {
    setSelectedModel(model === selectedModel ? null : model);
  };

  const availableModels = Array.from(
    new Set(
      ELECTRONICS_SHOPS.flatMap((shop) =>
        shop.products
          .filter((product) => product.category === "mobile")
          .map((product) => product.model)
      )
    )
  );

  return (
    <section className="py-12">
      <div className="container">
        <div className="mb-8">
          <h2 className="mb-4 text-3xl font-bold">Compare Mobile Prices</h2>
          <PriceComparison
            shops={ELECTRONICS_SHOPS}
            models={availableModels}
            selectedModel={selectedModel}
            onModelSelect={handleCompare}
          />
        </div>
        <h2 className="mb-8 text-3xl font-bold">Nearby Electronics Shops</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {ELECTRONICS_SHOPS.map((shop) => (
            <ShopCard key={shop.name} {...shop} />
          ))}
        </div>
      </div>
    </section>
  );
};