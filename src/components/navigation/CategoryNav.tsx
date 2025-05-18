
import { Link } from "react-router-dom";
import { useEffect, useRef, useState, memo, useCallback } from "react";
import { throttle } from "@/lib/performance";
import { ErrorBoundary } from "@/components/common/ErrorBoundary";

export const CategoryNav = memo(() => {
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

  // Use throttle for scroll handling to improve performance
  const handleScroll = useCallback(throttle(() => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setShowLeftShadow(scrollLeft > 5); // Small threshold to avoid flickering
      setShowRightShadow(scrollLeft < scrollWidth - clientWidth - 5);
    }
  }, 100), []);

  // Set up scroll handler
  useEffect(() => {
    const scrollEl = scrollRef.current;
    if (scrollEl) {
      scrollEl.addEventListener("scroll", handleScroll);
      // Run once to set initial state
      handleScroll();
      return () => scrollEl.removeEventListener("scroll", handleScroll);
    }
  }, [handleScroll]);

  // Stable handler for category selection
  const handleCategoryClick = useCallback((name: string) => {
    setActiveCategory(name);
  }, []);

  return (
    <ErrorBoundary>
      <div className="relative mt-2">
        {showLeftShadow && (
          <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-background to-transparent pointer-events-none z-10" />
        )}
        
        <div 
          ref={scrollRef}
          className="flex items-center gap-1 overflow-x-auto pb-2 scrollbar-hide -mx-4 px-4"
        >
          {categories.map(([name, path], index) => (
            <Link
              key={path}
              to={path}
              className={`px-3 py-2 text-sm whitespace-nowrap transition-colors duration-300 rounded-md ${
                activeCategory === name 
                  ? "bg-primary text-primary-foreground font-medium shadow-sm" 
                  : "text-foreground hover:bg-secondary"
              }`}
              onClick={() => handleCategoryClick(name)}
            >
              {name}
            </Link>
          ))}
        </div>
        
        {showRightShadow && (
          <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-background to-transparent pointer-events-none" />
        )}
      </div>
    </ErrorBoundary>
  );
});

CategoryNav.displayName = 'CategoryNav';
