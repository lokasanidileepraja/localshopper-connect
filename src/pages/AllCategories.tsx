
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Categories } from "@/components/Categories";
import { SearchInput } from "@/components/search/SearchInput";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const AllCategories = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  
  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumbs />
      
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">All Categories</h1>
        <p className="text-muted-foreground mb-6">Browse all product categories to find what you're looking for</p>
        
        <div className="max-w-md">
          <SearchInput
            value={searchQuery}
            onChange={setSearchQuery}
            onEnter={handleSearch}
            isMobile={false}
            className="w-full"
          />
        </div>
      </div>
      
      <Categories onCategorySelect={(category) => console.log(`Selected category: ${category}`)} />
    </div>
  );
};

export default AllCategories;
