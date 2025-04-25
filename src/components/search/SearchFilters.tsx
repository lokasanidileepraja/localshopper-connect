
import * as React from "react";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface SearchFiltersProps {
  onFilterChange: (filters: SearchFilters) => void;
}

export interface SearchFilters {
  priceRange: [number, number];
  categories: string[];
  brands: string[];
  inStock: boolean;
}

export const SearchFilters = ({ onFilterChange }: SearchFiltersProps) => {
  const { toast } = useToast();
  const [priceRange, setPriceRange] = React.useState([0, 200000]);
  const [selectedCategories, setSelectedCategories] = React.useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = React.useState<string[]>([]);
  const [inStock, setInStock] = React.useState(false);

  const categories = ["Mobile", "Laptop", "Audio", "Accessories"];
  const brands = ["Apple", "Samsung", "Sony", "Dell", "HP"];

  const handleApplyFilters = () => {
    onFilterChange({
      priceRange: priceRange as [number, number],
      categories: selectedCategories,
      brands: selectedBrands,
      inStock,
    });
    toast({
      title: "Filters Applied",
      description: "Your search results have been updated.",
    });
  };

  return (
    <div className="space-y-6 p-4 border rounded-lg bg-background">
      <div className="space-y-2">
        <h3 className="font-semibold">Price Range</h3>
        <Slider
          defaultValue={[0, 200000]}
          max={200000}
          step={1000}
          value={priceRange}
          onValueChange={setPriceRange}
          className="w-full"
        />
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>₹{priceRange[0].toLocaleString()}</span>
          <span>₹{priceRange[1].toLocaleString()}</span>
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="font-semibold">Categories</h3>
        <div className="grid grid-cols-2 gap-2">
          {categories.map((category) => (
            <div key={category} className="flex items-center space-x-2">
              <Checkbox
                id={`category-${category}`}
                checked={selectedCategories.includes(category)}
                onCheckedChange={(checked) => {
                  setSelectedCategories(
                    checked
                      ? [...selectedCategories, category]
                      : selectedCategories.filter((c) => c !== category)
                  );
                }}
              />
              <Label htmlFor={`category-${category}`}>{category}</Label>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="font-semibold">Brands</h3>
        <div className="grid grid-cols-2 gap-2">
          {brands.map((brand) => (
            <div key={brand} className="flex items-center space-x-2">
              <Checkbox
                id={`brand-${brand}`}
                checked={selectedBrands.includes(brand)}
                onCheckedChange={(checked) => {
                  setSelectedBrands(
                    checked
                      ? [...selectedBrands, brand]
                      : selectedBrands.filter((b) => b !== brand)
                  );
                }}
              />
              <Label htmlFor={`brand-${brand}`}>{brand}</Label>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox
          id="in-stock"
          checked={inStock}
          onCheckedChange={(checked) => setInStock(checked as boolean)}
        />
        <Label htmlFor="in-stock">In Stock Only</Label>
      </div>

      <Button onClick={handleApplyFilters} className="w-full">
        Apply Filters
      </Button>
    </div>
  );
};
