import { Hero } from "@/components/Hero";
import { SearchBar } from "@/components/SearchBar";
import { FeaturedProducts } from "@/components/FeaturedProducts";
import { Newsletter } from "@/components/Newsletter";
import { Testimonials } from "@/components/Testimonials";
import { BrandsShowcase } from "@/components/BrandsShowcase";
import { Categories } from "@/components/Categories";
import { BackToTop } from "@/components/BackToTop";

const Index = () => {
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