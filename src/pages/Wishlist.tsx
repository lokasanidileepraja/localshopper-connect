
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, ShoppingCart, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";

const Wishlist = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  
  // Mock wishlist data
  const wishlistItems = [
    {
      id: 1,
      name: "Smartphone X",
      price: 799,
      image: "/placeholder.svg",
    },
    {
      id: 2,
      name: "Laptop Pro",
      price: 1299,
      image: "/placeholder.svg",
    }
  ];

  const handleAddToCart = (item: typeof wishlistItems[0]) => {
    addToCart({
      id: item.id.toString(),
      name: item.name,
      price: item.price,
      quantity: 1,
      shopName: "Demo Shop"
    });
    
    toast({
      title: "Added to Cart",
      description: "Item has been added to your cart.",
    });
    
    // Navigate to cart
    navigate("/cart");
  };

  const handleRemove = (itemId: number) => {
    toast({
      title: "Removed from Wishlist",
      description: "Item has been removed from your wishlist.",
    });
  };

  const handleContinueShopping = () => {
    navigate("/category/electronics");
  };

  return (
    <div className="container py-12">
      <div className="flex items-center gap-2 mb-8">
        <Heart className="h-6 w-6 text-primary" />
        <h1 className="text-3xl font-bold">My Wishlist</h1>
      </div>
      
      {wishlistItems.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {wishlistItems.map((item) => (
            <Card key={item.id} className="overflow-hidden">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-48 object-cover cursor-pointer"
                onClick={() => navigate(`/product/${item.id}`)}
              />
              <CardContent className="p-4">
                <h3 className="font-semibold mb-2 cursor-pointer hover:text-primary"
                    onClick={() => navigate(`/product/${item.id}`)}>
                  {item.name}
                </h3>
                <p className="text-lg font-bold mb-4">₹{item.price}</p>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => handleAddToCart(item)}
                  >
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Add to Cart
                  </Button>
                  <Button
                    variant="destructive"
                    size="icon"
                    onClick={() => handleRemove(item.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="p-8 text-center">
          <p className="text-muted-foreground">Your wishlist is empty</p>
          <Button className="mt-4" onClick={handleContinueShopping}>
            Continue Shopping
          </Button>
        </Card>
      )}
    </div>
  );
};

export default Wishlist;
