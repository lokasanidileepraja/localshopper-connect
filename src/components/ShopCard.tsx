import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MessageCircle, Star } from "lucide-react";
import { Shop } from "@/types/shop";

export const ShopCard = ({ name, category, rating, distance, image, isOpen, products }: Shop) => {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg">
      <CardHeader className="p-0">
        <div className="relative h-48 w-full">
          <img src={image} alt={name} className="h-full w-full object-cover" />
          <Badge
            variant={isOpen ? "default" : "secondary"}
            className="absolute right-2 top-2"
          >
            {isOpen ? "Open" : "Closed"}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <div className="mb-2 flex items-center justify-between">
          <h3 className="font-semibold">{name}</h3>
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm">{rating}</span>
          </div>
        </div>
        <div className="mb-4 flex items-center justify-between text-sm text-gray-600">
          <span>{category}</span>
          <span>{distance}</span>
        </div>
        <div className="mb-4">
          <h4 className="mb-2 font-medium">Available Products</h4>
          <ul className="space-y-1 text-sm">
            {products.slice(0, 3).map((product) => (
              <li key={product.id} className="flex items-center justify-between">
                <span>{product.name}</span>
                <span className="font-medium">₹{product.price.toLocaleString()}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex gap-2">
          <Button className="flex-1">View Shop</Button>
          <Button variant="outline" size="icon">
            <MessageCircle className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};