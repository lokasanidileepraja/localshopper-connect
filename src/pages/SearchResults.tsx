
import { useSearchParams } from "react-router-dom";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { motion } from "framer-motion";

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";

  return (
    <motion.div 
      className="container mx-auto px-4 py-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Breadcrumbs />
      <div className="space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">Search Results</h1>
          <p className="text-muted-foreground">Results for: <span className="font-medium text-foreground">{query}</span></p>
        </div>
        
        <div className="bg-muted/50 rounded-lg p-8 text-center">
          <p>This is a placeholder for search results in the MVP.</p>
          <p className="text-muted-foreground mt-2">In the production version, this would display actual product results for "{query}".</p>
        </div>
      </div>
    </motion.div>
  );
};

export default SearchResults;
