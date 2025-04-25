
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export const CategoryNav = () => {
  const [activeCategory, setActiveCategory] = useState("Home");
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showLeftShadow, setShowLeftShadow] = useState(false);
  const [showRightShadow, setShowRightShadow] = useState(true);

  const categories = [
    ["Home", "/"],
    ["Electronics", "/category/electronics"],
    ["Mobiles", "/category/mobiles"],
    ["Laptops", "/category/laptops"],
    ["Accessories", "/category/accessories"],
    ["Audio", "/category/audio"],
    ["Gaming", "/category/gaming"],
    ["Wearables", "/category/wearables"]
  ];

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setShowLeftShadow(scrollLeft > 0);
      setShowRightShadow(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    const scrollEl = scrollRef.current;
    if (scrollEl) {
      scrollEl.addEventListener("scroll", handleScroll);
      handleScroll();
      return () => scrollEl.removeEventListener("scroll", handleScroll);
    }
  }, []);

  return (
    <div className="relative mt-2">
      {showLeftShadow && (
        <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-white dark:from-gray-900 to-transparent pointer-events-none z-10" />
      )}
      
      <div 
        ref={scrollRef}
        className="flex items-center gap-2 overflow-x-auto py-2 scrollbar-hide -mx-4 px-4"
        onScroll={handleScroll}
      >
        {categories.map(([name, path]) => (
          <Link
            key={path}
            to={path}
            className={`py-1 px-3 text-sm whitespace-nowrap transition-colors duration-300 rounded-full ${
              activeCategory === name 
                ? "bg-primary/10 text-primary font-medium border border-primary/20" 
                : "bg-white/40 dark:bg-gray-800/40 backdrop-blur-sm border border-white/20 dark:border-gray-700/30 text-foreground hover:bg-gray-100 dark:hover:bg-gray-800"
            }`}
            onClick={() => setActiveCategory(name)}
          >
            {name}
          </Link>
        ))}
      </div>
      
      {showRightShadow && (
        <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white dark:from-gray-900 to-transparent pointer-events-none" />
      )}
    </div>
  );
};
