import { Link } from "react-router-dom";

export const CategoryNav = () => {
  return (
    <div className="relative mt-2">
      <div className="flex items-center gap-6 overflow-x-auto pb-2 scrollbar-hide -mx-4 px-4">
        {[
          ["Home", "/"],
          ["Electronics", "/category/electronics"],
          ["Mobiles", "/category/mobiles"],
          ["Laptops", "/category/laptops"],
          ["Accessories", "/category/accessories"],
          ["Audio", "/category/audio"],
          ["Gaming", "/category/gaming"],
          ["Wearables", "/category/wearables"]
        ].map(([name, path]) => (
          <Link
            key={path}
            to={path}
            className="text-sm text-neutral hover:text-primary whitespace-nowrap transition-colors duration-300"
          >
            {name}
          </Link>
        ))}
      </div>
      <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-background to-transparent pointer-events-none" />
    </div>
  );
};