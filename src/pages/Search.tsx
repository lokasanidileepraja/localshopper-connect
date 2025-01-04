import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search as SearchIcon, SlidersHorizontal } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [priceRange, setPriceRange] = useState([0, 2000]);

  // Mock search results
  const searchResults = [
    {
      id: 1,
      name: "Smartphone X",
      price: 799,
      image: "/placeholder.svg",
      category: "Electronics"
    },
    {
      id: 2,
      name: "Laptop Pro",
      price: 1299,
      image: "/placeholder.svg",
      category: "Electronics"
    }
  ];

  return (
    <div className="container py-12">
      <div className="flex gap-4 mb-8">
        <div className="relative flex-1">
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            className="pl-10"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon">
              <SlidersHorizontal className="h-4 w-4" />
            </Button>
          </SheetTrigger>
          <SheetContent>
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold mb-4">Price Range</h3>
                <Slider
                  defaultValue={priceRange}
                  max={2000}
                  step={10}
                  onValueChange={setPriceRange}
                />
                <div className="flex justify-between mt-2 text-sm text-muted-foreground">
                  <span>${priceRange[0]}</span>
                  <span>${priceRange[1]}</span>
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold mb-4">Categories</h3>
                <div className="space-y-2">
                  {["Electronics", "Clothing", "Books", "Home"].map((category) => (
                    <div key={category} className="flex items-center space-x-2">
                      <Checkbox id={category} />
                      <Label htmlFor={category}>{category}</Label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {searchResults.map((item) => (
          <Card key={item.id} className="overflow-hidden">
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-48 object-cover"
            />
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground mb-1">{item.category}</p>
              <h3 className="font-semibold mb-2">{item.name}</h3>
              <p className="text-lg font-bold">${item.price}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Search;