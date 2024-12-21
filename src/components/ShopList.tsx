import { ShopCard } from "./ShopCard";

const SAMPLE_SHOPS = [
  {
    name: "Electronics Hub",
    category: "Electronics",
    rating: 4.5,
    distance: "0.8 km",
    image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1",
    isOpen: true,
  },
  {
    name: "Fresh Mart",
    category: "Groceries",
    rating: 4.2,
    distance: "1.2 km",
    image: "https://images.unsplash.com/photo-1542838132-92c53300491e",
    isOpen: true,
  },
  {
    name: "City Pharmacy",
    category: "Pharmacy",
    rating: 4.7,
    distance: "0.5 km",
    image: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88",
    isOpen: false,
  },
];

export const ShopList = () => {
  return (
    <section className="py-12">
      <div className="container">
        <h2 className="mb-8 text-3xl font-bold">Nearby Shops</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SAMPLE_SHOPS.map((shop) => (
            <ShopCard key={shop.name} {...shop} />
          ))}
        </div>
      </div>
    </section>
  );
};