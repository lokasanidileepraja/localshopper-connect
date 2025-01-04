import { Hero } from "@/components/Hero";
import { SearchBar } from "@/components/SearchBar";
import { FeaturedProducts } from "@/components/FeaturedProducts";
import { Newsletter } from "@/components/Newsletter";
import { Testimonials } from "@/components/Testimonials";
import { BrandsShowcase } from "@/components/BrandsShowcase";
import { Categories } from "@/components/Categories";
import { BackToTop } from "@/components/BackToTop";
import { useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const { toast } = useToast();

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
  }, [toast]);

  return (
    <div className="min-h-screen">
      <Hero />
      <SearchBar />
      <Categories />
      <FeaturedProducts />
      <BrandsShowcase />
      <Testimonials />
      <Newsletter />
      <BackToTop />
    </div>
  );
};

export default Index;