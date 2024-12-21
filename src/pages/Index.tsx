import { Hero } from "@/components/Hero";
import { SearchBar } from "@/components/SearchBar";
import { ShopList } from "@/components/ShopList";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <SearchBar />
      <ShopList />
    </div>
  );
};

export default Index;