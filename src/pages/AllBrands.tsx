
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { BrandsShowcase } from "@/components/BrandsShowcase";

const AllBrands = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumbs />
      <h1 className="text-3xl font-bold mb-8">All Brands</h1>
      <p className="text-muted-foreground mb-8">Discover products from top brands and manufacturers</p>
      <BrandsShowcase onBrandClick={(brand) => console.log(`Selected brand: ${brand}`)} />
    </div>
  );
};

export default AllBrands;
