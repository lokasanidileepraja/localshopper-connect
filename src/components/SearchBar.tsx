import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export const SearchBar = () => {
  return (
    <div className="bg-white py-6 shadow-sm">
      <div className="container">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <Input
            type="text"
            placeholder="Search for shops or products..."
            className="pl-10 pr-20"
          />
          <Button className="absolute right-1 top-1/2 -translate-y-1/2">
            Search
          </Button>
        </div>
      </div>
    </div>
  );
};