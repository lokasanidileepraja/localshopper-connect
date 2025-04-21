
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Loader2 } from "lucide-react";
import { useState } from "react";

interface SearchBarProps {
  onSearch: (query: string) => void;
}

export const SearchBar = ({ onSearch }: SearchBarProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setIsLoading(true);
      onSearch(searchQuery);
      setTimeout(() => setIsLoading(false), 1000);
    }
  };

  // Student-friendly placeholder examples
  const studentExamples = [
    `"gaming laptop"`, `"wireless earbuds"`, `"discount calculator"`, `"store near campus"`, `"student offers"`
  ];

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <form onSubmit={handleSubmit} className="flex gap-2">
        <div className="relative flex-1">
          <Input
            type="text"
            placeholder="Search for mobiles, laptops, airpods, shops…"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-4 py-2"
            aria-label="Type to search products, brands or stores"
            autoFocus
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          {searchQuery.length === 0 && (
            <span className="absolute left-10 top-full mt-1 text-xs text-muted-foreground bg-background px-2 py-1 rounded shadow-sm">
              Try: {studentExamples.join(", ")}
            </span>
          )}
        </div>
        <Button type="submit" disabled={isLoading} aria-label="Search">
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Search className="h-4 w-4" />
          )}
          <span className="ml-2">Search</span>
        </Button>
      </form>
    </div>
  );
};
