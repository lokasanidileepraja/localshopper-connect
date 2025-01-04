import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, MapPin, Phone } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const ComparisonTable = () => {
  const { toast } = useToast();

  const mockData = [
    {
      store: "TechHub",
      price: 79999,
      inStock: true,
      distance: "0.8 km",
      rating: 4.5,
      contact: "+1234567890"
    },
    {
      store: "Digital World",
      price: 78999,
      inStock: true,
      distance: "1.2 km",
      rating: 4.7,
      contact: "+1234567891"
    },
    {
      store: "Gadget Galaxy",
      price: 81999,
      inStock: false,
      distance: "0.5 km",
      rating: 4.3,
      contact: "+1234567892"
    }
  ];

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Store</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Availability</TableHead>
            <TableHead>Distance</TableHead>
            <TableHead>Rating</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {mockData.map((item) => (
            <TableRow key={item.store}>
              <TableCell className="font-medium">{item.store}</TableCell>
              <TableCell>₹{item.price.toLocaleString()}</TableCell>
              <TableCell>
                <Badge variant={item.inStock ? "default" : "secondary"}>
                  {item.inStock ? "In Stock" : "Out of Stock"}
                </Badge>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  {item.distance}
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  {item.rating}
                </div>
              </TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => {
                      toast({
                        title: "Contact Store",
                        description: `Calling ${item.contact}...`,
                      });
                    }}
                  >
                    <Phone className="h-4 w-4 mr-2" />
                    Contact
                  </Button>
                  <Button size="sm">Visit Store</Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};