import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export const StoreMap = () => {
  const [mapboxToken, setMapboxToken] = useState("");
  const { toast } = useToast();

  const handleSaveToken = () => {
    if (!mapboxToken) {
      toast({
        title: "Error",
        description: "Please enter your Mapbox token",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Success",
      description: "Mapbox token saved successfully",
    });
  };

  return (
    <Card className="p-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Map Configuration Required</h3>
          <p className="text-sm text-muted-foreground">
            To view the store locations on a map, please enter your Mapbox public token.
            You can find this in your Mapbox account dashboard.
          </p>
        </div>
        
        <div className="flex gap-2">
          <Input
            type="text"
            placeholder="Enter your Mapbox public token"
            value={mapboxToken}
            onChange={(e) => setMapboxToken(e.target.value)}
          />
          <Button onClick={handleSaveToken}>Save Token</Button>
        </div>
        
        <div className="h-[400px] bg-muted rounded-lg flex items-center justify-center">
          <p className="text-muted-foreground">
            Map will be displayed here after configuring Mapbox
          </p>
        </div>
      </div>
    </Card>
  );
};