import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MessageCircle, Star } from "lucide-react";
import { Shop } from "@/types/shop";
import { useNavigate } from "react-router-dom";

export const ShopCard = ({ name, category, rating, distance, image, isOpen, products }: Shop) => {
  const navigate = useNavigate();

  return (
    <Card className="group overflow-hidden transition-all hover:shadow-lg">
      <CardHeader className="p-0">
        <div className="relative h-48 w-full overflow-hidden">
          <img 
            src={image} 
            alt={name} 
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" 
          />
          <Badge
            variant={isOpen ? "default" : "secondary"}
            className="absolute right-2 top-2 z-10"
          >
            {isOpen ? "Open Now" : "Closed"}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="font-semibold text-lg">{name}</h3>
          <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-full">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium text-yellow-700">{rating}</span>
          </div>
        </div>
        <div className="mb-4 flex items-center justify-between text-sm text-gray-600">
          <span className="bg-gray-100 px-2 py-1 rounded-full">{category}</span>
          <span className="text-primary font-medium">{distance}</span>
        </div>
        <div className="mb-4 space-y-3">
          <h4 className="font-medium text-gray-900">Available Products</h4>
          <ul className="space-y-2">
            {products.slice(0, 3).map((product) => (
              <li 
                key={product.id} 
                className="flex items-center justify-between rounded-lg p-2 transition-colors hover:bg-gray-50 cursor-pointer"
                onClick={() => navigate(`/product/${product.id}`)}
              >
                <span className="text-sm text-gray-700">{product.name}</span>
                <span className="font-medium text-sm text-primary">₹{product.price.toLocaleString()}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex gap-2">
          <Button 
            className="flex-1 bg-primary hover:bg-primary/90"
            onClick={() => navigate(`/shop/${name}`)}
          >
            Visit Store
          </Button>
          <Button variant="outline" size="icon" className="hover:text-primary">
            <MessageCircle className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};