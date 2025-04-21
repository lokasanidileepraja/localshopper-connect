
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { EnhancedPriceComparisonTabs } from "@/components/price-compare/EnhancedPriceComparisonTabs";
import { Search, Filter, MapPin, Tag } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Checkbox } from "@/components/ui/checkbox";
import { useIsMobile } from "@/hooks/use-mobile";
import { TooltipWrapper } from "@/components/common/TooltipWrapper";

const EnhancedPriceCompare = () => {
  const [searchParams] = useSearchParams();
  const initialQuery = searchParams.get("q") || "";
  const navigate = useNavigate();
  const { toast } = useToast();
  const isMobile = useIsMobile();
  
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [submitted, setSubmitted] = useState(!!initialQuery);
  const [showFilters, setShowFilters] = useState(false);
  
  // Filters state
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 200000]);
  const [proximity, setProximity] = useState(5);
  const [inStock, setInStock] = useState(false);
  const [storeTypes, setStoreTypes] = useState<string[]>([]);
  
  const storeTypeOptions = [
    { id: "retail", label: "Retail Stores" },
    { id: "online", label: "Online Stores" },
    { id: "authorized", label: "Authorized Dealers" },
    { id: "secondhand", label: "Second-hand Dealers" }
  ];
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setSubmitted(true);
      navigate(`/enhanced-price-compare?q=${encodeURIComponent(searchQuery)}`);
      toast({
        title: "Comparing Prices",
        description: `Finding the best prices for "${searchQuery}" near you...`,
      });
    }
  };
  
  const handleResetFilters = () => {
    setPriceRange([0, 200000]);
    setProximity(5);
    setInStock(false);
    setStoreTypes([]);
    
    toast({
      title: "Filters Reset",
      description: "All filters have been reset to default values.",
    });
  };
  
  const toggleStoreType = (id: string) => {
    setStoreTypes(prev => 
      prev.includes(id) 
        ? prev.filter(type => type !== id)
        : [...prev, id]
    );
  };
  
  return (
    <div className="container py-6 md:py-10 space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl md:text-3xl font-bold">Compare Prices Nearby</h1>
        <p className="text-muted-foreground">
          Find the best deals from local stores and compare prices in real-time
        </p>
      </div>
      
      <Card>
        <CardContent className={isMobile ? "px-3 py-3" : "px-6 py-6"}>
          <form onSubmit={handleSearch} className="space-y-4">
            <div className="flex flex-wrap gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search for products, brands, or model numbers..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                  aria-label="Search product"
                />
              </div>
              <TooltipWrapper content="Search for products">
                <Button type="submit" aria-label="Search">
                  <Search className="h-4 w-4 mr-2" />
                  Compare Prices
                </Button>
              </TooltipWrapper>
              <TooltipWrapper content="Toggle advanced filters">
                <Button 
                  type="button"
                  variant="outline"
                  aria-label="Toggle filters"
                  aria-expanded={showFilters}
                  onClick={() => setShowFilters(!showFilters)}
                >
                  <Filter className="h-4 w-4" />
                </Button>
              </TooltipWrapper>
            </div>
            
            {showFilters && (
              <div className="pt-4 border-t space-y-4">
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label className="text-sm font-medium">Price Range</Label>
                      <span className="text-xs text-muted-foreground">
                        ₹{priceRange[0].toLocaleString()} - ₹{priceRange[1].toLocaleString()}
                      </span>
                    </div>
                    <Slider
                      defaultValue={priceRange}
                      value={priceRange}
                      max={200000}
                      step={1000}
                      onValueChange={(value) => setPriceRange(value as [number, number])}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label className="text-sm font-medium">
                        <MapPin className="h-4 w-4 inline mr-1" /> 
                        Distance (km)
                      </Label>
                      <span className="text-xs text-muted-foreground">
                        {proximity} km
                      </span>
                    </div>
                    <Slider
                      value={[proximity]}
                      min={1}
                      max={20}
                      step={1}
                      onValueChange={([value]) => setProximity(value)}
                    />
                  </div>
                  
                  <div className="space-y-3">
                    <Label className="text-sm font-medium">Store Types</Label>
                    <div className="grid grid-cols-2 gap-2">
                      {storeTypeOptions.map((option) => (
                        <div key={option.id} className="flex items-center space-x-2">
                          <Checkbox 
                            id={`store-type-${option.id}`} 
                            checked={storeTypes.includes(option.id)}
                            onCheckedChange={() => toggleStoreType(option.id)}
                          />
                          <Label 
                            htmlFor={`store-type-${option.id}`}
                            className="text-sm"
                          >
                            {option.label}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="in-stock"
                        checked={inStock}
                        onCheckedChange={setInStock}
                      />
                      <Label htmlFor="in-stock" className="text-sm font-medium">
                        <Tag className="h-4 w-4 inline mr-1" /> 
                        In-Stock Only
                      </Label>
                    </div>
                    
                    <Button 
                      type="button" 
                      variant="outline" 
                      className="w-full"
                      onClick={handleResetFilters}
                    >
                      Reset Filters
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </form>
        </CardContent>
      </Card>
      
      {submitted && (
        <EnhancedPriceComparisonTabs
          searchQuery={searchQuery}
          filters={{
            priceRange,
            storeTypes,
            proximity,
            inStock
          }}
          onBack={() => setSubmitted(false)}
        />
      )}
    </div>
  );
};

export default EnhancedPriceCompare;
