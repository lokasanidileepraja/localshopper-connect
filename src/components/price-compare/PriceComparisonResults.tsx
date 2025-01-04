import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Star, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import { ELECTRONICS_SHOPS } from "@/data/shops";

interface PriceComparisonResultsProps {
  searchQuery: string;
  filters: {
    priceRange: [number, number];
    storeTypes: string[];
    proximity: number;
    inStock: boolean;
  };
}

export const PriceComparisonResults = ({
  searchQuery,
  filters,
}: PriceComparisonResultsProps) => {
  // For demo purposes, we'll use the mock data
  const filteredShops = ELECTRONICS_SHOPS.filter((shop) => {
    if (filters.inStock) {
      return shop.products.some((p) => p.inStock);
    }
    return true;
  });

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {filteredShops.map((shop, index) => (
        <motion.div
          key={shop.name}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <Card className="overflow-hidden">
            <div className="relative h-48">
              <img
                src={shop.image}
                alt={shop.name}
                className="w-full h-full object-cover"
              />
              <Badge
                className="absolute top-4 right-4"
                variant={shop.isOpen ? "default" : "secondary"}
              >
                {shop.isOpen ? "Open" : "Closed"}
              </Badge>
            </div>
            
            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-lg">{shop.name}</h3>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span>{shop.rating}</span>
                </div>
              </div>

              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  <span>{shop.distance}</span>
                </div>
              </div>

              <div className="flex gap-2">
                <Button variant="outline" className="flex-1">
                  <Phone className="h-4 w-4 mr-2" />
                  Contact
                </Button>
                <Button className="flex-1">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Visit Store
                </Button>
              </div>
            </div>
          </Card>
        </motion.div>
      ))}
    </div>
  );
};