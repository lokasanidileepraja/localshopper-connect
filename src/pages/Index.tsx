import { Hero } from "@/components/Hero";
import { SearchBar } from "@/components/SearchBar";
import { SearchErrorBoundary } from "@/components/search/SearchErrorBoundary";
import { FeaturedProducts } from "@/components/FeaturedProducts";
import { Newsletter } from "@/components/Newsletter";
import { Testimonials } from "@/components/Testimonials";
import { BrandsShowcase } from "@/components/BrandsShowcase";
import { Categories } from "@/components/Categories";
import { BackToTop } from "@/components/BackToTop";
import { Navigation } from "@/components/Navigation";

const Index = () => {
  return (
    <div className="min-h-screen pb-16 md:pb-0">
      <Navigation />
      <main>
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
    </div>
  );
};

export default Index;