import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

interface PriceComparisonFiltersProps {
  filters: {
    priceRange: [number, number];
    storeTypes: string[];
    proximity: number;
    inStock: boolean;
  };
  onFilterChange: (filters: PriceComparisonFiltersProps["filters"]) => void;
}

export const PriceComparisonFilters = ({
  filters,
  onFilterChange,
}: PriceComparisonFiltersProps) => {
  const storeTypes = ["Local Shops", "Chain Stores", "Online Stores"];

  const handlePriceRangeChange = (value: number[]) => {
    onFilterChange({
      ...filters,
      priceRange: value as [number, number],
    });
  };

  const handleProximityChange = (value: number[]) => {
    onFilterChange({
      ...filters,
      proximity: value[0],
    });
  };

  const handleStoreTypeChange = (checked: boolean, type: string) => {
    const newStoreTypes = checked
      ? [...filters.storeTypes, type]
      : filters.storeTypes.filter((t) => t !== type);
    
    onFilterChange({
      ...filters,
      storeTypes: newStoreTypes,
    });
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h3 className="font-semibold">Price Range</h3>
        <Slider
          defaultValue={filters.priceRange}
          max={200000}
          step={1000}
          onValueChange={handlePriceRangeChange}
        />
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>₹{filters.priceRange[0].toLocaleString()}</span>
          <span>₹{filters.priceRange[1].toLocaleString()}</span>
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="font-semibold">Store Types</h3>
        <div className="space-y-2">
          {storeTypes.map((type) => (
            <div key={type} className="flex items-center space-x-2">
              <Checkbox
                id={type}
                checked={filters.storeTypes.includes(type)}
                onCheckedChange={(checked) => 
                  handleStoreTypeChange(checked as boolean, type)
                }
              />
              <Label htmlFor={type}>{type}</Label>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="font-semibold">Distance (km)</h3>
        <Slider
          defaultValue={[filters.proximity]}
          max={20}
          step={1}
          onValueChange={handleProximityChange}
        />
        <div className="text-sm text-muted-foreground">
          Within {filters.proximity} km
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <Switch
          id="in-stock"
          checked={filters.inStock}
          onCheckedChange={(checked) =>
            onFilterChange({ ...filters, inStock: checked })
          }
        />
        <Label htmlFor="in-stock">In Stock Only</Label>
      </div>
    </div>
  );
};