
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CategoryGrid } from "@/components/categories/CategoryGrid";
import { Categories } from "@/components/Categories";

const AllCategories = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumbs />
      <h1 className="text-3xl font-bold mb-8">All Categories</h1>
      <p className="text-muted-foreground mb-8">Browse all product categories to find what you're looking for</p>
      <Categories onCategorySelect={(category) => console.log(`Selected category: ${category}`)} />
    </div>
  );
};

export default AllCategories;
