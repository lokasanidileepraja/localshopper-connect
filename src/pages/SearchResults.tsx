
import { useSearchParams } from "react-router-dom";
import { Breadcrumbs } from "@/components/Breadcrumbs";

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumbs />
      <div className="space-y-4">
        <h1 className="text-3xl font-bold">Search Results</h1>
        <p className="text-gray-600">Results for: {query}</p>
      </div>
    </div>
  );
};

export default SearchResults;
