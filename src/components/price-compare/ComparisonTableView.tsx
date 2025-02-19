
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
  return (
    <div className="w-full">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Store</TableHead>
            <TableHead>Distance</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Rating</TableHead>
            <TableHead className="text-right">Price Range</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {ELECTRONICS_SHOPS.map((shop) => (
            <TableRow key={shop.id}>
              <TableCell className="font-medium">{shop.name}</TableCell>
              <TableCell>{shop.distance}</TableCell>
              <TableCell>
                <Badge variant={shop.isOpen ? "default" : "secondary"}>
                  {shop.isOpen ? "Open" : "Closed"}
                </Badge>
              </TableCell>
              <TableCell>{shop.rating}/5.0</TableCell>
              <TableCell className="text-right">
                ₹{Math.min(...shop.products.map(p => p.price)).toLocaleString()} - 
                ₹{Math.max(...shop.products.map(p => p.price)).toLocaleString()}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
