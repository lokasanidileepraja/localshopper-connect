import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

export const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      toast({
        title: "Please enter a search term",
        description: "Enter a product or shop name to search",
      });
      return;
    }
    // For now, we'll navigate to the first shop as a demonstration
    // In a real app, this would search across shops and products
    navigate("/shop/TechHub Electronics");
  };

  return (
    <form onSubmit={handleSearch} className="max-w-2xl mx-auto px-4 py-8">
      <div className="flex gap-2">
        <Input
          type="text"
          placeholder="Search for shops or products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1"
        />
        <Button type="submit">
          <Search className="mr-2" />
          Search
        </Button>
      </div>
    </form>
  );
};