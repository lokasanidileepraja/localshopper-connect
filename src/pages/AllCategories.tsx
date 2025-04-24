
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Categories } from "@/components/Categories";

const AllCategories = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumbs />
      
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">All Categories</h1>
        <p className="text-muted-foreground mb-6">Browse all product categories to find what you're looking for</p>
      </div>
      
      <Categories onCategorySelect={(category) => console.log(`Selected category: ${category}`)} />
    </div>
  );
};

export default AllCategories;
