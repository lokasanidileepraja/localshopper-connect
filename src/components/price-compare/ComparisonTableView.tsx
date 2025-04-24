
import { ELECTRONICS_SHOPS } from "@/data/shops";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { useToast } from "@/hooks/use-toast";

interface ComparisonTableViewProps {
  searchQuery: string;
  filters: {
    priceRange: [number, number];
    storeTypes: string[];
    proximity: number;
    inStock: boolean;
  };
}

export const ComparisonTableView = ({ searchQuery, filters }: ComparisonTableViewProps) => {
  const { addToCart } = useCartStore();
  const { toast } = useToast();

  // Filter shops based on search query and filters
  const filteredShops = ELECTRONICS_SHOPS.filter((shop) => {
    // Filter by search query
    if (searchQuery && !shop.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !shop.products.some(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()))) {
      return false;
    }
    
    // Filter by in-stock
    if (filters.inStock) {
      return shop.products.some((p) => p.inStock);
    }
    
    return true;
  });

  const handleAddToCart = (shop, product) => {
    addToCart(product, shop.name);
    
    toast({
      title: "Added to cart",
      description: `${product.name} from ${shop.name} added to your cart`,
    });
  };
  
  return (
    <div className="w-full">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Store</TableHead>
            <TableHead>Distance</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Rating</TableHead>
            <TableHead>Products</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredShops.map((shop) => {
            // Filter products based on search query and price range
            const relevantProducts = shop.products.filter(p => 
              (!searchQuery || p.name.toLowerCase().includes(searchQuery.toLowerCase())) &&
              p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1]
            );
            
            if (relevantProducts.length === 0) return null;
            
            return (
              <TableRow key={shop.id}>
                <TableCell className="font-medium">{shop.name}</TableCell>
                <TableCell>{shop.distance}</TableCell>
                <TableCell>
                  <Badge variant={shop.isOpen ? "default" : "secondary"}>
                    {shop.isOpen ? "Open" : "Closed"}
                  </Badge>
                </TableCell>
                <TableCell>{shop.rating}/5.0</TableCell>
                <TableCell>
                  <div className="space-y-1">
                    {relevantProducts.map(product => (
                      <div key={product.id} className="flex gap-2">
                        <span>{product.name}</span>
                        <span className="font-semibold">₹{product.price.toLocaleString()}</span>
                      </div>
                    ))}
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  {relevantProducts.length > 0 && (
                    <Button 
                      size="sm" 
                      onClick={() => handleAddToCart(shop, relevantProducts[0])}
                      disabled={!relevantProducts[0].inStock}
                    >
                      <ShoppingCart className="w-4 h-4 mr-1" />
                      Add to Cart
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      
      {filteredShops.filter(shop => 
        shop.products.some(p => 
          (!searchQuery || p.name.toLowerCase().includes(searchQuery.toLowerCase())) &&
          p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1]
        )
      ).length === 0 && (
        <div className="text-center py-8">
          <h3 className="text-lg font-semibold mb-2">No results found</h3>
          <p className="text-gray-600">Try adjusting your search or filters</p>
        </div>
      )}
    </div>
  );
};
