
import { Navigation } from "@/components/Navigation";
import { Outlet } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";
import { useState, useEffect } from "react";
import { Suspense } from "react";
import { LoadingSpinner } from "@/components/LoadingSpinner";

export const MainLayout = () => {
  const isMobile = useIsMobile();
  const [isScrolled, setIsScrolled] = useState(false);
  
  // Track scroll position to adjust spacing
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  // Calculate dynamic main content padding based on navigation height and scroll
  const getMainPadding = () => {
    if (isMobile) {
      return isScrolled ? 'mt-[90px]' : 'mt-[100px]';
    }
    return isScrolled ? 'mt-[110px]' : 'mt-[120px] md:mt-[130px]';
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main 
        className={`flex-1 ${getMainPadding()} transition-all duration-300`}
        role="main"
        id="main-content"
      >
        <Suspense fallback={<LoadingSpinner />}>
          <Outlet />
        </Suspense>
      </main>
    </div>
  );
};
