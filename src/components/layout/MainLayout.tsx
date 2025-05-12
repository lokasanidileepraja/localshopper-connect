
import { Navigation } from "@/components/Navigation";
import { Outlet } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";
import { useState, useEffect, useCallback, memo } from "react";
import { Suspense, lazy } from "react";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { MobileBottomNav } from "@/components/navigation/MobileBottomNav";

// Lazy load non-critical components
const SavedCartReminder = lazy(() => 
  import("@/components/personalization/SavedCartReminder").then(
    module => ({ default: memo(module.SavedCartReminder) })
  )
);

const SignupCouponModal = lazy(() => 
  import("@/components/reciprocity/SignupCouponModal").then(
    module => ({ default: memo(module.SignupCouponModal) })
  )
);

export const MainLayout = memo(() => {
  const isMobile = useIsMobile();
  const [isScrolled, setIsScrolled] = useState(false);
  
  // Track scroll position to adjust spacing with throttling
  const handleScroll = useCallback(() => {
    const shouldBeScrolled = window.scrollY > 50;
    if (shouldBeScrolled !== isScrolled) {
      setIsScrolled(shouldBeScrolled);
    }
  }, [isScrolled]);
  
  useEffect(() => {
    let scrollTimer: number | null = null;
    
    const throttledScrollHandler = () => {
      if (scrollTimer === null) {
        scrollTimer = window.setTimeout(() => {
          handleScroll();
          scrollTimer = null;
        }, 100); // Throttle to once every 100ms
      }
    };
    
    window.addEventListener("scroll", throttledScrollHandler, { passive: true });
    return () => {
      window.removeEventListener("scroll", throttledScrollHandler);
      if (scrollTimer) clearTimeout(scrollTimer);
    };
  }, [handleScroll]);
  
  // Calculate dynamic main content padding based on navigation height and scroll - memoized
  const mainPadding = isMobile 
    ? (isScrolled ? 'mt-[90px] pb-20' : 'mt-[100px] pb-20')
    : (isScrolled ? 'mt-[110px]' : 'mt-[120px] md:mt-[130px]');
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main 
        className={`flex-1 ${mainPadding} transition-all duration-300`}
        role="main"
        id="main-content"
      >
        {/* Global personalization components */}
        <Suspense fallback={null}>
          <SavedCartReminder className="container mx-auto px-4 mb-4" />
        </Suspense>
        
        <Suspense fallback={<LoadingSpinner />}>
          <Outlet />
        </Suspense>
      </main>
      
      {/* Mobile bottom navigation */}
      {isMobile && <MobileBottomNav />}
      
      {/* Global modals */}
      <Suspense fallback={null}>
        <SignupCouponModal />
      </Suspense>
    </div>
  );
});

MainLayout.displayName = "MainLayout";
