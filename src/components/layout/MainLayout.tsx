
import { Navigation } from "@/components/Navigation";
import { Outlet } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";
import { useState, useEffect } from "react";
import { Suspense } from "react";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { MobileBottomNav } from "@/components/navigation/MobileBottomNav";
import { SavedCartReminder } from "@/components/personalization/SavedCartReminder";
import { SignupCouponModal } from "@/components/reciprocity/SignupCouponModal";

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
  
  // Compact padding for mobile app feel
  const getMainPadding = () => {
    if (isMobile) {
      return 'mt-[88px] pb-20'; // nav (48px) + category pills (40px)
    }
    return 'mt-24';
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main 
        className={`flex-1 ${getMainPadding()} transition-all duration-300`}
        role="main"
        id="main-content"
      >
        {/* Global personalization components */}
        <SavedCartReminder className="container mx-auto px-4 mb-4" />
        
        <Suspense fallback={<LoadingSpinner />}>
          <Outlet />
        </Suspense>
      </main>
      
      {/* Mobile bottom navigation */}
      {isMobile && <MobileBottomNav />}
      
      {/* Global modals */}
      <SignupCouponModal />
    </div>
  );
};
