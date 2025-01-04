import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, ShoppingCart, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Wishlist = () => {
  const { toast } = useToast();

  const wishlistItems = [
    {
      id: "1",
      name: "iPhone 15",
      price: 79999,
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158"
    },
    {
      id: "2",
      name: "MacBook Air M2",
      price: 114900,
      image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d"
    }
  ];

  const handleAddToCart = (itemId: string) => {
    toast({
      title: "Added to Cart",
      description: "Item has been added to your cart.",
    });
  };

  const handleRemove = (itemId: string) => {
    toast({
      title: "Removed from Wishlist",
      description: "Item has been removed from your wishlist.",
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center gap-2 mb-6">
        <Heart className="h-6 w-6 text-primary" />
        <h1 className="text-2xl font-bold">My Wishlist</h1>
      </div>

      {wishlistItems.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {wishlistItems.map((item) => (
            <Card key={item.id} className="overflow-hidden">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-48 object-cover"
              />
              <CardContent className="p-4">
                <h3 className="font-semibold text-lg mb-2">{item.name}</h3>
                <p className="text-2xl font-bold text-primary mb-4">
                  ₹{item.price.toLocaleString()}
                </p>
                <div className="flex gap-2">
                  <Button
                    className="flex-1"
                    onClick={() => handleAddToCart(item.id)}
                  >
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Add to Cart
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleRemove(item.id)}
                  >
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="p-8 text-center">
            <Heart className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">Your wishlist is empty</p>
            <Button className="mt-4">Continue Shopping</Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Wishlist;