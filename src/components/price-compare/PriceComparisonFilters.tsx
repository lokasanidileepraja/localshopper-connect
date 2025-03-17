
import { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { LocationSearchInput } from "@/components/search/LocationSearchInput";

interface PriceComparisonFiltersProps {
  filters: {
    priceRange: [number, number];
    storeTypes: string[];
    proximity: number;
    inStock: boolean;
    emiAvailable?: boolean;
    verifiedOnly?: boolean;
    location?: string;
  };
  onFilterChange: (filters: PriceComparisonFiltersProps["filters"]) => void;
}

export const PriceComparisonFilters = ({
  filters,
  onFilterChange,
}: PriceComparisonFiltersProps) => {
  const [localFilters, setLocalFilters] = useState(filters);
  const [activeFiltersCount, setActiveFiltersCount] = useState(0);

  const storeTypeOptions = [
    { id: "local-store", label: "Local Stores" },
    { id: "chain-store", label: "Chain Retailers" },
    { id: "service-center", label: "Authorized Service Centers" },
    { id: "premium-reseller", label: "Premium Resellers" },
  ];

  useEffect(() => {
    // Count active filters
    let count = 0;
    if (localFilters.inStock) count++;
    if (localFilters.emiAvailable) count++;
    if (localFilters.verifiedOnly) count++;
    if (localFilters.storeTypes.length > 0) count++;
    if (localFilters.proximity !== 5) count++;
    if (
      localFilters.priceRange[0] > 0 ||
      localFilters.priceRange[1] < 200000
    ) count++;
    if (localFilters.location) count++;
    
    setActiveFiltersCount(count);
  }, [localFilters]);

  const handleLocalFilterChange = <K extends keyof typeof localFilters>(
    key: K,
    value: typeof localFilters[K]
  ) => {
    setLocalFilters((prev) => {
      const updated = { ...prev, [key]: value };
      return updated;
    });
  };

  const handleStoreTypeToggle = (storeTypeId: string) => {
    setLocalFilters((prev) => {
      const storeTypes = prev.storeTypes.includes(storeTypeId)
        ? prev.storeTypes.filter((id) => id !== storeTypeId)
        : [...prev.storeTypes, storeTypeId];
      
      return { ...prev, storeTypes };
    });
  };

  const handleApplyFilters = () => {
    onFilterChange(localFilters);
  };

  const handleResetFilters = () => {
    const defaultFilters = {
      priceRange: [0, 200000] as [number, number],
      storeTypes: [],
      proximity: 5,
      inStock: false,
      emiAvailable: false,
      verifiedOnly: false,
      location: "",
    };
    
    setLocalFilters(defaultFilters);
    onFilterChange(defaultFilters);
  };

  return (
    <div className="space-y-6 p-1">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Filters</h3>
        {activeFiltersCount > 0 && (
          <Button variant="ghost" onClick={handleResetFilters} className="h-auto p-2">
            <X className="h-4 w-4 mr-1" />
            <span>Clear All</span>
          </Button>
        )}
      </div>
      
      <div className="space-y-4">
        <div className="space-y-2">
          <Label className="text-base">Location</Label>
          <LocationSearchInput
            value={localFilters.location || ""}
            onChange={(location) => handleLocalFilterChange("location", location)}
          />
        </div>
        
        <div className="space-y-2">
          <Label className="text-base">Pricing</Label>
          <div className="pt-4 px-2">
            <Slider
              value={localFilters.priceRange}
              min={0}
              max={200000}
              step={1000}
              onValueChange={(value) => 
                handleLocalFilterChange("priceRange", value as [number, number])
              }
            />
          </div>
          <div className="flex items-center justify-between pt-2">
            <Badge variant="outline">₹{localFilters.priceRange[0].toLocaleString()}</Badge>
            <Badge variant="outline">₹{localFilters.priceRange[1].toLocaleString()}</Badge>
          </div>
        </div>
        
        <div className="space-y-2">
          <Label className="text-base">Store Types</Label>
          <div className="space-y-2 pt-2">
            {storeTypeOptions.map((option) => (
              <div key={option.id} className="flex items-center space-x-2">
                <Checkbox
                  id={option.id}
                  checked={localFilters.storeTypes.includes(option.id)}
                  onCheckedChange={() => handleStoreTypeToggle(option.id)}
                />
                <Label htmlFor={option.id} className="text-sm">
                  {option.label}
                </Label>
              </div>
            ))}
          </div>
        </div>
        
        <div className="space-y-2">
          <Label className="text-base">Distance (km)</Label>
          <div className="pt-4 px-2">
            <Slider
              value={[localFilters.proximity]}
              min={1}
              max={20}
              step={1}
              onValueChange={(value) => 
                handleLocalFilterChange("proximity", value[0])
              }
            />
          </div>
          <div className="flex justify-end pt-2">
            <Badge variant="outline">Within {localFilters.proximity} km</Badge>
          </div>
        </div>

        <div className="space-y-3 pt-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="in-stock-filter" className="cursor-pointer text-sm">
              In-Stock Only
            </Label>
            <Switch
              id="in-stock-filter"
              checked={localFilters.inStock}
              onCheckedChange={(checked) => 
                handleLocalFilterChange("inStock", checked)
              }
            />
          </div>
          
          <div className="flex items-center justify-between">
            <Label htmlFor="emi-filter" className="cursor-pointer text-sm">
              EMI Available
            </Label>
            <Switch
              id="emi-filter"
              checked={localFilters.emiAvailable}
              onCheckedChange={(checked) => 
                handleLocalFilterChange("emiAvailable", checked)
              }
            />
          </div>
          
          <div className="flex items-center justify-between">
            <Label htmlFor="verified-filter" className="cursor-pointer text-sm">
              Verified Retailers Only
            </Label>
            <Switch
              id="verified-filter"
              checked={localFilters.verifiedOnly}
              onCheckedChange={(checked) => 
                handleLocalFilterChange("verifiedOnly", checked)
              }
            />
          </div>
        </div>
      </div>
      
      <Button className="w-full" onClick={handleApplyFilters}>
        Apply Filters
      </Button>
    </div>
  );
};
