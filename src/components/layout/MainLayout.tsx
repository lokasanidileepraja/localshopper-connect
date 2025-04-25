
import { Navigation } from "@/components/Navigation";
import { Outlet } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";
import { useState, useEffect } from "react";
import { Suspense } from "react";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { motion, AnimatePresence } from "framer-motion";

export const MainLayout = () => {
  const isMobile = useIsMobile();
  const [isScrolled, setIsScrolled] = useState(false);
  
  // Track scroll position to adjust spacing and navigation appearance
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  // Calculate dynamic main content padding based on navigation height and scroll
  const getMainPadding = () => {
    return isScrolled ? 'mt-[90px]' : 'mt-[100px]';
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <Navigation />
      <AnimatePresence mode="wait">
        <motion.main 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className={`flex-1 ${getMainPadding()} transition-all duration-300 px-4`}
          role="main"
          id="main-content"
        >
          <div className="max-w-md mx-auto w-full">
            <Suspense fallback={<LoadingSpinner />}>
              <Outlet />
            </Suspense>
          </div>
        </motion.main>
      </AnimatePresence>
    </div>
  );
};
