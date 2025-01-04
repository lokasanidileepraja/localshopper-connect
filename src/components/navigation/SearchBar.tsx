import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export const NavigationSearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      toast({
        title: "Searching",
        description: `Looking for "${searchQuery}"...`,
      });
      console.log("Searching for:", searchQuery);
    }
  };

  return (
    <form onSubmit={handleSearch} className="flex-1">
      <div className="relative">
        <Input
          type="search"
          placeholder="Search products..."
          className="w-full pl-10 pr-4 py-2 bg-muted border-0 rounded-xl focus:ring-2 focus:ring-primary/20 transition-all duration-300"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-neutral" />
      </div>
    </form>
  );
};