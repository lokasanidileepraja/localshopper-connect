import { Hero } from "@/components/Hero";
import { SearchBar } from "@/components/SearchBar";
import { SearchErrorBoundary } from "@/components/search/SearchErrorBoundary";
import { FeaturedProducts } from "@/components/FeaturedProducts";
import { Newsletter } from "@/components/Newsletter";
import { Testimonials } from "@/components/Testimonials";
import { BrandsShowcase } from "@/components/BrandsShowcase";
import { Categories } from "@/components/Categories";
import { BackToTop } from "@/components/BackToTop";
import { useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";
import { Menu, User, ShoppingCart, Bell } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const navigate = useNavigate();

  useEffect(() => {
    // Welcome message for first-time visitors
    if (!localStorage.getItem('welcomed')) {
      toast({
        title: "Welcome to TechHub!",
        description: "Find the best electronics deals near you.",
        duration: 5000,
      });
      localStorage.setItem('welcomed', 'true');
    }

    // Check if the app can be installed (PWA)
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      toast({
        title: "Install Our App",
        description: "Get a better experience by installing our app",
        duration: 7000,
      });
    });

    // Check for app updates
    window.addEventListener('appinstalled', () => {
      toast({
        title: "App Installed Successfully",
        description: "Thank you for installing our app!",
        duration: 3000,
      });
    });
  }, [toast]);

  return (
    <div className="min-h-screen">
      {isMobile && (
        <header className="fixed top-0 left-0 right-0 bg-white dark:bg-gray-900 z-50 border-b">
          <div className="flex items-center justify-between p-4">
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
            </Button>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon" onClick={() => navigate("/cart")}>
                <ShoppingCart className="h-6 w-6" />
              </Button>
              <Button variant="ghost" size="icon" onClick={() => navigate("/alerts")}>
                <Bell className="h-6 w-6" />
              </Button>
              <Button variant="ghost" size="icon" onClick={() => navigate("/profile")}>
                <User className="h-6 w-6" />
              </Button>
            </div>
          </div>
        </header>
      )}
      <main className={`${isMobile ? "pt-16" : ""}`}>
        <Hero />
        <SearchErrorBoundary>
          <SearchBar />
        </SearchErrorBoundary>
        <Categories />
        <FeaturedProducts />
        <BrandsShowcase />
        <Testimonials />
        <Newsletter />
        <BackToTop />
      </main>
      {isMobile && (
        <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t z-50">
          <div className="grid grid-cols-4 gap-1 p-2">
            <Button 
              variant="ghost" 
              className="flex flex-col items-center text-xs py-2"
              onClick={() => navigate("/")}
            >
              <Menu className="h-5 w-5 mb-1" />
              Home
            </Button>
            <Button 
              variant="ghost" 
              className="flex flex-col items-center text-xs py-2"
              onClick={() => navigate("/categories")}
            >
              <ShoppingCart className="h-5 w-5 mb-1" />
              Shop
            </Button>
            <Button 
              variant="ghost" 
              className="flex flex-col items-center text-xs py-2"
              onClick={() => navigate("/alerts")}
            >
              <Bell className="h-5 w-5 mb-1" />
              Alerts
            </Button>
            <Button 
              variant="ghost" 
              className="flex flex-col items-center text-xs py-2"
              onClick={() => navigate("/profile")}
            >
              <User className="h-5 w-5 mb-1" />
              Profile
            </Button>
          </div>
        </nav>
      )}
    </div>
  );
};

export default Index;
