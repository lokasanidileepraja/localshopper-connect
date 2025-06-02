
import { useState } from "react";
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
import { Input } from "@/components/ui/input";
import { ShoppingCart, Star, Phone, MapPin, ExternalLink, TrendingDown, TrendingUp } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

interface ComparisonTableViewProps {
  searchQuery: string;
  filters: {
    priceRange: [number, number];
    storeTypes: string[];
    proximity: number;
    inStock: boolean;
    emiAvailable?: boolean;
    verifiedOnly?: boolean;
  };
}

export const ComparisonTableView = ({ searchQuery, filters }: ComparisonTableViewProps) => {
  const { addToCart } = useCartStore();
  const { toast } = useToast();
  const [sortBy, setSortBy] = useState<"price" | "rating" | "distance">("price");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  // Filter shops based on search query and filters
  const filteredShops = ELECTRONICS_SHOPS.filter((shop) => {
    // Filter by search query
    if (searchQuery && !shop.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !shop.products.some(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()))) {
      return false;
    }
    
    // Filter by verified retailers
    if (filters.verifiedOnly && !shop.isVerified) {
      return false;
    }
    
    // Filter by in-stock
    if (filters.inStock) {
      return shop.products.some((p) => p.inStock);
    }
    
    return true;
  });

  // Sort filtered shops
  const sortedShops = [...filteredShops].sort((a, b) => {
    let comparison = 0;
    
    if (sortBy === "price") {
      const aPrice = Math.min(...a.products.map(p => p.price));
      const bPrice = Math.min(...b.products.map(p => p.price));
      comparison = aPrice - bPrice;
    } else if (sortBy === "rating") {
      comparison = b.rating - a.rating;
    } else if (sortBy === "distance") {
      const aDistance = parseFloat(a.distance.replace(" km", ""));
      const bDistance = parseFloat(b.distance.replace(" km", ""));
      comparison = aDistance - bDistance;
    }
    
    return sortOrder === "asc" ? comparison : -comparison;
  });

  const handleAddToCart = (shop: any, product: any) => {
    addToCart(product, shop.name);
    
    toast({
      title: "Added to cart",
      description: `${product.name} from ${shop.name} added to your cart`,
    });
  };

  const handleSort = (column: "price" | "rating" | "distance") => {
    if (sortBy === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(column);
      setSortOrder("asc");
    }
  };

  const getSortIcon = (column: "price" | "rating" | "distance") => {
    if (sortBy !== column) return null;
    return sortOrder === "asc" ? 
      <TrendingUp className="h-4 w-4 inline ml-1" /> : 
      <TrendingDown className="h-4 w-4 inline ml-1" />;
  };
  
  return (
    <div className="w-full space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">
            Showing {sortedShops.length} stores
          </span>
          {searchQuery && (
            <Badge variant="outline">Search: {searchQuery}</Badge>
          )}
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm">Sort by:</span>
          <Button
            variant={sortBy === "price" ? "default" : "outline"}
            size="sm"
            onClick={() => handleSort("price")}
          >
            Price {getSortIcon("price")}
          </Button>
          <Button
            variant={sortBy === "rating" ? "default" : "outline"}
            size="sm"
            onClick={() => handleSort("rating")}
          >
            Rating {getSortIcon("rating")}
          </Button>
          <Button
            variant={sortBy === "distance" ? "default" : "outline"}
            size="sm"
            onClick={() => handleSort("distance")}
          >
            Distance {getSortIcon("distance")}
          </Button>
        </div>
      </div>

      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Store</TableHead>
              <TableHead>Rating</TableHead>
              <TableHead>Distance</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Products</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedShops.map((shop, index) => {
              // Filter products based on search query and price range
              const relevantProducts = shop.products.filter(p => 
                (!searchQuery || p.name.toLowerCase().includes(searchQuery.toLowerCase())) &&
                p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1]
              );
              
              if (relevantProducts.length === 0) return null;
              
              return (
                <motion.tr
                  key={shop.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="hover:bg-muted/50"
                >
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <span>{shop.name}</span>
                          {shop.isVerified && (
                            <Badge variant="secondary" className="text-xs">
                              Verified
                            </Badge>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground">{shop.category}</p>
                      </div>
                    </div>
                  </TableCell>
                  
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span>{shop.rating}</span>
                      <span className="text-xs text-muted-foreground">/5.0</span>
                    </div>
                  </TableCell>
                  
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <MapPin className="h-3 w-3 text-muted-foreground" />
                      {shop.distance}
                    </div>
                  </TableCell>
                  
                  <TableCell>
                    <Badge variant={shop.isOpen ? "default" : "secondary"}>
                      {shop.isOpen ? "Open" : "Closed"}
                    </Badge>
                  </TableCell>
                  
                  <TableCell>
                    <div className="space-y-1 max-w-xs">
                      {relevantProducts.slice(0, 3).map(product => (
                        <div key={product.id} className="flex justify-between items-center text-sm">
                          <span className="truncate mr-2">{product.name}</span>
                          <div className="flex items-center gap-2">
                            <span className="font-semibold">₹{product.price.toLocaleString()}</span>
                            <Badge 
                              variant={product.inStock ? "outline" : "secondary"}
                              className="text-xs"
                            >
                              {product.inStock ? "In Stock" : "Out"}
                            </Badge>
                          </div>
                        </div>
                      ))}
                      {relevantProducts.length > 3 && (
                        <div className="text-xs text-muted-foreground">
                          +{relevantProducts.length - 3} more products
                        </div>
                      )}
                    </div>
                  </TableCell>
                  
                  <TableCell>
                    <div className="flex flex-col gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => window.location.href = `tel:${shop.phone}`}
                        className="justify-start p-0 h-auto text-xs"
                      >
                        <Phone className="h-3 w-3 mr-1" />
                        {shop.phone}
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => window.open(`https://maps.google.com/search/${encodeURIComponent(shop.address)}`, '_blank')}
                        className="justify-start p-0 h-auto text-xs"
                      >
                        <ExternalLink className="h-3 w-3 mr-1" />
                        Directions
                      </Button>
                    </div>
                  </TableCell>
                  
                  <TableCell className="text-right">
                    <div className="flex gap-1 justify-end">
                      {relevantProducts.length > 0 && (
                        <Button 
                          size="sm" 
                          onClick={() => handleAddToCart(shop, relevantProducts[0])}
                          disabled={!relevantProducts[0].inStock}
                          className="flex items-center gap-1"
                        >
                          <ShoppingCart className="w-3 h-3" />
                          Add
                        </Button>
                      )}
                      <Button 
                        variant="outline"
                        size="sm"
                        onClick={() => window.open(`/shop/${shop.id}`, '_blank')}
                      >
                        Visit
                      </Button>
                    </div>
                  </TableCell>
                </motion.tr>
              );
            })}
          </TableBody>
        </Table>
      </div>
      
      {sortedShops.filter(shop => 
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
