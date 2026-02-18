import { Link, useLocation } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import { cn } from "@/lib/utils";

export const CategoryNav = () => {
  const location = useLocation();
  const scrollRef = useRef<HTMLDivElement>(null);

  const categories = [
    ["All", "/"],
    ["Mobiles", "/category/mobiles"],
    ["Laptops", "/category/laptops"],
    ["Audio", "/category/audio"],
    ["Gaming", "/category/gaming"],
    ["Wearables", "/category/wearables"],
    ["Accessories", "/category/accessories"],
    ["Stores", "/stores"],
  ];

  const isActive = (path: string) => {
    if (path === "/") return location.pathname === "/" || location.pathname === "/home";
    return location.pathname.startsWith(path);
  };

  return (
    <div
      ref={scrollRef}
      className="flex items-center gap-1.5 overflow-x-auto px-4 py-2 scrollbar-hide"
    >
      {categories.map(([name, path]) => (
        <Link
          key={path}
          to={path}
          className={cn(
            "px-3 py-1.5 text-xs font-medium whitespace-nowrap rounded-full transition-colors shrink-0",
            isActive(path)
              ? "bg-primary text-primary-foreground"
              : "bg-secondary text-muted-foreground"
          )}
        >
          {name}
        </Link>
      ))}
    </div>
  );
};
