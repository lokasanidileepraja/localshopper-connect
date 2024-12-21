import { ShopCard } from "./ShopCard";

const ELECTRONICS_SHOPS = [
  {
    name: "TechHub Electronics",
    category: "Electronics Store",
    rating: 4.5,
    distance: "0.8 km",
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
    isOpen: true,
  },
  {
    name: "Digital World",
    category: "Electronics Store",
    rating: 4.7,
    distance: "1.2 km",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
    isOpen: true,
  },
  {
    name: "Gadget Galaxy",
    category: "Electronics Store",
    rating: 4.3,
    distance: "0.5 km",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475",
    isOpen: false,
  },
];

export const ShopList = () => {
  return (
    <section className="py-12">
      <div className="container">
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