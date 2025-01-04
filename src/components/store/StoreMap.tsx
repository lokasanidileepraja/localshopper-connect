import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ELECTRONICS_SHOPS } from "@/data/shops";

export const StoreMap = () => {
  return (
    <div className="container py-8">
      <h2 className="text-2xl font-bold mb-6">Store Locations</h2>
      <Card className="p-6">
        <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
          <p className="text-muted-foreground">Map View Coming Soon</p>
        </div>
        <div className="mt-6 space-y-4">
          {ELECTRONICS_SHOPS.map((shop) => (
            <div key={shop.name} className="flex justify-between items-center p-4 border rounded-lg">
              <div>
                <h3 className="font-semibold">{shop.name}</h3>
                <p className="text-sm text-muted-foreground">{shop.distance}</p>
              </div>
              <Badge variant={shop.isOpen ? "default" : "secondary"}>
                {shop.isOpen ? "Open" : "Closed"}
              </Badge>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};
